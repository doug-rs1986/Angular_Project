import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { OnboardingService } from '../../services/onboarding';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-onboarding',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.css'
})
export class Onboarding {
  private router = inject(Router);
  private onboardingService = inject(OnboardingService);

  steps = [
    { 
      id: 'personal', 
      label: 'Dados Pessoais', 
      route: '/onboarding/personal-data',
      icon: '👤'
    },
    { 
      id: 'documents', 
      label: 'Documentos', 
      route: '/onboarding/documents',
      icon: '📋'
    },
    { 
      id: 'address', 
      label: 'Endereço', 
      route: '/onboarding/address',
      icon: '🏠'
    },
    { 
      id: 'professional', 
      label: 'Informações Profissionais', 
      route: '/onboarding/professional-info',
      icon: '💼'
    },
    { 
      id: 'summary', 
      label: 'Resumo', 
      route: '/onboarding/summary',
      icon: '✅'
    }
  ];

  getCurrentStepIndex(): number {
    const currentRoute = this.router.url;
    return this.steps.findIndex(step => currentRoute.includes(step.route.split('/').pop() || ''));
  }

  isStepCompleted(stepId: string): boolean {
    return this.onboardingService.isStepComplete(stepId);
  }

  isStepActive(index: number): boolean {
    return index === this.getCurrentStepIndex();
  }

  canAccessStep(index: number): boolean {
    const currentIndex = this.getCurrentStepIndex();
    return index <= currentIndex + 1;
  }

  navigateToStep(step: any, index: number) {
    if (this.canAccessStep(index)) {
      this.router.navigate([step.route]);
    }
  }
}
