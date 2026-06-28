import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../services/transaction';
import { AccountService, Account } from '../../services/account';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './transactions.html',
  styleUrls: ['./transactions.css']
})
export class TransactionsComponent implements OnInit {

  accountId: string | null = null;
  currentAccount: Account | null = null;
  allAccounts: Account[] = [];

  transactions: Transaction[] = [];
  filtered: Transaction[] = [];

  page = 0;
  size = 10;
  totalPages = 0;
  loading = true;

  filterType: 'ALL' | 'CREDIT' | 'DEBIT' = 'ALL';
  filterDate = '';

  txForm: FormGroup;
  selectedTxType: 'CREDIT' | 'DEBIT' = 'CREDIT';
  submitting = false;
  successMsg = '';
  errorMsg = '';
  private requestTimeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService,
    private accountService: AccountService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.txForm = this.fb.group({
      accountId:   ['', Validators.required],
      amount:      [null, [Validators.required, Validators.min(0.01)]],
      category:    ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('accountId');
    if (routeId) {
      this.accountId = routeId;
      this.txForm.patchValue({ accountId: routeId });
      this.loadAllAccounts();
      this.loadTransactions();
    } else {
      this.loadAllAccountsAndAutoSelect();
    }
  }

  private loadAllAccountsAndAutoSelect(): void {
    this.loading = true;
    this.accountService.getMyAccounts().subscribe({
      next: accounts => {
        this.allAccounts = accounts;
        if (accounts.length > 0) {
          const first = accounts[0];
          this.accountId = first.id;
          this.currentAccount = first;
          this.txForm.patchValue({ accountId: first.id });
          this.loadTransactions();
        } else {
          this.loading = false;
        }
        this.cd.detectChanges();
      },
      error: () => { this.loading = false; }
    });
  }

  loadAllAccounts(): void {
    this.accountService.getMyAccounts().subscribe({
      next: accounts => {
        this.allAccounts = accounts;
        if (this.accountId) {
          this.currentAccount = accounts.find(a => a.id === this.accountId) || null;
          this.txForm.patchValue({ accountId: this.accountId });
        }
        this.cd.detectChanges();
      }
    });
  }

  onFormAccountChange(): void {
    const id = this.txForm.get('accountId')?.value;
    if (id) {
      this.accountId = id;
      this.currentAccount = this.allAccounts.find(a => a.id === id) || null;
      this.page = 0;
      this.loadTransactions();
      this.router.navigate(['/dashboard/transactions', id], { replaceUrl: true });
    }
  }

  loadTransactions(): void {
    if (!this.accountId) return;
    this.loading = true;
    this.transactionService.getTransactions(this.accountId, this.page, this.size).subscribe({
      next: res => {
        this.transactions = res.content || [];
        this.totalPages = res.totalPages;
        this.applyFilters();
        this.loading = false;
        this.cd.detectChanges();
      },
      error: () => { this.loading = false; }
    });
  }

  applyFilters(): void {
    this.filtered = this.transactions.filter(tx => {
      const typeOk = this.filterType === 'ALL' || tx.type === this.filterType;
      const dateOk = !this.filterDate || tx.transactionDate.startsWith(this.filterDate);
      return typeOk && dateOk;
    });
  }

  nextPage(): void { if (this.page < this.totalPages - 1) { this.page++; this.loadTransactions(); } }
  prevPage(): void { if (this.page > 0) { this.page--; this.loadTransactions(); } }

  get debitCount():  number { return this.filtered.filter(t => t.type === 'DEBIT').length; }
  get creditCount(): number { return this.filtered.filter(t => t.type === 'CREDIT').length; }

  setTxType(type: 'CREDIT' | 'DEBIT'): void { this.selectedTxType = type; }

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
        this.cd.detectChanges();
      }
    }, 15000);

    const { accountId, amount, category, description } = this.txForm.value;
    const payload = {
      type: this.selectedTxType,
      amount: +amount,
      category,
      description: description || ''
    };

    this.transactionService.createTransaction(accountId, payload)
      .pipe(
        finalize(() => {
          if (this.requestTimeoutId) {
            clearTimeout(this.requestTimeoutId);
            this.requestTimeoutId = null;
          }
          this.submitting = false;
          this.cd.detectChanges();
        })
      )
      .subscribe({
        next: () => {
          const sign = this.selectedTxType === 'CREDIT' ? '+' : '-';
          this.successMsg =
            this.selectedTxType + ': ' + sign + String.fromCharCode(8377) +
            (+amount).toLocaleString('en-IN') + ' added successfully!';

          this.txForm.patchValue({ amount: null, category: '', description: '' });

          this.loadAllAccounts();
          this.page = 0;
          this.loadTransactions();
          this.currentAccount = this.allAccounts.find(a => a.id === accountId) || null;

          setTimeout(() => this.successMsg = '', 5000);
        },
        error: err => {
          this.errorMsg = err?.error?.message || 'Transaction failed. Please try again.';
          setTimeout(() => this.errorMsg = '', 5000);
        }
      });
  }
}