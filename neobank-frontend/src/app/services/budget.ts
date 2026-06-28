import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private API = 'http://localhost:8080/api/budgets';

  constructor(private http: HttpClient) {}

  // ✅ FIXED: Get monthly budget summary (NO userId)
  getSummary(month: string): Observable<any> {
    return this.http.get(`${this.API}/${month}`);
  }

  // ✅ Create new budget
  create(payload: any): Observable<any> {
    return this.http.post(this.API, payload);
  }
}