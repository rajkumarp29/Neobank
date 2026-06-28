import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../../services/user';
import { AdminService, User } from '../../services/admin';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent implements OnInit {

  currentUserName = '';
  loading = true;

  totalUsers    = 0;
  customerCount = 0;
  adminCount    = 0;

  totalLoans    = 0;
  approvedLoans = 0;
  rejectedLoans = 0;
  pendingLoans  = 0;

  loanProductsCount = 0;

  get today(): string {
    return new Date().toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short' });
  }

  get totalActivity(): number {
    return this.totalUsers + this.totalLoans + this.loanProductsCount;
  }

  get healthScore(): number {
    if (this.loading || this.totalLoans === 0) return 100;
    const denied = this.rejectedLoans + this.pendingLoans;
    return Math.max(0, Math.round(((this.totalLoans - denied) / this.totalLoans) * 100));
  }

  constructor(
    private userService:  UserService,
    private adminService: AdminService,
    private cdr:          ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (me: any) => { this.currentUserName = me?.fullName || me?.name || 'Admin'; this.cdr.detectChanges(); },
      error: () => {}
    });

    forkJoin({
      users:    this.adminService.getAllUsers().pipe(catchError(() => of([] as User[]))),
      loans:    this.adminService.getAllLoans().pipe(catchError(() => of([] as any[]))),
      products: this.adminService.getLoanProducts().pipe(catchError(() => of([] as any[])))
    }).subscribe({
      next: ({ users, loans, products }) => {
        this.totalUsers    = users.length;
        this.customerCount = users.filter((u: User) => u.role === 'CUSTOMER' || u.role === 'MEMBER').length;
        this.adminCount    = users.filter((u: User) => u.role === 'ADMIN'    || u.role === 'MANAGER').length;

        this.totalLoans    = loans.length;
        this.approvedLoans = loans.filter((l: any) => l.status === 'APPROVED').length;
        this.rejectedLoans = loans.filter((l: any) => l.status === 'REJECTED').length;
        this.pendingLoans  = loans.filter((l: any) => l.status === 'PENDING').length;

        this.loanProductsCount = (products || []).length;

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}