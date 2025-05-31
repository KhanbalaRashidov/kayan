import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private baseUrl = `${environment.apiUrl}/api/expense`;

  constructor(private http: HttpClient) {}

  // Bugünkü harcamaları getirir. Parametre olarak tarih stringi (YYYY-MM-DD) veriyoruz.
  getExpensesByDate(date: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.baseUrl}/date/${date}`);
  }

  // Yeni harcama ekler
  addExpense(expense: Expense): Observable<any> {
    return this.http.post(this.baseUrl, expense);
  }
}
