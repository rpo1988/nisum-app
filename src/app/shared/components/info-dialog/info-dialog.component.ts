import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

export interface InfoDialogConfig {
  title: string;
  description: string;
  confirmButton: string;
  confirmButtonColor?: 'primary' | 'accent' | 'warn';
  cancelButton: string;
}

@Component({
  selector: 'app-info-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './info-dialog.component.html',
  styleUrl: './info-dialog.component.scss',
})
export class InfoDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public config: InfoDialogConfig,
    public dialogRef: MatDialogRef<InfoDialogComponent>
  ) {}

  onCancelClicked(): void {
    this.dialogRef.close(false);
  }

  onConfirmClicked(): void {
    this.dialogRef.close(true);
  }
}
