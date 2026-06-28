import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoanService } from '../../../services/loan';

@Component({
  selector: 'app-repayment-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './repayment-schedule.html',
  styleUrls: ['./repayment-schedule.css']
})
export class RepaymentScheduleComponent implements OnInit {

  schedule: any[] = [];
  filteredSchedule: any[] = [];

  loanId!: number;

  // ✅ FILTERS
  selectedStatus = 'ALL';
  fromDate: string = '';
  toDate: string = '';

  // ✅ PAGINATION
  page = 1;
  pageSize = 5;

  // ✅ DASHBOARD DATA
  totalAmount = 0;
  paidAmount = 0;
  remainingAmount = 0;
  overdueCount = 0;
  progressPercent = 0;

  constructor(
    private route: ActivatedRoute,
    private service: LoanService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const rawId = this.route.snapshot.paramMap.get('id');
    this.loanId = Number(rawId?.trim());
    this.loadSchedule();
  }

  loadSchedule() {
    this.service.getRepayments(this.loanId).subscribe({
      next: (res) => {
        this.schedule = [...res];
        this.applyFilter();
        this.calculateSummary();  // ✅ important
        this.cd.detectChanges();
      }
    });
  }

  /* ✅ FILTER LOGIC */
  applyFilter() {
    let data = [...this.schedule];

    if (this.selectedStatus !== 'ALL') {
      data = data.filter(r => r.status === this.selectedStatus);
    }

    if (this.fromDate) {
      data = data.filter(r => new Date(r.dueDate) >= new Date(this.fromDate));
    }

    if (this.toDate) {
      data = data.filter(r => new Date(r.dueDate) <= new Date(this.toDate));
    }

    this.filteredSchedule = data;
    this.page = 1;
  }

  /* ✅ PAGINATION */
  get paginatedData() {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredSchedule.slice(start, start + this.pageSize);
  }

  totalPages() {
    return Math.ceil(this.filteredSchedule.length / this.pageSize);
  }

  nextPage() {
    if (this.page < this.totalPages()) this.page++;
  }

  prevPage() {
    if (this.page > 1) this.page--;
  }

  /* ✅ DASHBOARD CALCULATION */
  calculateSummary() {
    this.totalAmount = 0;
    this.paidAmount = 0;
    this.remainingAmount = 0;
    this.overdueCount = 0;

    this.schedule.forEach(r => {
      this.totalAmount += r.emiAmount;

      if (r.status === 'PAID') {
        this.paidAmount += r.emiAmount;
      } else {
        this.remainingAmount += r.emiAmount;
      }

      if (r.status === 'OVERDUE') {
        this.overdueCount++;
      }
    });

    this.progressPercent =
      this.totalAmount > 0
        ? (this.paidAmount / this.totalAmount) * 100
        : 0;
  }

  /* ✅ PAY EMI */
  payEmi(repaymentId: number) {
    this.service.payEmi(this.loanId, repaymentId).subscribe({
      next: () => {
        alert('✅ Payment successful');
        this.loadSchedule();
      }
    });
  }

  getStatusClass(status: string) {
    return {
      'status-pending': status === 'PENDING',
      'status-paid': status === 'PAID',
      'status-overdue': status === 'OVERDUE'
    };
  }
}
