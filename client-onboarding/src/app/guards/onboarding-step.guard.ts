import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OnboardingService } from '../services/onboarding';

@Injectable({ providedIn: 'root' })
export class OnboardingStepGuard implements CanActivate {
  constructor(private onboardingService: OnboardingService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const step = route.data['step'];
    if (!this.onboardingService.isStepComplete(step)) {
      this.router.navigate([this.onboardingService.getFirstIncompleteStepRoute()]);
      return false;
    }
    return true;
  }
}
