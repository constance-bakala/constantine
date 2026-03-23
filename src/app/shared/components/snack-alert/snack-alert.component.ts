import { Component, Inject, Optional } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

export interface SnackAlertData {
  message: string;
  type: 'success' | 'error';
}

@Component({
  selector: 'app-snack-alert',
  templateUrl: './snack-alert.component.html',
  styleUrls: ['./snack-alert.component.css'],
  standalone: false,
})
export class SnackAlertComponent {

  message: string;
  type: 'success' | 'error';

  constructor(@Optional() @Inject(MAT_SNACK_BAR_DATA) data: SnackAlertData | null) {
    this.message = data?.message ?? 'COMMAND_SENT_MSG';
    this.type = data?.type ?? 'success';
  }
}
