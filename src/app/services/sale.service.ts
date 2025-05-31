import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Sale } from '../models/sale.model';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private baseUrl = `${environment.apiUrl}/api/sale`;

  constructor(private http: HttpClient) {}

  // Bugünkü satışları getirir
  getSalesToday(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.baseUrl}/today`);
  }

  // Yeni satış ekler
  addSale(sale: Sale): Observable<any> {
    return this.http.post(this.baseUrl, sale);
  }

  getSalesTodayRevanue():Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/totalRevenue/today`)
  }
}
