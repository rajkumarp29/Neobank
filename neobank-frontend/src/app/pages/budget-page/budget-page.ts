import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { BudgetService } from '../../services/budget';
import { BudgetDashboardComponent } from '../budget-dashboard/budget-dashboard';

@Component({
  selector: 'app-budget-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    BudgetDashboardComponent
  ],
  templateUrl: './budget-page.html',
  styleUrls: ['./budget-page.css']
})
export class BudgetPageComponent implements OnInit {

  // ========================
  // STATE
  // ========================
  budgets: any[] = [];
  budgetMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
  loading = false;

  constructor(
    private budgetService: BudgetService,
    private cdr: ChangeDetectorRef
  ) {}

  // ========================
  // INIT
  // ========================
  ngOnInit(): void {
    this.loadBudgets();
  }

  // ========================
  // LOAD DATA (FIXED ✅)
  // ========================
  loadBudgets(): void {
    this.loading = true;
    this.budgets = []; // ✅ reset

    this.budgetService.getSummary(this.budgetMonth).subscribe({
      next: (res) => {
        this.budgets = res.categories || [];
        this.loading = false;

        this.cdr.detectChanges(); // ✅ FIX: force UI refresh
      },
      error: () => {
        this.loading = false;

        this.cdr.detectChanges(); // ✅ safety
      }
    });
  }
}