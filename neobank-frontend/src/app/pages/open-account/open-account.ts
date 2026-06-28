import { Component, ChangeDetectorRef, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account';

@Component({
  selector: 'app-open-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './open-account.html',
  styleUrls: ['./open-account.css']
})
export class OpenAccountComponent implements AfterViewChecked {

  @ViewChild('sigCanvas') sigCanvas!: ElementRef<HTMLCanvasElement>;

  // ── Stepper ──────────────────────────────────────────
  currentStep = 1;
  submitted   = false;
  creating    = false;

  steps = [
    { label: 'PERSONAL INFO' }, { label: 'CONTACT' },
    { label: 'OCCUPATION' },    { label: 'GOVT ID' },
    { label: 'PREFERENCES' },   { label: 'NOMINEE' },
    { label: 'REVIEW' }
  ];

  get progress(): number { return Math.round(((this.currentStep - 1) / 7) * 100); }
  nextStep(): void { if (this.currentStep < 7) { this.currentStep++; this.sigCtx = null; } }
  prevStep(): void { if (this.currentStep > 1) { this.currentStep--; this.sigCtx = null; } }
  goToStep(n: number): void { if (n >= 1 && n <= 7) { this.currentStep = n; this.sigCtx = null; } }

  // ── Signature ────────────────────────────────────────
  signatureDrawn = false;
  private sigDrawing = false;
  private sigCtx: CanvasRenderingContext2D | null = null;
  private sigInitialized = false;

  ngAfterViewChecked(): void {
    if (this.currentStep === 7 && this.sigCanvas?.nativeElement && !this.sigInitialized) {
      this.initSigCanvas();
    }
    if (this.currentStep !== 7) { this.sigInitialized = false; }
  }

  private initSigCanvas(): void {
    const canvas = this.sigCanvas.nativeElement;
    if (!canvas.offsetWidth) return;
    canvas.width  = canvas.offsetWidth;
    canvas.height = 160;
    this.sigCtx = canvas.getContext('2d');
    if (this.sigCtx) {
      this.sigCtx.strokeStyle = '#a5b4fc';
      this.sigCtx.lineWidth   = 2.5;
      this.sigCtx.lineCap     = 'round';
      this.sigCtx.lineJoin    = 'round';
    }
    this.sigInitialized = true;
  }

  startDraw(e: MouseEvent): void {
    if (!this.sigCtx) this.initSigCanvas();
    if (!this.sigCtx) return;
    this.sigDrawing = true;
    const r = this.sigCanvas.nativeElement.getBoundingClientRect();
    this.sigCtx.beginPath();
    this.sigCtx.moveTo(e.clientX - r.left, e.clientY - r.top);
  }

  draw(e: MouseEvent): void {
    if (!this.sigDrawing || !this.sigCtx) return;
    const r = this.sigCanvas.nativeElement.getBoundingClientRect();
    this.sigCtx.lineTo(e.clientX - r.left, e.clientY - r.top);
    this.sigCtx.stroke();
    this.signatureDrawn = true;
  }

  stopDraw(): void { this.sigDrawing = false; }

  startDrawTouch(e: TouchEvent): void {
    e.preventDefault();
    if (!this.sigCtx) this.initSigCanvas();
    if (!this.sigCtx) return;
    this.sigDrawing = true;
    const r = this.sigCanvas.nativeElement.getBoundingClientRect();
    const t = e.touches[0];
    this.sigCtx.beginPath();
    this.sigCtx.moveTo(t.clientX - r.left, t.clientY - r.top);
  }

  drawTouch(e: TouchEvent): void {
    e.preventDefault();
    if (!this.sigDrawing || !this.sigCtx) return;
    const r = this.sigCanvas.nativeElement.getBoundingClientRect();
    const t = e.touches[0];
    this.sigCtx.lineTo(t.clientX - r.left, t.clientY - r.top);
    this.sigCtx.stroke();
    this.signatureDrawn = true;
  }

  clearSignature(): void {
    if (!this.sigCanvas?.nativeElement) return;
    const canvas = this.sigCanvas.nativeElement;
    if (this.sigCtx) this.sigCtx.clearRect(0, 0, canvas.width, canvas.height);
    this.signatureDrawn = false;
    this.sigCtx = null;
    this.sigInitialized = false;
  }

  // ── Step 1 — Personal Info ───────────────────────────
  p = {
    firstName: '', middleName: '', lastName: '',
    dob: '', nationality: 'Indian', gender: '', maritalStatus: '',
    fatherName: '', motherName: ''
  };
  nationalities: string[] = ['Indian','American','British','Canadian','Australian','German','French','Singaporean','Other'];

  // ── Step 2 — Contact & Address ───────────────────────
  c = {
    mobile: '', altPhone: '', email: '',
    curLine1: '', curLine2: '', curCity: '', curState: '', curPin: '',
    perLine1: '', perLine2: '', perCity: '', perState: '', perPin: '',
    sameAsCurrent: false
  };
  syncPermanent(): void {
    if (this.c.sameAsCurrent) {
      this.c.perLine1 = this.c.curLine1; this.c.perLine2 = this.c.curLine2;
      this.c.perCity  = this.c.curCity;  this.c.perState = this.c.curState;
      this.c.perPin   = this.c.curPin;
    }
  }
  states: string[] = [
    'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana',
    'Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur',
    'Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana',
    'Tripura','Uttar Pradesh','Uttarakhand','West Bengal',
    'Andaman & Nicobar Islands','Chandigarh','Dadra & Nagar Haveli and Daman & Diu',
    'Delhi (NCT)','Jammu & Kashmir','Ladakh','Lakshadweep','Puducherry'
  ];

  // ── Step 3 — Occupation ──────────────────────────────
  o = { employmentType: '', companyName: '', designation: '', annualIncome: '', industry: '' };
  empTypes:  string[] = ['SALARIED','SELF_EMPLOYED','BUSINESS','STUDENT','RETIRED','HOMEMAKER','OTHER'];
  empIcons:  { [k: string]: string } = {
    SALARIED: '💼', SELF_EMPLOYED: '🧑‍💻', BUSINESS: '🏪',
    STUDENT: '🎓', RETIRED: '👴', HOMEMAKER: '🏠', OTHER: '👤'
  };
  industries: string[] = ['IT / Technology','Banking & Finance','Healthcare','Education',
    'Manufacturing','Retail / E-Commerce','Government','Real Estate','Hospitality','Agriculture','Other'];
  incomeBrackets: string[] = ['Below ₹2.5 LPA','₹2.5–5 LPA','₹5–10 LPA','₹10–20 LPA','₹20–50 LPA','Above ₹50 LPA'];
  get showCompany(): boolean { return ['SALARIED','SELF_EMPLOYED','BUSINESS'].includes(this.o.employmentType); }

  // ── Step 4 — Govt ID ────────────────────────────────
  idTypes: { key: string; lbl: string; icon: string }[] = [
    { key: 'AADHAAR',  lbl: 'Aadhaar Card',   icon: '🪪' },
    { key: 'PAN',      lbl: 'PAN Card',        icon: '💳' },
    { key: 'PASSPORT', lbl: 'Passport',        icon: '📘' },
    { key: 'VOTER_ID', lbl: 'Voter ID',        icon: '🗳️' },
    { key: 'DL',       lbl: 'Driving Licence', icon: '🚗' }
  ];
  g = { idType: '', idNumber: '', issueDate: '', expiryDate: '', idFile: null as File | null, frontPreview: '' as string | null, frontName: '' };
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      this.g.idFile = file; this.g.frontName = file.name;
      const reader = new FileReader();
      reader.onload = (e) => { this.g.frontPreview = e.target?.result as string; };
      reader.readAsDataURL(file);
    }
  }

  // ── Step 5 — Preferences ────────────────────────────
  accountOptions: { key: string; lbl: string; desc: string; icon: string }[] = [
    { key: 'SAVINGS', lbl: 'Savings Account', desc: 'Best for personal savings & daily use',    icon: '🏦' },
    { key: 'CURRENT', lbl: 'Current Account', desc: 'Ideal for businesses & high transactions',  icon: '💼' }
  ];
  ap = { accountType: 'SAVINGS', debitCard: true, netBanking: true, chequeBook: false, mobileBanking: true, statement: 'EMAIL', branch: '' };

  // ── Step 6 — Nominee ────────────────────────────────
  nominees: { fullName: string; relationship: string; dob: string; share: number; mobile: string; guardianName: string; guardianRel: string }[] = [
    { fullName: '', relationship: '', dob: '', share: 100, mobile: '', guardianName: '', guardianRel: '' }
  ];
  addNominee(): void {
    if (this.nominees.length < 3)
      this.nominees.push({ fullName: '', relationship: '', dob: '', share: 0, mobile: '', guardianName: '', guardianRel: '' });
  }
  removeNominee(i: number): void { if (this.nominees.length > 1) this.nominees.splice(i, 1); }
  getNomineeAge(dob: string): number {
    if (!dob) return 0;
    const today = new Date(), b = new Date(dob);
    let age = today.getFullYear() - b.getFullYear();
    if (today < new Date(today.getFullYear(), b.getMonth(), b.getDate())) age--;
    return age;
  }

  // ── Step 7 — Review / Declaration ───────────────────
  declaration = { terms: false, confirm: false, fullName: '' };

  submitApplication(): void {
    this.creating = true;
    this.accountService.createAccount(this.ap.accountType as 'SAVINGS' | 'CURRENT').subscribe({
      next: () => { this.creating = false; this.submitted = true; setTimeout(() => this.router.navigate(['/dashboard/accounts']), 2200); },
      error: () => { this.creating = false; alert('Failed to submit. Please try again.'); }
    });
  }

  constructor(private accountService: AccountService, private router: Router, private cdr: ChangeDetectorRef) {}
}

