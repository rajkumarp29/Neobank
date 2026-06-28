import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService, LoanApplication } from '../../../services/admin';

@Component({
  selector: 'app-loan-approvals',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loan-approvals.html',
  styleUrls: ['./loan-approvals.css']
})
export class LoanApprovalsComponent implements OnInit {

  allPending: LoanApplication[] = [];
  filtered:   LoanApplication[] = [];

  loading    = true;
  searchText = '';

  selectedType = 'ALL';
  loanTypes: string[] = [];

  constructor(
    private adminService: AdminService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void { this.loadPending(); }

  loadPending(): void {
    this.loading = true;
    this.adminService.getPendingLoans().subscribe({
      next: raw => {
        this.allPending = (raw || []).map((l: any) => this.normalize(l));
        this.loanTypes  = [...new Set(
          this.allPending.map(l => l.loanType || l.productName || 'Personal Loan')
        )];
        this.applyFilter();
        this.loading = false;
        this.cd.markForCheck();
      },
      error: () => { this.loading = false; this.cd.markForCheck(); }
    });
  }

  private normalize(raw: any): LoanApplication {
    return {
      ...raw,
      requestedAmount:       raw.requestedAmount       ?? raw.loanAmount  ?? raw.amount ?? 0,
      requestedTenureMonths: raw.requestedTenureMonths ?? raw.tenureMonths ?? raw.tenure ?? 0,
      annualInterestRate:    raw.annualInterestRate     ?? raw.interestRate ?? raw.rate   ?? 0,
      appliedDate:           raw.appliedAt ?? raw.appliedDate ?? raw.applicationDate ?? raw.createdAt ?? raw.applyDate ?? raw.appliedOn ?? ''
    };
  }

  applyFilter(): void {
    let list = [...this.allPending];
    const s  = this.searchText.toLowerCase();

    if (s) {
      list = list.filter(l =>
        (l.applicantName || '').toLowerCase().includes(s) ||
        (l.productName   || '').toLowerCase().includes(s) ||
        String(l.id).includes(s) ||
        String(l.userId).includes(s)
      );
    }

    if (this.selectedType !== 'ALL') {
      list = list.filter(l =>
        (l.loanType || l.productName || 'Personal Loan') === this.selectedType
      );
    }

    this.filtered = list;
  }

  // Pass the full loan object via router state to avoid a second API call
  review(id: number): void {
    const loan = this.allPending.find(l => l.id === id);
    this.router.navigate(['/admin-panel/loan-decision', id], {
      state: { loan }
    });
  }

  get pendingCount():  number { return this.allPending.length; }
  get filteredCount(): number { return this.filtered.length;   }
}
