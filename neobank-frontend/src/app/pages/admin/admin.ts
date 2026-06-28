import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminService, User } from '../../services/admin';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminComponent implements OnInit {

  users: User[] = [];
  loading = true;

  // ── Filter ───────────────────────────────────────────
  searchText    = '';
  selectedRole  = 'ALL';
  selectedStatus = 'ALL';

  // ── Pagination ───────────────────────────────────────
  pageSize    = 8;
  currentPage = 1;

  get filteredUsers(): User[] {
    const s = this.searchText.toLowerCase();
    return this.users.filter(u => {
      const matchSearch = u.fullName.toLowerCase().includes(s) || u.email.toLowerCase().includes(s);
      const matchRole   = this.selectedRole   === 'ALL' || u.role   === this.selectedRole;
      const matchStatus = this.selectedStatus === 'ALL' || (u.status || 'ACTIVE') === this.selectedStatus;
      return matchSearch && matchRole && matchStatus;
    });
  }

  get pagedUsers(): User[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredUsers.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.pageSize) || 1;
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(p: number): void {
    if (p >= 1 && p <= this.totalPages) this.currentPage = p;
  }

  // ── Stat counts ─────────────────────────────────────
  get activeCount():   number { return this.users.filter(u => (u.status || 'ACTIVE') === 'ACTIVE').length; }
  get inactiveCount(): number { return this.users.filter(u => (u.status || 'ACTIVE') === 'INACTIVE').length; }
  get customerCount(): number { return this.users.filter(u => u.role === 'CUSTOMER' || u.role === 'MEMBER').length; }
  get adminCount():    number { return this.users.filter(u => u.role === 'ADMIN').length; }

  // ── Confirm dialog ───────────────────────────────────
  showConfirmDialog = false;
  confirmUser: User | null = null;
  confirmAction: 'ACTIVE' | 'INACTIVE' | null = null;

  savingStatus: Record<number, boolean> = {};
  savedStatus:  Record<number, boolean> = {};

  openConfirm(user: User, action: 'ACTIVE' | 'INACTIVE'): void {
    this.confirmUser   = user;
    this.confirmAction = action;
    this.showConfirmDialog = true;
  }

  cancelConfirm(): void {
    this.showConfirmDialog = false;
    this.confirmUser   = null;
    this.confirmAction = null;
  }

  confirmStatusChange(): void {
    if (!this.confirmUser || !this.confirmAction) return;
    const user   = this.confirmUser;
    const action = this.confirmAction;
    this.cancelConfirm();
    this.savingStatus[user.id] = true;
    this.adminService.updateUserStatus(user.id, action).subscribe({
      next: () => {
        user.status = action;
        this.savingStatus[user.id] = false;
        this.savedStatus[user.id]  = true;
        setTimeout(() => { this.savedStatus[user.id] = false; this.cd.detectChanges(); }, 2000);
        this.cd.detectChanges();
      },
      error: () => { this.savingStatus[user.id] = false; this.cd.detectChanges(); }
    });
  }

  // ── Lifecycle ────────────────────────────────────────
  constructor(private adminService: AdminService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void { this.loadUsers(); }

  loadUsers(): void {
    this.loading = true;
    this.adminService.getAllUsers().subscribe({
      next: data => {
        this.users = data || [];
        this.loading = false;
        this.cd.detectChanges();
      },
      error: () => { this.loading = false; }
    });
  }

  updateRole(user: User): void {
    this.adminService.updateUserRole(user.id, user.role).subscribe({
      next: () => this.loadUsers(),
      error: err => console.error(err)
    });
  }
}