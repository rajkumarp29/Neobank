import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BillService } from '../../services/bill';
import { RewardsService } from '../../services/rewards';

@Component({
  selector: 'app-bills-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bills-list.html',
  styleUrls: ['./bills-list.css']
})
export class BillsListComponent implements OnInit {

  bills: any[] = [];
  totalBills   = 0;
  pendingCount = 0;
  paidCount    = 0;
  overdueCount = 0;
  loading      = true;

  // ── Toast notification ──────────────────────────────
  toastMsg     = '';
  toastVisible = false;
  toastPts     = 0;
  private toastTimer: any;

  constructor(
    private billService:    BillService,
    private rewardsService: RewardsService,
    private cd:             ChangeDetectorRef
  ) {}

  ngOnInit(): void { this.loadBills(); }

  loadBills(): void {
    this.billService.getBills().subscribe({
      next: data => {
        this.bills = data || [];
        this.sortBills();
        this.updateBillCounts();
        this.loading = false;
        this.cd.detectChanges();
      },
      error: () => { this.loading = false; this.cd.detectChanges(); }
    });
  }

  sortBills(): void {
    const priority: Record<string, number> = { OVERDUE: 1, PENDING: 2, PAID: 3 };
    this.bills.sort((a, b) => (priority[a.status] ?? 4) - (priority[b.status] ?? 4));
  }

  updateBillCounts(): void {
    this.totalBills   = this.bills.length;
    this.pendingCount = this.bills.filter(b => b.status === 'PENDING').length;
    this.paidCount    = this.bills.filter(b => b.status === 'PAID').length;
    this.overdueCount = this.bills.filter(b => this.isOverdue(b)).length;
  }

  markPaid(bill: any): void {
    const prevStatus = bill.status;
    bill.status  = 'PAID';
    bill.remindMe = false;
    this.sortBills();
    this.updateBillCounts();
    this.cd.detectChanges();

    this.billService.markAsPaid(bill.id).subscribe({
      next: () => {
        // ✅ Earn reward points for this bill payment
        const pts = this.rewardsService.calcBillPoints(bill.amount ?? 0);
        this.rewardsService.earnPoints(
          `${bill.billerName || bill.category || 'Bill'} Payment`,
          pts
        );
        this.showToast(bill.billerName || 'Bill', pts);
        this.cd.detectChanges();
      },
      error: () => {
        bill.status = prevStatus;
        this.sortBills();
        this.updateBillCounts();
        this.cd.detectChanges();
      }
    });
  }

  isOverdue(bill: any): boolean {
    return new Date(bill.dueDate) < new Date() && bill.status !== 'PAID';
  }

  // ── Toast ─────────────────────────────────────────────
  showToast(name: string, pts: number): void {
    this.toastMsg     = `${name} paid!`;
    this.toastPts     = pts;
    this.toastVisible = true;
    this.cd.detectChanges();
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.toastVisible = false;
      this.cd.detectChanges();
    }, 3500);
  }
}
