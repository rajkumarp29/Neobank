import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MonthlyTrend {
  month:   string;
  income:  number;
  expense: number;
}

export interface CategorySpend {
  category: string;
  amount:   number;
}

export interface InsightsData {
  totalIncome:         number;
  totalExpenses:       number;
  savings:             number;
  transactionCount:    number;
  monthlyTrend:        MonthlyTrend[];
  spendingByCategory:  CategorySpend[];
}

@Injectable({ providedIn: 'root' })
export class InsightsService {

  private API = 'http://localhost:8080/api/insights';

  constructor(private http: HttpClient) {}

  getInsights(userId: number): Observable<InsightsData> {
    return this.http.get<InsightsData>(`${this.API}/${userId}`);
  }
}
