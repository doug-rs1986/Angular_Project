import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingService } from '../../services/onboarding';
import { Documents as IDocuments } from '../../interfaces/client.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-documents',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './documents.html',
  styleUrl: './documents.css'
})
export class Documents implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private onboardingService = inject(OnboardingService);

  documentsForm: FormGroup;

  constructor() {
    this.documentsForm = this.fb.group({
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      rg: ['', [Validators.required, Validators.minLength(7)]],
      rgIssuingAgency: ['', Validators.required],
      rgIssueDate: ['', Validators.required],
      cnh: [''],
      cnhCategory: [''],
      cnhExpiryDate: ['']
    });

    // Validators condicionais para CNH
    this.documentsForm.get('cnh')?.valueChanges.subscribe(value => {
      const cnhCategoryControl = this.documentsForm.get('cnhCategory');
      const cnhExpiryControl = this.documentsForm.get('cnhExpiryDate');
      
      if (value) {
        cnhCategoryControl?.setValidators([Validators.required]);
        cnhExpiryControl?.setValidators([Validators.required]);
      } else {
        cnhCategoryControl?.clearValidators();
        cnhExpiryControl?.clearValidators();
      }
      
      cnhCategoryControl?.updateValueAndValidity();
      cnhExpiryControl?.updateValueAndValidity();
    });
  }

  ngOnInit() {
    const existingData = this.onboardingService.getClientData().documents;
    if (existingData) {
      this.documentsForm.patchValue({
        ...existingData,
        rgIssueDate: existingData.rgIssueDate ? 
          new Date(existingData.rgIssueDate).toISOString().split('T')[0] : '',
        cnhExpiryDate: existingData.cnhExpiryDate ? 
          new Date(existingData.cnhExpiryDate).toISOString().split('T')[0] : ''
      });
    }
  }

  onCpfInput(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    
    this.documentsForm.get('cpf')?.setValue(value);
  }

  onRgInput(event: any) {
    let value = event.target.value.replace(/[^\d\w]/g, '');
    this.documentsForm.get('rg')?.setValue(value.toUpperCase());
  }

  onCnhInput(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
      this.documentsForm.get('cnh')?.setValue(value);
    }
  }

  onSubmit() {
    if (this.documentsForm.valid) {
      const formData = this.documentsForm.value;
      const documentsData: IDocuments = {
        ...formData,
        rgIssueDate: new Date(formData.rgIssueDate),
        cnhExpiryDate: formData.cnhExpiryDate ? new Date(formData.cnhExpiryDate) : undefined
      };

      this.onboardingService.updateDocuments(documentsData);
      this.router.navigate(['/onboarding/address']);
    } else {
      this.markFormGroupTouched();
    }
  }

  goBack() {
    this.router.navigate(['/onboarding/personal-data']);
  }

  private markFormGroupTouched() {
    Object.keys(this.documentsForm.controls).forEach(key => {
      this.documentsForm.get(key)?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.documentsForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.documentsForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return 'Este campo é obrigatório';
      if (field.errors['pattern']) return 'Formato inválido';
      if (field.errors['minlength']) return 'Muito curto';
    }
    return '';
  }
}
