import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnboardingService } from '../../services/onboarding';
import { Client } from '../../interfaces/client.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary',
  imports: [CommonModule],
  templateUrl: './summary.html',
  styleUrl: './summary.css'
})
export class Summary implements OnInit {
  private router = inject(Router);
  private onboardingService = inject(OnboardingService);

  clientData: Client = {};
  isSubmitting = false;

  ngOnInit() {
    this.clientData = this.onboardingService.getClientData();
    
    // Verificar se todos os dados necessários estão preenchidos
    if (!this.isDataComplete()) {
      this.router.navigate(['/onboarding/personal-data']);
    }
  }

  isDataComplete(): boolean {
    const data = this.clientData;
    return !!(
      data.personalData?.fullName &&
      data.personalData?.email &&
      data.documents?.cpf &&
      data.documents?.rg &&
      data.address?.zipCode &&
      data.address?.street &&
      data.professionalInfo?.companyName &&
      data.professionalInfo?.position
    );
  }

  formatCpf(cpf: string): string {
    return cpf || '';
  }

  formatPhone(phone: string): string {
    return phone || '';
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value || 0);
  }

  formatDate(date: Date | string): string {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('pt-BR');
  }

  getGenderLabel(gender: string): string {
    const labels: { [key: string]: string } = {
      'masculino': 'Masculino',
      'feminino': 'Feminino',
      'outro': 'Outro'
    };
    return labels[gender] || gender;
  }

  getMaritalStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'solteiro': 'Solteiro(a)',
      'casado': 'Casado(a)',
      'divorciado': 'Divorciado(a)',
      'viuvo': 'Viúvo(a)'
    };
    return labels[status] || status;
  }

  getExperienceText(): string {
    const prof = this.clientData.professionalInfo;
    if (!prof) return '';
    
    const years = prof.experienceYears || 0;
    const months = prof.experienceMonths || 0;
    
    if (years === 0 && months === 0) return 'Menos de 1 mês';
    
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

  getFullAddress(): string {
    const addr = this.clientData.address;
    if (!addr) return '';
    
    return `${addr.street}, ${addr.number}${addr.complement ? ', ' + addr.complement : ''} - ${addr.neighborhood}, ${addr.city}/${addr.state} - CEP: ${addr.zipCode}`;
  }

  editSection(section: string) {
    const routes: { [key: string]: string } = {
      'personal': '/onboarding/personal-data',
      'documents': '/onboarding/documents',
      'address': '/onboarding/address',
      'professional': '/onboarding/professional-info'
    };
    
    if (routes[section]) {
      this.router.navigate([routes[section]]);
    }
  }

  async submitOnboarding() {
    this.isSubmitting = true;
    
    try {
      // Simular envio para o servidor
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aqui você implementaria o envio real dos dados
      console.log('Dados do cliente:', this.clientData);
      
      // Redirecionar para página de sucesso ou limpar dados
      alert('Cadastro realizado com sucesso!');
      this.onboardingService.clearData();
      this.router.navigate(['/onboarding/personal-data']);
      
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      alert('Erro ao finalizar cadastro. Tente novamente.');
    } finally {
      this.isSubmitting = false;
    }
  }

  goBack() {
    this.router.navigate(['/onboarding/professional-info']);
  }
}
