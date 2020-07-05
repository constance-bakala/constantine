import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  constructor(private dialogRef: MatDialogRef<AlertComponent>) {
  }

  closed() {
  }

  closeModal() {
    this.dialogRef.close();
  }
}
