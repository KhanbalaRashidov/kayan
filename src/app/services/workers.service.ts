import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Worker {
    id: number;
    name: string;
    salary: number;
    paymentDate: Date;
  }
  

@Injectable({
  providedIn: 'root'
})
export class WorkersService {
  private baseUrl = `${environment.apiUrl}/api/workers`;

  constructor(private http: HttpClient) {}

  getWorkers(): Observable<Worker[]> {
    return this.http.get<Worker[]>(this.baseUrl);
  }

  getWorker(id: number): Observable<Worker> {
    return this.http.get<Worker>(`${this.baseUrl}/${id}`);
  }

  addWorker(worker: Worker): Observable<any> {
    return this.http.post(this.baseUrl, worker);
  }

  updateWorker(worker: Worker): Observable<any> {
    return this.http.put(this.baseUrl, worker);
  }

  deleteWorker(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
