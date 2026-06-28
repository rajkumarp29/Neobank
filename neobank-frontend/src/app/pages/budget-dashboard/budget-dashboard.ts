import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetChartComponent } from './budget-chart/budget-chart';

@Component({
  selector: 'app-budget-dashboard',
  standalone: true,
  imports: [CommonModule, BudgetChartComponent],
  templateUrl: './budget-dashboard.html',
  styleUrls: ['./budget-dashboard.css']
})
export class BudgetDashboardComponent {

  @Input() budgets: any[] = [];
  @Input() month = '';

  /* =========================
     ✅ UTILIZATION %
  ========================= */
  getUtilization(spent: number, limit: number): number {
    if (!limit || limit === 0) return 0;
    return Math.round((spent / limit) * 100);
  }

  /* =========================
     ✅ COLOR CLASS
  ========================= */
  getColorClass(percent: number): string {
    if (percent < 75) return 'green';
    if (percent < 100) return 'amber';
    return 'red';
  }

  /* =========================
     ✅ ICON MAPPING (NEW 🔥)
  ========================= */
  getIcon(category: string): string {

    const c = category?.toUpperCase(); // ✅ FIX

    const map: any = {
      ENTERTAINMENT: '🎬',
      GROCERIES: '🛒',
      RENT: '🏠',
      UTILITIES: '💡',
      TRANSFER: '🔄',
      OTHER: '💰'
    };

    return map[c] || '💳';
  }

  /* =========================
     ✅ TOP CATEGORY (NEXT FEATURE READY 🚀)
  ========================= */
  getTopCategory(): any {
    if (!this.budgets || this.budgets.length === 0) return null;

    return this.budgets.reduce((max, current) => {
      const currentPercent = this.getUtilization(
        current.spentAmount,
        current.limitAmount
      );

      const maxPercent = this.getUtilization(
        max.spentAmount,
        max.limitAmount
      );

      return currentPercent > maxPercent ? current : max;
    });
  }
}