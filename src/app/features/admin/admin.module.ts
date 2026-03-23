import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminCatalogComponent } from './admin-catalog/admin-catalog.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [AdminDashboardComponent, AdminCatalogComponent, AdminSettingsComponent, ConfirmDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    QuillModule.forRoot(),
    MatDialogModule,
    MatButtonModule,
  ],
})
export class AdminModule {}
