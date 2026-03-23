import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderHistoryComponent } from './order-history.component';
import { orderHistoryRoutes } from './order-history.route.model';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [OrderHistoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(orderHistoryRoutes),
  ],
})
export class OrderHistoryModule {}
