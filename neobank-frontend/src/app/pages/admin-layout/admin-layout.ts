import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth';
import { AdminService } from '../../services/admin';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})
export class AdminLayoutComponent implements OnInit {
  collapsed    = false;
  currentUrl   = '';
  pendingCount = 0;

  navItems = [
    { label: 'Dashboard',         icon: '📊', route: '/admin-panel/dashboard',      badge: false, match: ['/admin-panel/dashboard'] },
    { label: 'Pending Approvals', icon: '📋', route: '/admin-panel/loan-approvals', badge: true,  match: ['/admin-panel/loan-approvals', '/admin-panel/loan-decision'] },
    { label: 'User Management',   icon: '👥', route: '/admin-panel/users',          badge: false, match: ['/admin-panel/users'] },
    { label: 'Loan Products',     icon: '📦', route: '/admin-panel/loan-products',  badge: false, match: ['/admin-panel/loan-products'] },
    { label: 'System Health',     icon: '❤️', route: '/admin-panel/health',         badge: false, match: ['/admin-panel/health'] },
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private adminService: AdminService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.currentUrl = this.router.url;
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => {
        this.currentUrl = e.urlAfterRedirects;
        this.cdr.detectChanges();
      });

    this.adminService.getPendingLoans().subscribe({
      next: data => {
        this.pendingCount = (data || []).length;
        this.cdr.detectChanges();
      },
      error: () => {}
    });
  }

  isActive(item: { match?: string[]; route: string } | string): boolean {
    if (typeof item === 'string') {
      return this.currentUrl.startsWith(item);
    }
    const prefixes = item.match && item.match.length ? item.match : [item.route];
    return prefixes.some(p => this.currentUrl.startsWith(p));
  }

  goToCustomerView(): void {
    this.router.navigate(['/dashboard/home']);
  }

  logout(): void { this.authService.logout(); this.router.navigate(['/login']); }
}