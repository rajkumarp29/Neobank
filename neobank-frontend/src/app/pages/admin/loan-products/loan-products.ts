import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService, LoanProduct } from '../../../services/admin';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loan-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './loan-products.html',
  styleUrls: ['./loan-products.css']
})
export class LoanProductsComponent implements OnInit {

  form!: FormGroup;
  products: LoanProduct[] = [];
  showModal = false;
  isEditMode = false;
  editingProductId: string | null = null;
  formError = '';

  constructor(private fb: FormBuilder, private adminService: AdminService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadProducts();
  }

  initializeForm() {
    this.form = this.fb.group({
      productName: ['', Validators.required],
      loanType: ['', Validators.required],
      description: ['', Validators.required],
      minAmount: ['', [Validators.required, Validators.min(1)]],
      maxAmount: ['', [Validators.required, Validators.min(1)]],
      annualInterestRate: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      processingFee: ['', [Validators.required, Validators.min(0)]],
      minTenure: ['', [Validators.required, Validators.min(1)]],
      maxTenure: ['', [Validators.required, Validators.min(1)]],
      allowedTenures: ['', Validators.required]
    }, { validators: [this.amountValidator, this.tenureValidator] });
  }

  amountValidator(group: FormGroup) {
    const min = group.get('minAmount')?.value;
    const max = group.get('maxAmount')?.value;
    return min && max && max <= min ? { amountError: true } : null;
  }

  tenureValidator(group: FormGroup) {
    const min = group.get('minTenure')?.value;
    const max = group.get('maxTenure')?.value;
    return min && max && max <= min ? { tenureError: true } : null;
  }

  openModal() {
    this.isEditMode = false;
    this.editingProductId = null;
    this.formError = '';
    this.initializeForm();
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.form.reset();
  }

  editProduct(product: LoanProduct) {
    this.isEditMode = true;
    this.editingProductId = product.id ? String(product.id) : null;
    this.initializeForm();

    this.form.patchValue({
      productName: product.productName,
      loanType: product.loanType,
      description: product.description,
      minAmount: product.minAmount,
      maxAmount: product.maxAmount,
      annualInterestRate: product.annualInterestRate,
      processingFee: product.processingFee,
      minTenure: product.minTenure,
      maxTenure: product.maxTenure,
      allowedTenures: product.allowedTenures
    });

    this.showModal = true;
  }

  submitForm() {
    console.log("FORM VALUE:", this.form.value); // ✅ DEBUG

    this.formError = '';

    if (this.form.invalid) {
      this.formError = 'Please fill valid details';
      return;
    }

    if (this.isEditMode && this.editingProductId) {
      this.adminService.updateLoanProduct(this.editingProductId, this.form.value)
        .subscribe({
          next: () => {
            this.closeModal();
            this.loadProducts();
          },
          error: () => this.formError = 'Update failed'
        });
    } else {
      this.adminService.createLoanProduct(this.form.value)
        .subscribe({
          next: () => {
            this.closeModal();
            this.loadProducts();
          },
          error: () => this.formError = 'Create failed'
        });
    }
  }

  deleteProduct(id: any) {
    if (!id) return;
    if (!confirm('Delete this product?')) return;

    this.adminService.deleteLoanProduct(id)
      .subscribe(() => this.loadProducts());
  }

  loadProducts() {
    this.adminService.getLoanProducts().subscribe({
      next: (data) => {
        setTimeout(() => {   // ✅ FIX NG0100
          this.products = data || [];
        });
      }
    });
  }
}
