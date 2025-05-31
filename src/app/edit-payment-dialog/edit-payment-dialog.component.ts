import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Payment } from '../models/payment.model';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-edit-payment-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  templateUrl: './edit-payment-dialog.component.html',
  styleUrls: ['./edit-payment-dialog.component.scss']
})
export class EditPaymentDialogComponent implements OnInit {
  paymentForm!: FormGroup;
  // Dropdown seçenekleri için true/false seçenekleri
  booleanOptions = [
    { value: true, viewValue: 'True' },
    { value: false, viewValue: 'False' }
  ];

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    public dialogRef: MatDialogRef<EditPaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Payment
  ) {}

  ngOnInit(): void {
    // Eğer data boş gelirse, formu boş oluşturup hata vermesini engellemek için kontrol ekleyebilirsiniz
    this.paymentForm = this.fb.group({
      counterparty: [this.data?.counterparty || '', Validators.required],
      amount: [this.data?.amount ?? 0, [Validators.required, Validators.min(0)]],
      dueDate: [this.data?.dueDate ? new Date(this.data.dueDate) : null, Validators.required],
      debt: [this.data?.debt != null ? this.data.debt : true, Validators.required],
      isPaid: [this.data?.isPaid != null ? this.data.isPaid : false, Validators.required]
    });
  }

  save(): void {
    if (this.paymentForm.valid) {
      const updatedPayment: Payment = {
        id: this.data.id,
        counterparty: this.paymentForm.value.counterparty,
        amount: this.paymentForm.value.amount,
        dueDate: this.paymentForm.value.dueDate,
        debt: this.paymentForm.value.debt,
        isPaid: this.paymentForm.value.isPaid
      };
      this.paymentService.updatePayment(updatedPayment).subscribe({
        next: () => this.dialogRef.close(true),
        error: err => console.error('Ödeme güncellenirken hata oluştu:', err)
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
