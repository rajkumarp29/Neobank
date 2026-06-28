import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-public-rewards',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './public-rewards.html',
  styleUrls: ['./public-rewards.css']
})
export class PublicRewardsComponent {

  earnWays = [
    { icon: '💳', color: 'indigo', title: 'Card Spends',
      points: '4× points',
      desc: 'Earn 4 NeoPoints on every ₹100 spent via NeoBank Debit or Credit Card — online and offline.' },
    { icon: '📲', color: 'teal', title: 'UPI Transactions',
      points: '2× points',
      desc: 'Get 2 NeoPoints on every ₹100 paid via UPI to merchants — including QR scans.' },
    { icon: '🧾', color: 'amber', title: 'Bill Payments',
      points: '3× points',
      desc: 'Triple points on every electricity, water, mobile, gas, OTT and broadband bill paid through the app.' },
    { icon: '🏦', color: 'violet', title: 'EMI & Loan Payments',
      points: '5× points',
      desc: 'Earn 5× NeoPoints every time you pay a loan EMI or credit-card bill on time.' },
    { icon: '👥', color: 'rose', title: 'Refer Friends',
      points: '1,000 pts',
      desc: 'Refer a friend who opens an account — you both get 1,000 NeoPoints as a welcome bonus.' },
    { icon: '🎯', color: 'green', title: 'Daily Streak Bonus',
      points: '50 pts/day',
      desc: 'Open the app and complete one transaction daily to keep your streak alive and earn extra points.' },
  ];

  redeemOptions = [
    { icon: '💵', title: 'Cashback to Account',     value: '1 pt = ₹0.25', desc: 'Direct credit to your NeoBank account — instant settlement, no questions asked.' },
    { icon: '🛍️', title: 'Shopping Vouchers',        value: '1 pt = ₹0.35', desc: 'Amazon, Flipkart, Myntra, Swiggy, Zomato — 200+ brands available.' },
    { icon: '✈️', title: 'Flight & Hotel Bookings', value: '1 pt = ₹0.50', desc: 'Get the highest value when you redeem for travel — domestic and international.' },
    { icon: '⛽', title: 'Fuel Surcharge Waiver',    value: '500 pts',       desc: 'Waive off fuel surcharge at any pump nationwide — applied automatically.' },
    { icon: '🎁', title: 'Charity Donations',        value: '1 pt = ₹0.30', desc: 'Donate points to verified NGOs — get 80G tax exemption certificate.' },
    { icon: '📺', title: 'Subscription Plans',        value: '1 pt = ₹0.40', desc: 'Redeem for Netflix, Spotify, Disney+ Hotstar and 50+ other subscriptions.' },
  ];

  tiers = [
    { name: 'Silver',   color: 'silver',   minSpend: '₹0 – ₹50K/year',     perks: ['1× base earn rate', 'Welcome bonus 500 pts', 'Birthday surprise gift'] },
    { name: 'Gold',     color: 'gold',     minSpend: '₹50K – ₹2 Lakh/year', perks: ['1.5× earn rate', 'Free airport lounge (4/yr)', 'Priority customer support'] },
    { name: 'Platinum', color: 'platinum', minSpend: '₹2 – ₹10 Lakh/year', perks: ['2× earn rate', 'Unlimited lounge access', 'Free golf rounds (12/yr)', 'Concierge service'] },
    { name: 'Diamond',  color: 'diamond',  minSpend: '₹10 Lakh+/year',     perks: ['3× earn rate', 'Dedicated RM 24/7', 'Free travel insurance', 'Invitation-only events'] },
  ];

  partners = [
    { name: 'Amazon',   icon: '🛒', cashback: 'Up to 10%' },
    { name: 'Flipkart', icon: '🛍️', cashback: 'Up to 8%'  },
    { name: 'Myntra',   icon: '👗', cashback: 'Up to 12%' },
    { name: 'Swiggy',   icon: '🍔', cashback: 'Up to 15%' },
    { name: 'Zomato',   icon: '🍕', cashback: 'Up to 15%' },
    { name: 'BookMyShow', icon: '🎬', cashback: 'Up to 20%' },
    { name: 'MakeMyTrip', icon: '✈️', cashback: 'Up to 6%'  },
    { name: 'Uber',     icon: '🚗', cashback: 'Up to 10%' },
  ];

  faqs = [
    { q: 'When do my reward points expire?',
      a: 'NeoPoints are valid for 36 months from the date of earning. Reach Platinum tier or above and your points never expire.' },
    { q: 'Is there a minimum redemption value?',
      a: 'You can redeem starting from just 100 points (~₹25). No minimum threshold for cashback to account.' },
    { q: 'How quickly are points credited?',
      a: 'NeoPoints are credited instantly for UPI and card transactions, and within 2 business days for bill payments and EMIs.' },
    { q: 'Can I transfer points to another NeoBank user?',
      a: 'Yes! Platinum and Diamond tier members can transfer up to 5,000 points/month to any other NeoBank user.' },
  ];
}
