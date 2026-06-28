import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LoanService {

  private baseUrl = 'http://localhost:8080/api/loans';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  getMyLoans() {
    return this.http.get<any[]>(`${this.baseUrl}/accounts`, this.getHeaders());
  }

  getRepayments(id: number) {
    return this.http.get<any[]>(`${this.baseUrl}/${id}/repayments`, this.getHeaders());
  }

  payEmi(accountId: number, repaymentId: number) {
    return this.http.patch(
      `${this.baseUrl}/${accountId}/repayments/${repaymentId}/pay`,
      {},
      this.getHeaders()
    );
  }
}