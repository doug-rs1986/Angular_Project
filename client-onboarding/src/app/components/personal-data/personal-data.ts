import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingService } from '../../services/onboarding';
import { PersonalData as IPersonalData } from '../../interfaces/client.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personal-data',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './personal-data.html',
  styleUrl: './personal-data.css'
})
export class PersonalData implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private onboardingService = inject(OnboardingService);

  personalForm: FormGroup;

  constructor() {
    this.personalForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\)\s\d{4,5}-\d{4}$/)]],
      gender: ['', Validators.required],
      maritalStatus: ['', Validators.required]
    });
  }

  ngOnInit() {
    const existingData = this.onboardingService.getClientData().personalData;
    if (existingData) {
      this.personalForm.patchValue({
        ...existingData,
        dateOfBirth: existingData.dateOfBirth ? 
          new Date(existingData.dateOfBirth).toISOString().split('T')[0] : ''
      });
    }
  }

  onPhoneInput(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
      if (value.length <= 10) {
        value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
      } else {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      }
    }
    
    this.personalForm.get('phone')?.setValue(value);
  }

  onSubmit() {
    if (this.personalForm.valid) {
      const formData = this.personalForm.value;
      const personalData: IPersonalData = {
        ...formData,
        dateOfBirth: new Date(formData.dateOfBirth)
      };

      this.onboardingService.updatePersonalData(personalData);
      this.router.navigate(['/onboarding/documents']);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.personalForm.controls).forEach(key => {
      this.personalForm.get(key)?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.personalForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.personalForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return 'Este campo é obrigatório';
      if (field.errors['email']) return 'Email inválido';
      if (field.errors['minlength']) return 'Nome muito curto';
      if (field.errors['pattern']) return 'Formato inválido';
    }
    return '';
  }
}
