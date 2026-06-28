import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoanService } from '../../../services/loan';

@Component({
  selector: 'app-my-loans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-loans.html',
  styleUrls: ['./my-loans.css']
})
export class MyLoansComponent implements OnInit {

  loans: any[] = [];
  loading = true;

get totalPrincipal(): number {
  return this.loans.reduce(
    (sum, l) =>
      sum + (l.principalAmount ?? 0),
    0
  );
}

get totalEmi(): number {
  return this.loans.reduce(
    (sum, l) =>
      sum + (l.emiAmount ?? 0),
    0
  );
}
  constructor(
    private service: LoanService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.service.getMyLoans().subscribe({
      next: res => {
        this.loans   = Array.isArray(res) ? res : (res as any)?.content ?? [];
        this.loading = false;
        this.cd.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cd.detectChanges();
      }
    });
  }

  openSchedule(id: number): void {
    this.router.navigate(['/dashboard/loans/schedule', id.toString().trim()]);
  }
}