import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { AccountService, Account } from '../../services/account';
import { TransactionService } from '../../services/transaction';

@Component({
  selector: 'app-account-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePipe],
  templateUrl: './account-detail.html',
  styleUrls: ['./account-detail.css']
})
export class AccountDetailComponent implements OnInit {

  accountId = '';
  account: Account | null = null;
  loading = true;
  error = '';

  // ── Reactive Form ──────────────────────────────────
  txForm: FormGroup;
  submitting = false;
  selectedType: 'CREDIT' | 'DEBIT' = 'CREDIT';
  successMsg = '';
  errorMsg = '';
  private requestTimeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.txForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.accountId = this.route.snapshot.paramMap.get('accountId') || '';
    this.loadAccount();
  }

  // ── Load Account ───────────────────────────────────
  loadAccount(): void {
    this.loading = true;
    this.accountService.getAccountById(this.accountId).subscribe({
      next: acc => {
        this.account = acc;
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load account details.';
        this.loading = false;
      }
    });
  }

  // ── Type Toggle ────────────────────────────────────
  selectType(type: 'CREDIT' | 'DEBIT'): void {
    this.selectedType = type;
  }

  // ── Submit Transaction ─────────────────────────────
  submitTransaction(): void {
    if (this.txForm.invalid) {
      this.txForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.successMsg = '';
    this.errorMsg = '';

    if (this.requestTimeoutId) {
      clearTimeout(this.requestTimeoutId);
    }

    this.requestTimeoutId = setTimeout(() => {
      if (this.submitting) {
        this.submitting = false;
        this.errorMsg = 'The request took too long. Please try again.';
        this.cdr.detectChanges();
      }
    }, 15000);

    const { amount, category, description } = this.txForm.value;

    const payload = {
      type: this.selectedType,
      amount: +amount,
      category,
      description: description || ''
    };

    this.transactionService.createTransaction(this.accountId, payload)
      .pipe(
        finalize(() => {
          if (this.requestTimeoutId) {
            clearTimeout(this.requestTimeoutId);
            this.requestTimeoutId = null;
          }
          this.submitting = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: () => {
          const sign = this.selectedType === 'CREDIT' ? '+' : '-';
          this.successMsg = `${this.selectedType}: ${sign}₹${(+amount).toLocaleString('en-IN')} processed successfully!`;
          this.txForm.reset({ amount: null, category: '', description: '' });
          this.loadAccount();
          setTimeout(() => (this.successMsg = ''), 4500);
        },
        error: err => {
          this.errorMsg = err?.error?.message || 'Transaction failed. Please try again.';
          setTimeout(() => (this.errorMsg = ''), 4500);
        }
      });
  }

  // ── Navigation ─────────────────────────────────────
  goBack(): void {
    this.router.navigate(['/dashboard/accounts']);
  }

  viewTransactions(): void {
    this.router.navigate(['/dashboard/transactions', this.accountId]);
  }

  // ── Helper ─────────────────────────────────────────
  get amountCtrl() { return this.txForm.get('amount'); }
  get categoryCtrl() { return this.txForm.get('category'); }
}
