import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkout-stepper',
  templateUrl: './checkout-stepper.component.html',
  styleUrls: ['./checkout-stepper.component.scss'],
  standalone: false,
})
export class CheckoutStepperComponent {
  @Input() currentStep = 1;
  @Output() stepChange = new EventEmitter<number>();
}
