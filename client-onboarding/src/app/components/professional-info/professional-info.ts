import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingService } from '../../services/onboarding';
import { ProfessionalInfo as IProfessionalInfo } from '../../interfaces/client.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-professional-info',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './professional-info.html',
  styleUrl: './professional-info.css'
})
export class ProfessionalInfo implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private onboardingService = inject(OnboardingService);

  professionalForm: FormGroup;

  workAreas = [
    'Administração',
    'Arquitetura e Urbanismo',
    'Ciências Contábeis',
    'Comunicação Social',
    'Direito',
    'Educação',
    'Enfermagem',
    'Engenharia',
    'Farmácia',
    'Fisioterapia',
    'Medicina',
    'Nutrição',
    'Odontologia',
    'Psicologia',
    'Recursos Humanos',
    'Tecnologia da Informação',
    'Vendas e Marketing',
    'Outros'
  ];

  constructor() {
    this.professionalForm = this.fb.group({
      companyName: ['', [Validators.required, Validators.minLength(2)]],
      position: ['', [Validators.required, Validators.minLength(2)]],
      experienceYears: [0, [Validators.required, Validators.min(0), Validators.max(50)]],
      experienceMonths: [0, [Validators.required, Validators.min(0), Validators.max(11)]],
      monthlyIncome: [0, [Validators.required, Validators.min(1)]],
      workArea: ['', Validators.required],
      startDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    const existingData = this.onboardingService.getClientData().professionalInfo;
    if (existingData) {
      this.professionalForm.patchValue({
        ...existingData,
        startDate: existingData.startDate ? 
          new Date(existingData.startDate).toISOString().split('T')[0] : ''
      });
    }
  }

  onIncomeInput(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value) {
      // Formatação de moeda brasileira
      const numValue = parseInt(value) / 100;
      const formattedValue = numValue.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      
      event.target.value = 'R$ ' + formattedValue;
      this.professionalForm.get('monthlyIncome')?.setValue(numValue);
    } else {
      this.professionalForm.get('monthlyIncome')?.setValue(0);
    }
  }

  getTotalExperience(): string {
    const years = this.professionalForm.get('experienceYears')?.value || 0;
    const months = this.professionalForm.get('experienceMonths')?.value || 0;
    
    if (years === 0 && months === 0) return '';
    
    let result = '';
    if (years > 0) {
      result += `${years} ano${years > 1 ? 's' : ''}`;
    }
    if (months > 0) {
      if (result) result += ' e ';
      result += `${months} mês${months > 1 ? 'es' : ''}`;
    }
    
    return result;
  }

  onSubmit() {
    if (this.professionalForm.valid) {
      const formData = this.professionalForm.value;
      const professionalData: IProfessionalInfo = {
        ...formData,
        startDate: new Date(formData.startDate)
      };

      this.onboardingService.updateProfessionalInfo(professionalData);
      this.router.navigate(['/onboarding/summary']);
    } else {
      this.markFormGroupTouched();
    }
  }

  goBack() {
    this.router.navigate(['/onboarding/address']);
  }

  private markFormGroupTouched() {
    Object.keys(this.professionalForm.controls).forEach(key => {
      this.professionalForm.get(key)?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.professionalForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.professionalForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return 'Este campo é obrigatório';
      if (field.errors['minlength']) return 'Muito curto';
      if (field.errors['min']) return 'Valor inválido';
      if (field.errors['max']) return 'Valor muito alto';
    }
    return '';
  }
}
