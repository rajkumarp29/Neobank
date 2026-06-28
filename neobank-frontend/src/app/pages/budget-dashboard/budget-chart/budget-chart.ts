import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

/* ✅ CENTER TEXT PLUGIN */
const centerTextPlugin = {
  id: 'centerText',
  beforeDraw(chart: any) {

    const { ctx, width, height } = chart;

    const total = chart.data.datasets[0].data
      .reduce((a: number, b: number) => a + b, 0);

    ctx.save();

    // ₹ value
    ctx.font = 'bold 20px sans-serif';
    ctx.fillStyle = '#1e293b';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`₹${total}`, width / 2, height / 2 - 8);

    // subtitle
    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText('Total Spent', width / 2, height / 2 + 14);

    ctx.restore();
  }
};

@Component({
  selector: 'app-budget-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './budget-chart.html',
  styleUrls: ['./budget-chart.css']
})
export class BudgetChartComponent implements OnChanges, OnDestroy {

  @Input() budgets: any[] = [];

  private donutChart?: Chart;
  private barChart?: Chart;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.budgets?.length) {
      setTimeout(() => this.renderCharts(), 0);
    }
  }

  renderCharts() {
    this.donutChart?.destroy();
    this.barChart?.destroy();

    this.createDonutChart();
    this.createBarChart();
  }

  /* =========================
     ✅ DONUT CHART (ANIMATED + CENTER TEXT)
  ========================= */
  createDonutChart() {

    this.donutChart = new Chart('donutChart', {
      type: 'doughnut',
      data: {
        labels: this.budgets.map(b => b.category),
        datasets: [{
          data: this.budgets.map(b => b.spentAmount),
          backgroundColor: [
            '#22c55e',
            '#f59e0b',
            '#ef4444',
            '#3b82f6',
            '#8b5cf6',
            '#14b8a6'
          ],
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%', // ✅ thinner donut

        animation: {
          animateRotate: true,
          duration: 1200  // ✅ smooth animation
        },

        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: { size: 10 }
            }
          },

          tooltip: {
            callbacks: {
              label: (ctx: any) => `₹${ctx.raw}`
            }
          }
        }
      },

      plugins: [centerTextPlugin]  // ✅ IMPORTANT
    });
  }

  /* =========================
     ✅ BAR CHART (GRADIENT)
  ========================= */
  createBarChart() {

    const that = this;

    this.barChart = new Chart('barChart', {
      type: 'bar',

      data: {
        labels: this.budgets.map(b => b.category),

        datasets: [
          {
            label: 'Budget Limit',
            data: this.budgets.map(b => b.limitAmount),

            backgroundColor: (ctx: any) => {
              const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300);
              gradient.addColorStop(0, '#cbd5f5');
              gradient.addColorStop(1, '#94a3b8');
              return gradient;
            },

            borderRadius: 8,
            barThickness: 22
          },

          {
            label: 'Spent',
            data: this.budgets.map(b => b.spentAmount),

            backgroundColor: (ctx: any) => {
              const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300);
              gradient.addColorStop(0, '#22c55e');
              gradient.addColorStop(1, '#16a34a');
              return gradient;
            },

            borderRadius: 8,
            barThickness: 22
          }
        ]
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,

        animation: {
          duration: 1200  // ✅ smooth animation
        },

        plugins: {
          legend: {
            position: 'top'
          }
        },

        scales: {
          x: {
            grid: { display: false }
          },

          y: {
            beginAtZero: true,
            ticks: {
              callback: (value: any) => '₹' + value
            }
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.donutChart?.destroy();
    this.barChart?.destroy();
  }
}