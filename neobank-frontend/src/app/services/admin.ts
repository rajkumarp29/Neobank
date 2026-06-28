import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  id: number;
  fullName: string;
  email: string;
  role: string;
  status?: string;
  createdAt?: string;
}

export interface LoanProduct {
  id?: string | number;
  productName: string;
  loanType: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  annualInterestRate: number;
  processingFee: number;
  minTenure: number;
  maxTenure: number;
  allowedTenures: string;
}

export interface LoanApplicationRequest {
  loanProductId: number;
  requestedAmount: number;
  requestedTenureMonths: number;
}

export interface LoanApplication {
  id: number;
  userId: number;
  loanProductId: number;
  applicantName: string;
  loanType: any;
  productName: any;
  requestedAmount: number;
  loanAmount?: number;
  amount?: number;
  requestedLoanAmount?: number;
  requestedTenureMonths: number;
  tenureMonths?: number;
  tenure?: number;
  loanTenure?: number;
  annualInterestRate: number;
  interestRate?: number;
  rate?: number;
  annualRate?: number;
  rateOfInterest?: number;
  status: string;
  appliedAt?: string;
  appliedDate?: string;
  applicationDate?: string;
  createdAt?: string;
  applyDate?: string;
  appliedOn?: string;
}

@Injectable({ providedIn: 'root' })
export class AdminService {

  private baseUrl      = 'http://localhost:8080/api/admin';
  private loanProductUrl = 'http://localhost:8080/api/loans/products';
  private loanApplyUrl   = 'http://localhost:8080/api/loans/apply';
  private loanAdminUrl   = 'http://localhost:8080/api/admin/loans';

  constructor(private http: HttpClient) {}

  // ── User Management ─────────────────────────────────
  getAllUsers(): Observable<User[]> {
    return this.http.get<any>(`${this.baseUrl}/users`).pipe(
      map(data => Array.isArray(data) ? data : (data?.content ?? data?.users ?? data?.data ?? []))
    );
  }

  updateUserRole(userId: number, role: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/users/${userId}/role`, { role });
  }

  updateUserStatus(userId: number, status: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/users/${userId}/status`, { status });
  }

  // ── Loan Product Management ──────────────────────────
  createLoanProduct(product: LoanProduct): Observable<LoanProduct> {
    return this.http.post<LoanProduct>(this.loanProductUrl, product);
  }

  getLoanProducts(): Observable<LoanProduct[]> {
    return this.http.get<LoanProduct[]>(this.loanProductUrl);
  }

  getLoanProductById(id: number): Observable<LoanProduct> {
    return this.http.get<LoanProduct>(`${this.loanProductUrl}/${id}`);
  }

  updateLoanProduct(id: string | number, product: LoanProduct): Observable<LoanProduct> {
    return this.http.put<LoanProduct>(`${this.loanProductUrl}/${id}`, product);
  }

  deleteLoanProduct(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.loanProductUrl}/${id}`);
  }

  // ── Loan Application ─────────────────────────────────
  applyLoan(request: LoanApplicationRequest): Observable<any> {
    return this.http.post(this.loanApplyUrl, request, { responseType: 'text' as 'json' });
  }

  // ── Loan Approval (Admin) ────────────────────────────
  getPendingLoans(): Observable<LoanApplication[]> {
    return this.http.get<any>(`${this.loanAdminUrl}/pending`).pipe(
      map(data => Array.isArray(data) ? data : (data?.content ?? data?.data ?? []))
    );
  }

  approveLoan(id: number): Observable<string> {
    return this.http.post<string>(`${this.loanAdminUrl}/${id}/approve`, {});
  }

  rejectLoan(id: number): Observable<string> {
    return this.http.post<string>(`${this.loanAdminUrl}/${id}/reject`, {});
  }

  getAllLoans(): Observable<LoanApplication[]> {
    return this.http.get<any>(`${this.loanAdminUrl}/all`).pipe(
      map(data => Array.isArray(data) ? data : (data?.content ?? data?.data ?? []))
    );
  }

  getLoanById(id: number): Observable<LoanApplication> {
    return this.http.get<LoanApplication>(`${this.loanAdminUrl}/${id}`);
  }
}