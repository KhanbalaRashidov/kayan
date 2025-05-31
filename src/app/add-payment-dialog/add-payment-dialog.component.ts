import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Payment } from '../models/payment.model';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-add-payment-dialog',
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
  templateUrl: './add-payment-dialog.component.html',
  styleUrls: ['./add-payment-dialog.component.scss']
})
export class AddPaymentDialogComponent implements OnInit {
  paymentForm!: FormGroup;
  minDate: Date = new Date();  // Bugünden küçük tarih seçilemesin

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    public dialogRef: MatDialogRef<AddPaymentDialogComponent>
  ) {}

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      counterparty: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
      dueDate: [null, Validators.required],
      debt: [true]
    });
  }

  save(): void {
    if (this.paymentForm.valid) {
      const newPayment: Payment = {
        id: 0,
        counterparty: this.paymentForm.value.counterparty,
        amount: this.paymentForm.value.amount,
        dueDate: this.paymentForm.value.dueDate,
        isPaid: false,
        debt: this.paymentForm.value.debt
      };
      this.paymentService.addPayment(newPayment).subscribe({
        next: () => this.dialogRef.close(true),
        error: err => console.error('Ödeme eklenirken hata oluştu:', err)
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
