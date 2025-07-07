import { Routes } from '@angular/router';
import { Onboarding } from './components/onboarding/onboarding';
import { PersonalData } from './components/personal-data/personal-data';
import { Documents } from './components/documents/documents';
import { Address } from './components/address/address';
import { ProfessionalInfo } from './components/professional-info/professional-info';
import { Summary } from './components/summary/summary';
import { OnboardingStepGuard } from './guards/onboarding-step.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/onboarding/personal-data', pathMatch: 'full' },
  {
    path: 'onboarding',
    component: Onboarding,
    children: [
      { path: 'personal-data', component: PersonalData },
      { path: 'documents', component: Documents, canActivate: [OnboardingStepGuard], data: { step: 'personal' } },
      { path: 'address', component: Address, canActivate: [OnboardingStepGuard], data: { step: 'documents' } },
      { path: 'professional-info', component: ProfessionalInfo, canActivate: [OnboardingStepGuard], data: { step: 'address' } },
      { path: 'summary', component: Summary, canActivate: [OnboardingStepGuard], data: { step: 'professional' } }
    ]
  },
  { path: '**', redirectTo: '/onboarding/personal-data' }
];
