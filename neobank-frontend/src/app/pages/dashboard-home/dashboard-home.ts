import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { AccountService, Account } from "../../services/account";
import { UserService, User } from "../../services/user";

@Component({
  selector: "app-dashboard-home",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./dashboard-home.html",
  styleUrls: ["./dashboard-home.css"]
})
export class DashboardHomeComponent implements OnInit {

  userName      = "";
  greeting      = "";
  totalBalance  = 0;
  totalAccounts = 0;
  savingsCount  = 0;
  currentCount  = 0;

  // Admin Dashboard Properties
  isAdmin       = false;
  allAccounts: Account[] = [];
  adminTotalBalance = 0;
  adminTotalAccounts = 0;

  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.greeting = this.getGreeting();

    // Get current user and check if admin
    this.userService.getProfile().subscribe({
      next: (user: User) => {
        const parts = (user.fullName || "").split(" ");
        this.userName = parts[0] || user.email;
        
        // Check if user is admin
        this.isAdmin = user.role === "ADMIN";
        
        // Load all accounts if admin
        if (this.isAdmin) {
          this.loadAllAccounts();
        }
        
        this.cdr.detectChanges();
      },
      error: () => {}
    });

    this.accountService.getMyAccounts().subscribe({
      next: accounts => {
        this.totalAccounts = accounts.length;
        this.totalBalance  = accounts.reduce((s, a) => s + a.balance, 0);
        this.savingsCount  = accounts.filter(a => a.accountType === "SAVINGS").length;
        this.currentCount  = accounts.filter(a => a.accountType === "CURRENT").length;
        this.cdr.detectChanges();
      },
      error: () => {}
    });
  }

  private getGreeting(): string {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
  }

  /**
   * Load all accounts (Admin only)
   */
  loadAllAccounts(): void {
    this.accountService.getMyAccounts().subscribe({
      next: (accounts: Account[]) => {
        this.allAccounts = accounts;
        this.adminTotalBalance = this.getTotalBalance();
        this.adminTotalAccounts = this.getTotalAccountCount();
        this.cdr.detectChanges();
      },
      error: () => {
        console.error("Failed to load all accounts");
      }
    });
  }

  /**
   * Mask account number: 148a0a33d1e5 → 148A •••• D1E5
   */
  maskAccount(accountNumber: string): string {
    if (!accountNumber || accountNumber.length < 8) {
      return accountNumber || "";
    }
    const first = accountNumber.substring(0, 4).toUpperCase();
    const last = accountNumber.substring(accountNumber.length - 4).toUpperCase();
    return `${first} •••• ${last}`;
  }

  /**
   * Get total balance of all accounts (Admin section)
   */
  getTotalBalance(): number {
    return this.allAccounts.reduce((sum, acc) => sum + (acc.balance || 0), 0);
  }

  /**
   * Get total account count (Admin section)
   */
  getTotalAccountCount(): number {
    return this.allAccounts.length;
  }

  go(path: string): void { this.router.navigate([path]); }
}
