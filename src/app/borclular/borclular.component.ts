import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PaymentService } from '../services/payment.service';
import { Payment } from '../models/payment.model';
import { AddPaymentDialogComponent } from '../add-payment-dialog/add-payment-dialog.component';
import { EditPaymentDialogComponent } from '../edit-payment-dialog/edit-payment-dialog.component';
import { DeletePaymentDialogComponent } from '../delete-payment-dialog/delete-payment-dialog.component';

@Component({
  selector: 'app-borclular',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './borclular.component.html',
  styleUrls: ['./borclular.component.scss']
})
export class BorclularComponent implements OnInit {
  payments: Payment[] = [];
  displayedColumns: string[] = ['id', 'counterparty', 'dueDate', 'amount', 'debt', 'actions'];

  constructor(private paymentService: PaymentService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadPendingPayments();
  }

  loadPendingPayments(): void {
    const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD" formatı
    this.paymentService.getPendingPayments(today).subscribe({
      next: (data: Payment[]) => this.payments = data,
      error: err => console.error('Bekleyen ödemeler getirilirken hata oluştu:', err)
    });
  }

  addPayment(): void {
    const dialogRef = this.dialog.open(AddPaymentDialogComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPendingPayments();
      }
    });
  }

  editPayment(payment: Payment): void {
    const dialogRef = this.dialog.open(EditPaymentDialogComponent, {
      width: '400px',
      data: payment
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPendingPayments();
      }
    });
  }

  deletePayment(payment: Payment): void {
    const dialogRef = this.dialog.open(DeletePaymentDialogComponent, { width: '300px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.paymentService.deletePayment(payment.id).subscribe({
          next: () => this.loadPendingPayments(),
          error: err => console.error('Ödeme silinirken hata oluştu:', err)
        });
      }
    });
  }
}
