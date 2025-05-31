import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { WorkersService,Worker } from '../services/workers.service';

@Component({
  selector: 'app-add-worker-dialog',
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
  templateUrl: './add-worker-dialog.component.html',
  styleUrls: ['./add-worker-dialog.component.scss']
})
export class AddWorkerDialogComponent implements OnInit {
  workerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private workersService: WorkersService,
    public dialogRef: MatDialogRef<AddWorkerDialogComponent>
  ) {}

  ngOnInit(): void {
    this.workerForm = this.fb.group({
      name: ['', Validators.required],
      salary: [0, [Validators.required, Validators.min(0)]],
      paymentDate: [new Date(), Validators.required]  // Varsayılan olarak bugünün tarihi
    });
  }

  save(): void {
    if (this.workerForm.valid) {
      const newWorker: Worker = {
        id: 0, // Backend tarafından otomatik oluşturulabilir
        name: this.workerForm.value.name,
        salary: this.workerForm.value.salary,
        paymentDate: this.workerForm.value.paymentDate
      };
      this.workersService.addWorker(newWorker).subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: err => {
          console.error('Worker eklenirken hata oluştu:', err);
        }
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
