import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { QuillModule } from 'ngx-quill';

import { MatDialogModule }          from '@angular/material/dialog';
import { MatButtonModule }          from '@angular/material/button';
import { MatTooltipModule }         from '@angular/material/tooltip';
import { MatStepperModule }         from '@angular/material/stepper';
import { MatFormFieldModule }       from '@angular/material/form-field';
import { MatInputModule }           from '@angular/material/input';
import { MatSelectModule }          from '@angular/material/select';
import { MatIconModule }            from '@angular/material/icon';

import { AdminRoutingModule }          from './admin-routing.module';
import { AdminDashboardComponent }     from './admin-dashboard/admin-dashboard.component';
import { AdminCatalogComponent }       from './admin-catalog/admin-catalog.component';
import { AdminSettingsComponent }      from './admin-settings/admin-settings.component';
import { ConfirmDialogComponent }      from './confirm-dialog/confirm-dialog.component';
import { AdminPromoCodesComponent }    from './admin-promo-codes/admin-promo-codes.component';
import { AdminCategoryListComponent }  from './admin-catalog/admin-category-list/admin-category-list.component';
import { AdminSetupWizardComponent }   from './admin-setup-wizard/admin-setup-wizard.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminCatalogComponent,
    AdminSettingsComponent,
    ConfirmDialogComponent,
    AdminPromoCodesComponent,
    AdminCategoryListComponent,
    AdminSetupWizardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    AdminRoutingModule,
    QuillModule.forRoot(),
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
  ],
})
export class AdminModule {}
