import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../models/expense.model';
import { AddExpenseDialogComponent } from '../add-expense-dialog/add-expense-dialog.component';

@Component({
  selector: 'app-harcamalar',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './harcamalar.component.html',
  styleUrls: ['./harcamalar.component.scss']
})
export class HarcamalarComponent implements OnInit {
  expenses: Expense[] = [];
  displayedColumns: string[] = ['id', 'expenseDate', 'amount', 'description'];

  constructor(private expenseService: ExpenseService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
    this.expenseService.getExpensesByDate(today).subscribe({
      next: (data: Expense[]) => this.expenses = data,
      error: err => console.error("Harcamalar getirilirken hata oluştu:", err)
    });
  }

  addExpense(): void {
    const dialogRef = this.dialog.open(AddExpenseDialogComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.loadExpenses();
      }
    });
  }
}
