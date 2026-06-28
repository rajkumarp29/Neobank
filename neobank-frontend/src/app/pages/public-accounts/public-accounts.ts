import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-public-accounts',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './public-accounts.html',
  styleUrls: ['./public-accounts.css']
})
export class PublicAccountsComponent {

  accountTypes = [
    {
      icon: '🏦', color: 'indigo', badge: 'Most Popular',
      title: 'Savings Account',
      desc: 'Earn the highest interest on your idle money with zero minimum balance and instant debit card issuance.',
      rate: '7% p.a.',
      features: ['Zero Balance Required', 'Free Virtual + Physical Debit Card', 'Up to ₹5 Lakh DICGC Insurance',
                 'Auto-sweep FD for idle balance', 'Real-time transaction alerts', 'Instant UPI setup']
    },
    {
      icon: '🏢', color: 'teal', badge: 'Business',
      title: 'Current Account',
      desc: 'Purpose-built for businesses with unlimited transactions, bulk payments, and dedicated relationship managers.',
      rate: '4% p.a.',
      features: ['Unlimited Free Transactions', 'Multi-user Access (up to 5)', 'GST-ready Statements',
                 'Bulk Salary Disbursement', 'Business Insights Dashboard', 'Priority Customer Support']
    },
    {
      icon: '📈', color: 'green', badge: 'Best Returns',
      title: 'Fixed Deposit',
      desc: 'Lock in guaranteed returns for any tenure from 7 days to 10 years with auto-renewal and premature withdrawal options.',
      rate: '8.5% p.a.',
      features: ['Tenure: 7 days – 10 years', 'Premature Withdrawal Available', 'Auto-renewal Option',
                 'Loan Against FD (up to 90%)', 'Senior Citizen Extra 0.5%', 'Digital FD Certificate']
    },
    {
      icon: '🌏', color: 'amber', badge: 'NRI Banking',
      title: 'NRE / NRO Account',
      desc: 'Specially designed for Non-Resident Indians to manage foreign earnings and Indian income seamlessly.',
      rate: '6.5% p.a.',
      features: ['Full Repatriation (NRE)', 'Tax-free Interest (NRE)', 'Joint Account with Resident',
                 'Free International Transfers', 'Dedicated NRI Relationship Manager', 'Multi-currency Support']
    },
  ];

  steps = [
    { num: '01', icon: '📱', title: 'Download App or Visit Website', desc: 'Get started in seconds from any device — no branch visit required.' },
    { num: '02', icon: '🪪', title: 'Complete eKYC with Aadhaar', desc: 'Verify your identity digitally in under 2 minutes using Aadhaar OTP.' },
    { num: '03', icon: '✅', title: 'Account Activated Instantly', desc: 'Your account number, IFSC, and debit card are ready to use immediately.' },
  ];

  benefits = [
    { icon: '⚡', title: '3-Minute Account Opening', desc: 'Fully digital onboarding — no queues, no paperwork, no branch visits.' },
    { icon: '🔒', title: 'Bank-Grade Security', desc: 'AES-256 encryption with biometric authentication and 24/7 fraud monitoring.' },
    { icon: '📊', title: 'Smart Spend Analytics', desc: 'Auto-categorise transactions and track spending patterns with visual reports.' },
    { icon: '🎁', title: 'Earn Rewards on Every Transaction', desc: 'Get NeoPoints on UPI, card payments, and bill settlements — redeem anytime.' },
    { icon: '🧾', title: 'One-tap Bill Payments', desc: 'Pay electricity, water, gas, OTT and more from a single screen.' },
    { icon: '📞', title: '24 × 7 Human Support', desc: 'Reach real banking experts via chat, video call, or phone — always.' },
  ];

  rates = [
    { label: 'Savings Account',  rate: 'Up to 7.0% p.a.', note: 'On balance above ₹1 Lakh' },
    { label: 'Current Account',  rate: 'Up to 4.0% p.a.', note: 'On average monthly balance' },
    { label: 'Fixed Deposit (1Y)', rate: 'Up to 8.0% p.a.', note: '8.5% for senior citizens' },
    { label: 'Fixed Deposit (3Y)', rate: 'Up to 8.5% p.a.', note: '9.0% for senior citizens' },
    { label: 'Recurring Deposit', rate: 'Up to 7.5% p.a.', note: 'Min ₹500/month' },
    { label: 'NRE FD',           rate: 'Up to 7.25% p.a.', note: 'Tax-free & fully repatriable' },
  ];
}
