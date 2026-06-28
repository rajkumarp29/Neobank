import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private baseUrl = 'http://localhost:8080/api/accounts';

  constructor(private http: HttpClient) {}

  // ✅ GET transactions (paginated)
  getTransactions(
    accountId: string,
    page: number = 0,
    size: number = 10
  ): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/${accountId}/transactions?page=${page}&size=${size}`
    );
  }

  // ✅ POST CREDIT / DEBIT transaction (CATEGORY REQUIRED)
  createTransaction(
    accountId: string,
    payload: {
      type: 'CREDIT' | 'DEBIT';
      amount: number;
      category: string;        // ✅ REQUIRED
      description: string;
    }
  ): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/${accountId}/transactions`,
      payload
    );
  }
}