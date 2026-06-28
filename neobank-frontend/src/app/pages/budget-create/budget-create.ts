import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { BudgetService } from '../../services/budget';

@Component({
  selector: 'app-budget-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './budget-create.html',
  styleUrls: ['./budget-create.css']
})
export class BudgetCreateComponent {

  categories = [
    'GROCERIES',
    'UTILITIES',
    'RENT',
    'ENTERTAINMENT',
    'TRANSFER',
    'OTHER'
  ];

  category = '';
  budgetMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
  limitAmount: number | null = null;

  submitting = false;
  success = false;
  errorMessage = '';

  constructor(
    private budgetService: BudgetService,
    private router: Router
  ) {}

  /* =========================
     ✅ BUDGET PREVIEW GETTERS
     ========================= */

  get dailyLimit(): number {
    return this.limitAmount ? Math.round(this.limitAmount / 30) : 0;
  }

  get weeklyLimit(): number {
    return this.limitAmount ? Math.round(this.limitAmount / 4) : 0;
  }

  get categoryIcon(): string {
    switch (this.category) {
      case 'GROCERIES': return '🛒';
      case 'UTILITIES': return '💡';
      case 'RENT': return '🏠';
      case 'ENTERTAINMENT': return '🎬';
      case 'TRANSFER': return '🔁';
      default: return '💰';
    }
  }

  /* =========================
     ✅ CREATE BUDGET
     ========================= */

  createBudget(): void {
    if (!this.category || !this.budgetMonth || !this.limitAmount || this.limitAmount <= 0) {
      this.errorMessage = 'Please fill all fields with valid values';
      return;
    }

    this.errorMessage = '';
    this.submitting = true;
    this.success = false;

    const payload = {
      category: this.category,
      budgetMonth: this.budgetMonth,
      limitAmount: this.limitAmount
    };

    this.budgetService.create(payload).subscribe({
      next: () => {
        this.submitting = false;
        this.success = true;

        // ✅ Redirect to Budget OVERVIEW (not accounts)
        setTimeout(() => {
          this.router.navigate(['/dashboard/budget']);
        }, 1200);
      },

      error: err => {
        this.submitting = false;
        this.success = false;

        // ✅ Duplicate budget case
        if (err.status === 409) {
          this.errorMessage =
            'A budget for this category already exists for the selected month.';

          setTimeout(() => {
            this.router.navigate(['/dashboard/budget']);
          }, 1800);
        } else {
          this.errorMessage =
            err?.error?.message || 'Failed to create budget';
        }
      }
    });
  }

  /* =========================
     ✅ CANCEL / BACK
     ========================= */

  goBack(): void {
    this.router.navigate(['/dashboard/budget']);
  }
}