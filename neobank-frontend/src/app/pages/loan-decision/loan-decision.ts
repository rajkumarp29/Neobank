import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService, LoanApplication } from '../../services/admin';

@Component({
  selector: 'app-loan-decision',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loan-decision.html',
  styleUrls: ['./loan-decision.css']
})
export class LoanDecisionComponent implements OnInit {

  loan: LoanApplication | null = null;
  loading = true;
  acting  = false;
  decision: 'APPROVED' | 'REJECTED' | null = null;

  // Captured in the constructor BEFORE Angular's navigation completes,
  // so the loan passed via router state isn't lost.
  private preloadedLoan: LoanApplication | null = null;

  constructor(
    private route:        ActivatedRoute,
    private router:       Router,
    private adminService: AdminService,
    private cdr:          ChangeDetectorRef
  ) {
    // 1. Try current navigation (works during component creation)
    const nav = this.router.getCurrentNavigation();
    const fromNav = nav?.extras?.state?.['loan'] as LoanApplication | undefined;

    // 2. Fall back to browser history state (works even on reload-after-nav)
    const fromHistory = (typeof history !== 'undefined' && history.state)
      ? (history.state.loan as LoanApplication | undefined)
      : undefined;

    this.preloadedLoan = fromNav || fromHistory || null;
  }

  ngOnInit(): void {
    // ✅ Use pre-loaded loan immediately when available
    if (this.preloadedLoan) {
      this.loan    = this.preloadedLoan;
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }

    // Fallback path — fetch by ID
    const idParam = this.route.snapshot.paramMap.get('id');
    const id      = idParam ? Number(idParam) : NaN;

    if (!id || Number.isNaN(id)) {
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }

    // Try direct getById first
    this.adminService.getLoanById(id).subscribe({
      next: data => {
        this.loan    = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        // ❗ Backend may forbid /loans/{id} — fall back to scanning the pending list
        this.fetchFromPending(id);
      }
    });
  }

  /** Last-resort: pull the full pending list and find this loan client-side */
  private fetchFromPending(id: number): void {
    this.adminService.getPendingLoans().subscribe({
      next: list => {
        this.loan    = (list || []).find(l => l.id === id) || null;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  approve(): void {
    if (!this.loan || this.acting) return;
    this.acting = true;
    this.adminService.approveLoan(this.loan.id).subscribe({
      next: () => { this.decision = 'APPROVED'; this.acting = false; this.cdr.detectChanges(); },
      error: () => { this.acting = false; this.cdr.detectChanges(); }
    });
  }

  reject(): void {
    if (!this.loan || this.acting) return;
    this.acting = true;
    this.adminService.rejectLoan(this.loan.id).subscribe({
      next: () => { this.decision = 'REJECTED'; this.acting = false; this.cdr.detectChanges(); },
      error: () => { this.acting = false; this.cdr.detectChanges(); }
    });
  }

  back(): void {
    // ✅ Return to approvals in whichever shell we came from
    const shell = this.router.url.startsWith('/admin-panel') ? '/admin-panel' : '/dashboard';
    this.router.navigate([shell, 'loan-approvals']);
  }
}
