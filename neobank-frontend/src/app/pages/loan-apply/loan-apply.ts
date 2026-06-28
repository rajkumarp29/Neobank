import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService, LoanProduct } from '../../services/admin';

@Component({
  selector: 'app-loan-apply',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './loan-apply.html',
  styleUrls: ['./loan-apply.css']
})
export class LoanApplyComponent implements OnInit {

  products: LoanProduct[] = [];
  selectedProduct: LoanProduct | null = null;

  form!: FormGroup;

  currentStep = 1;

  // ✅ Terms checkbox
  acceptTerms = false;

  
  // ✅ FIXED (NEW)
  monthlyIncome: number = 0;
  employerName: string = '';
  designation: string = '';


  // ✅ EMI values
  emiAmount = 0;
  totalInterest = 0;
  totalAmount = 0;

  constructor(private fb: FormBuilder, private service: AdminService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      loanProductId: ['', Validators.required],
      requestedAmount: ['', Validators.required],
      requestedTenureMonths: ['', Validators.required]
    });

    this.loadProducts();
  }

  loadProducts() {
    this.service.getLoanProducts().subscribe((res: any) => {
      this.products = res;
    });
  }

  selectProduct(product: LoanProduct) {
    this.selectedProduct = product;
    this.form.patchValue({ loanProductId: product.id });
  }

  goToStep(step: number) {
    this.currentStep = step;
  }

  getTenureOptions() {
    if (!this.selectedProduct) return [];

    return this.selectedProduct.allowedTenures
      .split(',')
      .map((t: string) => parseInt(t.trim(), 10));
  }

  // ✅ FIXED EMI Calculation
  calculateEmi() {
    const amount = this.form.value.requestedAmount;
    const tenure = this.form.value.requestedTenureMonths;
    const rate = this.selectedProduct?.annualInterestRate || 0;

    if (!amount || !tenure) {
      this.emiAmount = 0;
      return;
    }

    const monthlyRate = rate / 12 / 100;

    const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
                (Math.pow(1 + monthlyRate, tenure) - 1);

    this.emiAmount = emi;
    this.totalAmount = emi * tenure;
    this.totalInterest = this.totalAmount - amount;
  }

  // ✅ FINAL FIXED SUBMIT
  applyLoan() {

    if (!this.acceptTerms) {
      alert('Please accept terms');
      return;
    }

    if (this.form.invalid) {
      alert('Please fill all details');
      return;
    }

    this.service.applyLoan(this.form.value).subscribe({
      next: (res) => {
        console.log("SUCCESS:", res);
        alert('✅ Loan Applied Successfully');

        this.currentStep = 1;
        this.form.reset();
        this.selectedProduct = null;
        this.acceptTerms = false;
        this.emiAmount = 0;
      },
      error: (err) => {
        console.error("ERROR:", err);
        alert('❌ Submission failed');
      }
    });
  }
}
