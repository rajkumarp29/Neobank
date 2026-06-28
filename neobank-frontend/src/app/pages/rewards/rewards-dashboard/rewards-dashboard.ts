import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RewardsService, RewardEntry } from '../../../services/rewards';
import { AccountService, Account } from '../../../services/account';


@Component({
  selector: 'app-rewards-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rewards-dashboard.html',
  styleUrls: ['./rewards-dashboard.css']
})
export class RewardsDashboardComponent implements OnInit {

  pointsBalance = 0;

  // History split by type
  earned: RewardEntry[] = [];
  redeemed: RewardEntry[] = [];

  // Summary totals
  totalEarned = 0;
  totalRedeemed = 0;

  // Redeem form
  accounts: Account[] = [];
  selectedAccountId = '';
  pointsToRedeem = 100;

  // UI state
  redeeming = false;
  redeemSuccess = false;

  get cashValue(): number {
    return (this.pointsToRedeem || 0) / 100;
  }

  constructor(
    private rewardsService: RewardsService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.loadRewards();
    this.loadAccounts();
  }

  loadRewards(): void {
    this.rewardsService.state$.subscribe(state => {
      this.pointsBalance = state.balance;

      this.earned   = state.history.filter(h => h.points > 0);
      this.redeemed = state.history.filter(h => h.points < 0);

      this.totalEarned   = this.earned.reduce((sum, h) => sum + h.points, 0);
      this.totalRedeemed = this.redeemed.reduce((sum, h) => sum + Math.abs(h.points), 0);
    });
  }

  loadAccounts(): void {
    this.accountService.getMyAccounts().subscribe({
      next: accounts => this.accounts = accounts,
      error: () => this.accounts = []
    });
  }

  redeem(): void {
    if (
      this.redeeming ||
      !this.selectedAccountId ||
      this.pointsToRedeem < 100 ||
      this.pointsToRedeem > this.pointsBalance
    ) return;

    this.redeeming = true;
    this.redeemSuccess = false;

    // Credit the selected account then deduct points
    this.accountService.credit(this.selectedAccountId, this.cashValue).subscribe({
      next: () => {
        this.rewardsService.redeemPoints(this.pointsToRedeem, 'Cash Redemption to Account');
        this.redeemSuccess = true;
        this.pointsToRedeem = 100;
        this.selectedAccountId = '';
        this.redeeming = false;
        setTimeout(() => this.redeemSuccess = false, 5000);
      },
      error: () => {
        this.redeeming = false;
      }
    });
  }
}