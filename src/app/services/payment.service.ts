import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = `${environment.apiUrl}/api/payment`;

  constructor(private http: HttpClient) {}

  addPayment(payment: Payment): Observable<any> {
    return this.http.post(this.baseUrl, payment);
  }

  updatePayment(payment: Payment): Observable<any> {
    return this.http.put(this.baseUrl, payment);
  }
  
  getPendingPayments(date: string): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.baseUrl}/pending/${date}`);
  }

  deletePayment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
