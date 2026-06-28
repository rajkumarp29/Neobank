import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-public-loans',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './public-loans.html',
  styleUrls: ['./public-loans.css']
})
export class PublicLoansComponent {

  loanTypes = [
    {
      icon: '👤', color: 'violet', badge: 'Most Popular',
      title: 'Personal Loan',
      amount: 'Up to ₹10 Lakh',
      rate: '10.5% p.a.',
      tenure: '12–60 months',
      desc: 'Instant funds for any personal need — travel, medical, wedding or education. No collateral required.',
      features: ['Approval in 24 hours', 'No Collateral Required', 'Zero Pre-closure Charges', 'Flexible EMI Options', 'Completely Paperless', 'Direct Bank Transfer']
    },
    {
      icon: '🏠', color: 'indigo', badge: 'Lowest Rate',
      title: 'Home Loan',
      amount: 'Up to ₹2 Crore',
      rate: '8.35% p.a.',
      tenure: 'Up to 30 years',
      desc: 'Make your dream home a reality with the lowest rates, transparent processing, and door-step service.',
      features: ['Longest Repayment Tenure', 'Tax Benefit Under 80C & 24(b)', 'Free Legal Opinion', 'Doorstep Service', 'Balance Transfer Available', 'Top-up Loan Option']
    },
    {
      icon: '🏭', color: 'teal', badge: 'Business',
      title: 'Business Loan',
      amount: 'Up to ₹50 Lakh',
      rate: '12% p.a.',
      tenure: '6–60 months',
      desc: 'Scale your business with fast working capital. Minimal documentation, collateral-free up to ₹25 Lakh.',
      features: ['Collateral-free up to ₹25L', 'Working Capital & Term Loans', 'Overdraft Facility', 'GST-based Assessment', 'Dedicated Business RM', 'Quick Disbursal']
    },
    {
      icon: '🎓', color: 'amber', badge: 'Education',
      title: 'Education Loan',
      amount: 'Up to ₹40 Lakh',
      rate: '9.5% p.a.',
      tenure: 'Up to 15 years',
      desc: 'Invest in your future with comprehensive education financing — India and abroad — covering all expenses.',
      features: ['Covers Tuition & Living Costs', 'Moratorium During Study', 'Tax Benefit Under 80E', 'No Collateral up to ₹7.5L', 'Abroad Education Covered', 'Visa Assistance']
    },
    {
      icon: '🪙', color: 'yellow', badge: 'Quick Cash',
      title: 'Gold Loan',
      amount: 'Up to ₹75 Lakh',
      rate: '9% p.a.',
      tenure: '3–24 months',
      desc: 'Unlock the value of your gold jewellery instantly. Highest loan-to-value ratio with safe storage.',
      features: ['90% Loan-to-Value Ratio', 'Disbursal in 30 Minutes', 'No EMI Option Available', 'Safe Vault Storage', 'Part-release of Gold', 'Bullet Repayment Option']
    },
    {
      icon: '🚗', color: 'rose', badge: 'Auto Loan',
      title: 'Auto Loan',
      amount: 'Up to ₹1 Crore',
      rate: '7.5% p.a.',
      tenure: '12–84 months',
      desc: 'Drive your dream vehicle home today. New and used cars, two-wheelers, and commercial vehicles.',
      features: ['100% On-road Funding', 'New & Used Vehicles', '7-day Approval', 'No Prepayment Penalty', 'Insurance Bundling Available', 'Fast RC Transfer Support']
    },
  ];

  eligibility = [
    { icon: '👔', label: 'Employment', desc: 'Salaried (min ₹15,000/month) or self-employed with 2+ years in business' },
    { icon: '🎂', label: 'Age',        desc: '21 to 65 years at the time of loan maturity' },
    { icon: '📊', label: 'CIBIL Score', desc: 'Minimum credit score of 700 for best rates; 650 considered' },
    { icon: '📍', label: 'Residency',  desc: 'Indian Resident or NRI with valid NRE/NRO account' },
  ];

  steps = [
    { num: '01', icon: '📝', title: 'Apply Online',      desc: 'Fill in the simple application form in under 5 minutes from our app or website.' },
    { num: '02', icon: '📄', title: 'Upload Documents',  desc: 'PAN, Aadhaar, salary slips, and bank statement — fully digital, zero visits.' },
    { num: '03', icon: '✅', title: 'Instant Decision',  desc: 'AI-powered credit assessment gives you a decision in minutes.' },
    { num: '04', icon: '💸', title: 'Money in Account',  desc: 'Approved amount transferred directly to your bank account within 24 hours.' },
  ];

  emiExamples = [
    { amount: '₹1 Lakh',  tenure: '12 months', rate: '10.5%', emi: '₹8,812' },
    { amount: '₹3 Lakh',  tenure: '24 months', rate: '10.5%', emi: '₹13,923' },
    { amount: '₹5 Lakh',  tenure: '36 months', rate: '10.5%', emi: '₹16,218' },
    { amount: '₹10 Lakh', tenure: '60 months', rate: '10.5%', emi: '₹21,494' },
  ];
}
