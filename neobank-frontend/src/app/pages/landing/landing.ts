import { AfterViewInit, Component, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.html',
  styleUrls: ['./landing.css']
})
export class LandingComponent implements AfterViewInit, OnDestroy {

  // ─── Navbar state ──────────────────────────────────────────
  scrolled = false;
  scrollProgress = 0;
  mobileMenuOpen = false;
  activeProductTab = 'accounts';
  activeFaq = -1;
  private statsAnimated = false;
  animatedStats: number[] = [];

  // ─── Real-bank style main navigation ───────────────────────
  navLinks = [
    { label: 'Accounts',    anchor: 'accounts' },
    { label: 'Deposits',    anchor: 'deposits' },
    { label: 'Cards',       anchor: 'cards' },
    { label: 'Loans',       anchor: 'loans' },
    { label: 'Investments', anchor: 'investments' },
    { label: 'Payments',    anchor: 'payments' },
    { label: 'Rewards',     anchor: 'rewards' },
    { label: 'Support',     anchor: 'contact'  }
  ];

  // ─── Scroll handling for sticky navbar effect ──────────────
  @HostListener('window:scroll')
  onScroll(): void {
    const y = window.scrollY || document.documentElement.scrollTop;
    this.scrolled = y > 24;
    const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.scrollProgress = h > 0 ? Math.min(100, (y / h) * 100) : 0;
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            if (entry.target.classList.contains('stats-strip')) {
              this.animateStats();
            }
          }
        });
      },
      { threshold: 0.18 }
    );

    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
    this.animateStats();
  }

  ngOnDestroy(): void {
    this.statsAnimated = false;
  }

  get currentProductTab(): any {
    return this.productTabs.find((tab) => tab.key === this.activeProductTab) || this.productTabs[0];
  }

  selectTab(tabKey: string): void {
    this.activeProductTab = tabKey;
  }

  toggleFaq(index: number): void {
    this.activeFaq = this.activeFaq === index ? -1 : index;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  // ─── Product offerings ─────────────────────────────────────
  products = [
    {
      anchor: 'accounts',
      icon: '🏦',
      tag: 'Most Popular',
      title: 'Savings & Current Accounts',
      desc: 'Choose from salary accounts, family accounts, and premium current accounts built for seamless everyday banking.',
      benefits: ['Zero Balance Required', 'Online Account Opening', 'Instant Debit Card'],
      color: 'indigo',
      link: '/accounts'
    },
    {
      anchor: 'deposits',
      icon: '📈',
      tag: 'Secure Growth',
      title: 'Fixed & Recurring Deposits',
      desc: 'Grow your savings with high-yield deposit options, flexible tenures, and capital protection.',
      benefits: ['Flexible Tenure', 'Guaranteed Returns', 'Auto Renewal'],
      color: 'teal',
      link: '/accounts'
    },
    {
      anchor: 'loans',
      icon: '💰',
      tag: 'Quick Approval',
      title: 'Personal & Business Loans',
      desc: 'Access instant funds with transparent EMI plans, fast approvals, and fully digital documentation.',
      benefits: ['Up to ₹10 Lakh', 'No Hidden Charges', 'Flexible EMI Options'],
      color: 'violet',
      link: '/loans'
    },
    {
      anchor: 'cards',
      icon: '💳',
      tag: 'Cashback',
      title: 'Premium Cards',
      desc: 'Enjoy lounge access, travel benefits, reward points, and secure contactless payments on every spend.',
      benefits: ['5% Cashback Online', 'Airport Lounge Access', 'Zero Forex Fees'],
      color: 'amber',
      link: '/rewards'
    }
  ];

  productTabs = [
    {
      key: 'accounts',
      label: 'Accounts',
      icon: '🏦',
      title: 'Savings & Current Accounts',
      description: 'Earn higher returns on your balance and enjoy instant transfers with zero minimum balance.',
      bullets: ['Zero balance account', 'Real-time insights', 'Instant debit card access']
    },
    {
      key: 'cards',
      label: 'Cards',
      icon: '💳',
      title: 'Premium Rewards Cards',
      description: 'Get premium lounge access, cashback on spends, and strong purchase protection.',
      bullets: ['Travel & lifestyle perks', 'Zero forex markup', 'Spend controls & alerts']
    },
    {
      key: 'loans',
      label: 'Loans',
      icon: '💰',
      title: 'Flexible Borrowing',
      description: 'Apply digitally with transparent rates, flexible EMI plans, and faster disbursement.',
      bullets: ['Quick credit approval', 'Flexible tenure options', 'No hidden charges']
    },
    {
      key: 'wealth',
      label: 'Wealth',
      icon: '📈',
      title: 'Invest & Grow',
      description: 'Build wealth with curated investment options and intelligent financial guidance.',
      bullets: ['Goal-based investing', 'Robo insights', 'Auto reinvest options']
    }
  ];

  steps = [
    { number: '01', title: 'Open in minutes', desc: 'Verify your identity and start banking online without visiting a branch.' },
    { number: '02', title: 'Set your goals', desc: 'Automate savings, track cash flow, and organize spending with smart rules.' },
    { number: '03', title: 'Grow with confidence', desc: 'Get insights, rewards, and personalised financial guidance in real time.' }
  ];

  smartHighlights = [
    'Auto-savings goals',
    'Cashflow insights',
    'Spend alerts',
    'Goal-based rewards'
  ];

  faqs = [
    {
      question: 'How quickly can I open a NeoBank account?',
      answer: 'You can complete your application digitally in under 3 minutes using your Aadhaar-linked mobile number and a quick KYC verification.'
    },
    {
      question: 'Is my money safe with NeoBank?',
      answer: 'Yes. Your deposits are protected under RBI regulations and are covered by DICGC up to the applicable limit, while our platform uses bank-grade encryption and fraud monitoring.'
    },
    {
      question: 'Do you charge fees for transfers or bill payments?',
      answer: 'Most domestic transfers and bill payments are completely free or carry minimal charges, and the exact pricing is always shown before you confirm a transaction.'
    },
    {
      question: 'Can I apply for loans and cards online?',
      answer: 'Absolutely. You can check eligibility, upload documents, and track your application status entirely through the app and website.'
    }
  ];

  // ─── Why-NeoBank features ──────────────────────────────────
  features = [
    { icon: '⚡',  title: 'Instant Account Opening',     desc: 'Go fully digital. Open your account in under 3 minutes with Aadhaar-based eKYC.' },
    { icon: '🔒', title: '256-bit Bank-Grade Security', desc: 'AES-256 encryption, two-factor authentication, and real-time fraud monitoring on every transaction.' },
    { icon: '📊', title: 'Smart Budget Tracker',         desc: 'Auto-categorise every spend. Set monthly limits and receive alerts before you overshoot.' },
    { icon: '⭐', title: 'Earn on Every Rupee',          desc: 'Collect reward points on payments, bill settlements, and loan EMIs. Redeem for cash, vouchers or deals.' },
    { icon: '🧾', title: 'One-tap Bill Pay',             desc: 'Electricity, water, internet, OTT subscriptions — pay all from a single screen with auto-reminders.' },
    { icon: '📱', title: '24 × 7 Support',               desc: 'In-app chat, video banking, and a dedicated helpline. Real humans, not just bots.' }
  ];

  // ─── Top-of-page stat strip ────────────────────────────────
  stats = [
    { value: 2,        decimals: 0, suffix: 'M+',    label: 'Happy Customers',    icon: '👥'  },
    { value: 5000,     decimals: 0, prefix: '₹', suffix: 'Cr+', label: 'Deposits Managed',   icon: '💼'  },
    { value: 99.97,    decimals: 2, suffix: '%',     label: 'Uptime Reliability', icon: '🛡️' },
    { value: 4.8,      decimals: 1, suffix: ' ★',    label: 'App Store Rating',   icon: '📱'  }
  ];

  // ─── Testimonials (matches HTML: initials, color, quote) ───
  testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Freelance Designer, Bengaluru',
      initials: 'PS',
      color: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
      quote: 'Switched from my old bank after years. NeoBank is simply in another league — instant transfers, gorgeous UI, and reward points that actually make sense!'
    },
    {
      name: 'Rajesh Patel',
      role: 'Small Business Owner, Surat',
      initials: 'RP',
      color: 'linear-gradient(135deg,#10b981,#0d9488)',
      quote: 'The Current Account is a game-changer for my business. Unlimited transactions, bulk payments, and the GST-ready reports save me hours every month.'
    },
    {
      name: 'Ananya Krishnan',
      role: 'Software Engineer, Chennai',
      initials: 'AK',
      color: 'linear-gradient(135deg,#f59e0b,#ec4899)',
      quote: 'Got my personal loan approved within 24 hours — no branch visit, no paperwork. The whole process was digital and completely transparent.'
    }
  ];

  // ─── App showcase feature list (matches HTML: icon, title, desc) ─
  appFeatures = [
    { icon: '🏦', title: 'All Accounts in One Place',    desc: 'View savings, current, FD and credit-card balances on a single home screen.' },
    { icon: '📲', title: 'UPI & Instant Transfers',      desc: 'Send money to anyone, anywhere, 24×7 — zero fees, zero waiting.' },
    { icon: '🔔', title: 'Smart Spend Alerts',           desc: 'Get real-time notifications and weekly summaries that actually help you save.' },
    { icon: '🔒', title: 'Biometric Login & Fraud Watch', desc: 'Face ID / fingerprint unlock and 24×7 AI-powered fraud monitoring.' }
  ];

  animateStats(): void {
    if (this.statsAnimated) {
      return;
    }

    this.statsAnimated = true;
    this.animatedStats = this.stats.map(() => 0);

    this.stats.forEach((stat, index) => {
      const duration = 1400;
      const start = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = stat.value * eased;
        this.animatedStats[index] = stat.decimals ? Number(current.toFixed(stat.decimals)) : Math.round(current);

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          this.animatedStats[index] = stat.value;
        }
      };

      requestAnimationFrame(tick);
    });
  }

  formatStatValue(stat: any, index: number): string {
    const value = this.animatedStats[index] ?? stat.value;
    const formatted = stat.decimals !== undefined
      ? value.toFixed(stat.decimals)
      : value.toLocaleString('en-IN');

    return `${stat.prefix || ''}${formatted}${stat.suffix || ''}`;
  }
}
