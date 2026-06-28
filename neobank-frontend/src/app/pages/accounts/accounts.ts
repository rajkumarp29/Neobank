import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AccountService, Account } from '../../services/account';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, RouterModule],
  templateUrl: './accounts.html',
  styleUrls: ['./accounts.css']
})
export class AccountsComponent implements OnInit {

  accounts: Account[] = [];
  isLoading = true;          // ← NEW
  loadError = false;          // ← NEW (optional, but good practice)

  totalBalance = 0;
  savingsBalance = 0;
  currentBalance = 0;
  savingsCount = 0;
  currentCount = 0;

  userName = '';
  greetingMessage = '';

  selectedAccount: Account | null = null;
  balanceHidden = false;

  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userName = this.authService.getFullName() || 'User';
    this.setGreeting();
    this.loadAccounts();
  }

  setGreeting(): void {
    const h = new Date().getHours();
    this.greetingMessage =
      h < 12 ? 'Good Morning' :
      h < 17 ? 'Good Afternoon' :
      'Good Evening';
  }

  loadAccounts(): void {
    this.isLoading = true;
    this.loadError = false;

    this.accountService.getMyAccounts().subscribe({
      next: data => {
        this.accounts = data;

        if (this.accounts.length > 0) {
          this.selectedAccount = this.accounts[0];
        }

        this.calculateSummary();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.loadError = true;
      }
    });
  }

  calculateSummary(): void {
    this.totalBalance = 0;
    this.savingsBalance = 0;
    this.currentBalance = 0;
    this.savingsCount = 0;
    this.currentCount = 0;

    this.accounts.forEach(acc => {
      this.totalBalance += acc.balance;

      if (acc.accountType === 'SAVINGS') {
        this.savingsBalance += acc.balance;
        this.savingsCount++;
      }

      if (acc.accountType === 'CURRENT') {
        this.currentBalance += acc.balance;
        this.currentCount++;
      }
    });
  }

  get savingsAccounts(): Account[] {
    return this.accounts.filter(acc => acc.accountType === 'SAVINGS');
  }

  get currentAccounts(): Account[] {
    return this.accounts.filter(acc => acc.accountType === 'CURRENT');
  }

  selectAccount(acc: Account): void {
    this.selectedAccount = acc;
  }

  openNewAccountPage(): void {
    this.router.navigate(['/dashboard/open-account']);
  }

  toggleBalance(): void {
    this.balanceHidden = !this.balanceHidden;
  }

    // ✅ ADD HERE
  getCardHolderName(account?: Account | null): string {
    return account?.user?.fullName?.toUpperCase()
        || this.userName.toUpperCase();
  }

  maskedNumber(num: string): string {
    if (!num) return '';
    const clean = num.replace(/\s+/g, '').toUpperCase();
    const chunks = clean.match(/.{1,4}/g) || [clean];
    if (chunks.length <= 2) return chunks.join('  ');
    return chunks
      .map((c, i) => (i === 0 || i === chunks.length - 1) ? c : '••••')
      .join('  ');
  }

  onCardMove(event: MouseEvent, card: HTMLElement): void {
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    card.style.setProperty('--rx', `${(0.5 - py) * 10}deg`);
    card.style.setProperty('--ry', `${(px - 0.5) * 14}deg`);
    card.style.setProperty('--gx', `${px * 100}%`);
    card.style.setProperty('--gy', `${py * 100}%`);
  }

  onCardLeave(card: HTMLElement): void {
    card.style.setProperty('--rx', `0deg`);
    card.style.setProperty('--ry', `0deg`);
  }
}