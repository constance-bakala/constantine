import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminSetupWizardComponent } from './admin-setup-wizard/admin-setup-wizard.component';

export const adminRoutes: Routes = [
  { path: '',      component: AdminDashboardComponent },
  { path: 'setup', component: AdminSetupWizardComponent },
];
