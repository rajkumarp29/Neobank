import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  fullName: string;
  email: string;
}

export interface Account {
  id: string; // ✅ FIXED: account IDs are STRING
  accountNumber: string;
  accountType: 'SAVINGS' | 'CURRENT';
  balance: number;
  user?: User; // Optional for backward compatibility
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private API = 'http://localhost:8080/api/accounts';

  constructor(private http: HttpClient) {}

  // ✅ Get logged-in user's accounts
  getMyAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.API);
  }

  // ✅ Create account
  createAccount(type: string): Observable<Account> {
    return this.http.post<Account>(
      `${this.API}?accountType=${type}`,
      {}
    );
  }

  // ✅ Credit account
  credit(accountId: string, amount: number): Observable<Account> {
    const params = new HttpParams().set('amount', amount.toString());
    return this.http.post<Account>(
      `${this.API}/${accountId}/credit`,
      null,
      { params }
    );
  }

  // ✅ Debit account
  debit(accountId: string, amount: number): Observable<Account> {
    const params = new HttpParams().set('amount', amount.toString());
    return this.http.post<Account>(
      `${this.API}/${accountId}/debit`,
      null,
      { params }
    );
  }

  // ✅ Get single account by ID
  getAccountById(accountId: string): Observable<Account> {
    return this.http.get<Account>(`${this.API}/${accountId}`);
  }
}