import {
  Component, OnInit,
  ViewChild, ElementRef, ChangeDetectorRef
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { InsightsService, InsightsData } from "../../services/insights";
import { AccountService } from "../../services/account";
import { UserService } from "../../services/user";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

@Component({
  selector:    "app-insights-dashboard",
  standalone:  true,
  imports:     [CommonModule],
  templateUrl: "./insights-dashboard.html",
  styleUrls:   ["./insights-dashboard.css"]
})
export class InsightsDashboardComponent implements OnInit {

  @ViewChild("barChart") barChartRef!: ElementRef<HTMLCanvasElement>;

  loading    = true;
  hasData    = false;
  apiError   = false;
  private chart: Chart | null = null;

  totalBalance     = 0;
  totalIncome      = 0;
  totalExpenses    = 0;
  netSavings       = 0;
  savingsNegative  = false;
  transactionCount = 0;

  monthlyTrend: { month: string; income: number; expense: number; savings: number }[] = [];
  spendingByCategory: { category: string; amount: number; percentage: number }[] = [];

  categoryColors = [
    "#6366f1","#06b6d4","#10b981","#f59e0b","#ef4444",
    "#8b5cf6","#ec4899","#14b8a6","#f97316","#84cc16"
  ];

  constructor(
    private insightsService: InsightsService,
    private accountService:  AccountService,
    private userService:     UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void { this.loadInsights(); }

  loadInsights(): void {
    this.loading  = true;
    this.hasData  = false;
    this.apiError = false;
    if (this.chart) { this.chart.destroy(); this.chart = null; }

    this.accountService.getMyAccounts().subscribe({
      next: accounts => {
        this.totalBalance = accounts.reduce((s, a) => s + a.balance, 0);
        this.cdr.detectChanges();
      },
      error: () => {}
    });

    this.userService.getProfile().subscribe({
      next: user => {
        if (!user.id) {
          this.loading  = false;
          this.apiError = true;
          this.cdr.detectChanges();
          return;
        }
        this.fetchInsights(user.id);
      },
      error: () => {
        this.loading  = false;
        this.apiError = true;
        this.cdr.detectChanges();
      }
    });
  }

  private fetchInsights(userId: number): void {
    this.insightsService.getInsights(userId).subscribe({
      next: (data: InsightsData) => {
        this.loading = false;

        if (!data) { this.hasData = false; this.cdr.detectChanges(); return; }

        this.hasData          = true;
        this.totalIncome      = data.totalIncome     ?? 0;
        this.totalExpenses    = data.totalExpenses    ?? 0;
        this.transactionCount = data.transactionCount ?? 0;
        this.netSavings       = this.totalIncome - this.totalExpenses;
        this.savingsNegative  = this.netSavings < 0;

        this.monthlyTrend = (data.monthlyTrend ?? []).map(m => ({
          month:   m.month,
          income:  m.income  ?? 0,
          expense: m.expense ?? 0,
          savings: (m.income ?? 0) - (m.expense ?? 0)
        }));

        const cats  = data.spendingByCategory ?? [];
        const total = cats.reduce((s, c) => s + c.amount, 0) || 1;
        this.spendingByCategory = cats.map(c => ({
          category:   c.category,
          amount:     c.amount,
          percentage: Math.round((c.amount / total) * 100)
        }));

        // Render view first, then build chart after DOM updates
        this.cdr.detectChanges();
        setTimeout(() => this.buildChart(), 100);
      },
      error: (err) => {
        console.error("Insights error:", err?.status, err?.url);
        this.loading  = false;
        this.apiError = true;
        this.cdr.detectChanges();
      }
    });
  }

  private buildChart(): void {
    if (!this.barChartRef?.nativeElement) {
      console.warn("barChart canvas not found");
      return;
    }
    if (!this.monthlyTrend.length) return;
    if (this.chart) { this.chart.destroy(); this.chart = null; }

    this.chart = new Chart(this.barChartRef.nativeElement, {
      type: "bar",
      data: {
        labels: this.monthlyTrend.map(m => m.month),
        datasets: [
          {
            label: "Income",
            data: this.monthlyTrend.map(m => m.income),
            backgroundColor: "rgba(16,185,129,0.75)",
            borderRadius: 6, borderSkipped: false
          },
          {
            label: "Expenses",
            data: this.monthlyTrend.map(m => m.expense),
            backgroundColor: "rgba(239,68,68,0.65)",
            borderRadius: 6, borderSkipped: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: "#94a3b8", font: { size: 12 } } },
          tooltip: {
            callbacks: {
              label: ctx => " \u20B9 " + (ctx.parsed.y as number).toLocaleString("en-IN")
            }
          }
        },
        scales: {
          x: {
            ticks: { color: "#64748b" },
            grid:  { color: "rgba(255,255,255,0.04)" }
          },
          y: {
            ticks: {
              color: "#64748b",
              callback: v => "\u20B9" + Number(v).toLocaleString("en-IN")
            },
            grid: { color: "rgba(255,255,255,0.06)" }
          }
        }
      }
    });
  }
}
