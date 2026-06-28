import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BillService } from '../../services/bill';
import { AuthService } from '../../services/auth';

export interface Biller {
  id: number;
  name: string;
  category: string;
  icon: string;
  color: string;
  bg: string;
  hint: string;
}

@Component({
  selector: 'app-bills-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bills-create.html',
  styleUrls: ['./bills-create.css']
})
export class BillsCreateComponent {

  today: string = new Date().toISOString().split('T')[0];
  activeCategory: string = 'All';
  selectedBiller: Biller | null = null;
  loading: boolean = false;
  error: string = '';
  success: boolean = false;

  bill: { billerName: string; amount: number | null; dueDate: string } = {
    billerName: '', amount: null, dueDate: ''
  };

  categories: string[] = ['All', 'Electricity', 'Water', 'Telecom', 'Gas', 'Insurance', 'DTH', 'Other'];

  billers: Biller[] = [
    { id: 1, name: 'City Electricity Board', category: 'Electricity', icon: '&#x26A1;', color: '#f59e0b', bg: '#fffbeb', hint: 'Enter your consumer number' },
    { id: 2, name: 'State Power Corp',        category: 'Electricity', icon: '&#128268;', color: '#f97316', bg: '#fff7ed', hint: 'Enter your account number' },
    { id: 3, name: 'Municipal Water Supply',  category: 'Water',       icon: '&#128167;', color: '#06b6d4', bg: '#ecfeff', hint: 'Enter your connection ID' },
    { id: 4, name: 'Airtel Postpaid',         category: 'Telecom',     icon: '&#128241;', color: '#ef4444', bg: '#fef2f2', hint: 'Enter your mobile number' },
    { id: 5, name: 'Jio Postpaid',            category: 'Telecom',     icon: '&#128225;', color: '#3b82f6', bg: '#eff6ff', hint: 'Enter your Jio number' },
    { id: 6, name: 'BSNL Broadband',          category: 'Telecom',     icon: '&#127760;', color: '#6366f1', bg: '#eef2ff', hint: 'Enter your landline number' },
    { id: 7, name: 'Indane Gas',              category: 'Gas',         icon: '&#128293;', color: '#f97316', bg: '#fff7ed', hint: 'Enter your consumer ID' },
    { id: 8, name: 'LIC Premium',             category: 'Insurance',   icon: '&#128156;', color: '#10b981', bg: '#ecfdf5', hint: 'Enter your policy number' },
    { id: 9, name: 'Tata Sky DTH',            category: 'DTH',         icon: '&#128250;', color: '#8b5cf6', bg: '#f5f3ff', hint: 'Enter your subscriber ID' },
    { id: 10, name: 'Other',          category: 'Other',       icon: '&#128196;', color: '#818cf8', bg: '#1e1b4b', hint: 'Enter your biller details' }
  ];

  get filteredBillers(): Biller[] {
    if (this.activeCategory === 'All') return this.billers;
    return this.billers.filter(b => b.category === this.activeCategory);
  }

  constructor(
    private billService: BillService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  selectBiller(b: Biller): void {
    this.selectedBiller = b;
    this.bill = { billerName: '', amount: null, dueDate: '' };
    this.error = '';
    this.success = false;
    this.cdr.detectChanges();
  }

  goBack(): void {
    this.selectedBiller = null;
    this.error = '';
    this.cdr.detectChanges();
  }

  submit(): void {
    if (!this.bill.amount || !this.bill.dueDate || (this.selectedBiller?.category === 'Other' && !this.bill.billerName)) {
      this.error = 'Please fill all required fields.';
      return;
    }
    this.loading = true;
    this.error = '';
    const payload = {
      billerName: this.selectedBiller?.name || this.bill.billerName,
      amount: this.bill.amount,
      dueDate: this.bill.dueDate
    };
    this.billService.createBill(payload).subscribe({
      next: () => {
        this.loading = false;
        this.success = true;
        this.cdr.detectChanges();
        setTimeout(() => this.router.navigate(['/dashboard/bills']), 1800);
      },
      error: (err: any) => {
        this.loading = false;
        if (err.status === 401 || err.status === 403) {
          this.authService.logout();
          this.router.navigate(['/login']);
          return;
        }
        this.error = err.error?.message || 'Payment failed. Try again.';
        this.cdr.detectChanges();
      }
    });
  }
}



