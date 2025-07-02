import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingService } from '../../services/onboarding';
import { Address as IAddress } from '../../interfaces/client.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './address.html',
  styleUrl: './address.css'
})
export class Address implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private onboardingService = inject(OnboardingService);

  addressForm: FormGroup;
  isLoadingAddress = false;

  constructor() {
    this.addressForm = this.fb.group({
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
      street: ['', Validators.required],
      number: ['', Validators.required],
      complement: [''],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['Brasil', Validators.required]
    });
  }

  ngOnInit() {
    const existingData = this.onboardingService.getClientData().address;
    if (existingData) {
      this.addressForm.patchValue(existingData);
    }
  }

  onZipCodeInput(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length <= 8) {
      if (value.length > 5) {
        value = value.replace(/(\d{5})(\d{3})/, '$1-$2');
      }
      this.addressForm.get('zipCode')?.setValue(value);
      
      // Buscar endereço quando CEP estiver completo
      if (value.length === 9) {
        this.searchAddressByZipCode(value);
      }
    }
  }

  async searchAddressByZipCode(zipCode: string) {
    this.isLoadingAddress = true;
    
    try {
      const addressData = await this.onboardingService.searchAddressByZipCode(zipCode);
      
      if (addressData) {
        this.addressForm.patchValue({
          street: addressData.street || '',
          neighborhood: addressData.neighborhood || '',
          city: addressData.city || '',
          state: addressData.state || '',
          country: addressData.country || 'Brasil'
        });
      } else {
        // CEP não encontrado
        this.clearAddressFields();
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      this.clearAddressFields();
    } finally {
      this.isLoadingAddress = false;
    }
  }

  private clearAddressFields() {
    this.addressForm.patchValue({
      street: '',
      neighborhood: '',
      city: '',
      state: ''
    });
  }

  onSubmit() {
    if (this.addressForm.valid) {
      const addressData: IAddress = this.addressForm.value;
      this.onboardingService.updateAddress(addressData);
      this.router.navigate(['/onboarding/professional-info']);
    } else {
      this.markFormGroupTouched();
    }
  }

  goBack() {
    this.router.navigate(['/onboarding/documents']);
  }

  private markFormGroupTouched() {
    Object.keys(this.addressForm.controls).forEach(key => {
      this.addressForm.get(key)?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.addressForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.addressForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return 'Este campo é obrigatório';
      if (field.errors['pattern']) return 'Formato inválido';
    }
    return '';
  }
}
