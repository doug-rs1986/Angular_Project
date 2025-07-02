import { Routes } from '@angular/router';
import { Onboarding } from './components/onboarding/onboarding';
import { PersonalData } from './components/personal-data/personal-data';
import { Documents } from './components/documents/documents';
import { Address } from './components/address/address';
import { ProfessionalInfo } from './components/professional-info/professional-info';
import { Summary } from './components/summary/summary';

export const routes: Routes = [
  { path: '', redirectTo: '/onboarding/personal-data', pathMatch: 'full' },
  {
    path: 'onboarding',
    component: Onboarding,
    children: [
      { path: 'personal-data', component: PersonalData },
      { path: 'documents', component: Documents },
      { path: 'address', component: Address },
      { path: 'professional-info', component: ProfessionalInfo },
      { path: 'summary', component: Summary }
    ]
  },
  { path: '**', redirectTo: '/onboarding/personal-data' }
];
