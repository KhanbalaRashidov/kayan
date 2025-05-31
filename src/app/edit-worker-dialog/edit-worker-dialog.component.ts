import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { WorkersService,Worker } from '../services/workers.service';

@Component({
  selector: 'app-edit-worker-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './edit-worker-dialog.component.html',
  styleUrls: ['./edit-worker-dialog.component.scss']
})
export class EditWorkerDialogComponent implements OnInit {
  workerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private workersService: WorkersService,
    public dialogRef: MatDialogRef<EditWorkerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Worker
  ) {}

  ngOnInit(): void {
    this.workerForm = this.fb.group({
      name: [this.data.name, Validators.required],
      salary: [this.data.salary, [Validators.required, Validators.min(0)]],
      paymentDate: [new Date(this.data.paymentDate), Validators.required]
    });
  }

  save(): void {
    if (this.workerForm.valid) {
      const updatedWorker: Worker = {
        id: this.data.id,
        name: this.workerForm.value.name,
        salary: this.workerForm.value.salary,
        paymentDate: this.workerForm.value.paymentDate
      };
      this.workersService.updateWorker(updatedWorker).subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: err => {
          console.error('Worker güncellenirken hata oluştu:', err);
        }
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
