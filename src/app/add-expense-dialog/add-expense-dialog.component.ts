import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Expense } from '../models/expense.model';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-add-expense-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './add-expense-dialog.component.html',
  styleUrls: ['./add-expense-dialog.component.scss']
})
export class AddExpenseDialogComponent implements OnInit {
  expenseForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    public dialogRef: MatDialogRef<AddExpenseDialogComponent>
  ) {}

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      amount: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required]
    });
  }

  save(): void {
    if (this.expenseForm.valid) {
      const newExpense: Expense = {
        id: 0,
        expenseDate: new Date(), // Backend tarafında güncellenebilir
        amount: this.expenseForm.value.amount,
        description: this.expenseForm.value.description
      };
      this.expenseService.addExpense(newExpense).subscribe({
        next: () => this.dialogRef.close(true),
        error: err => console.error('Harcama eklenirken hata oluştu:', err)
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
