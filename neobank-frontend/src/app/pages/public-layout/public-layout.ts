import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './public-layout.html',
  styleUrls: ['./public-layout.css']
})
export class PublicLayoutComponent {

  navLinks = [
    { label: 'Accounts', path: '/accounts' },
    { label: 'Loans',    path: '/loans'    },
    { label: 'Rewards',  path: '/rewards'  },
    { label: 'About Us', path: '/about'    },
  ];

  footerProducts = [
    { label: 'Savings Account',  path: '/accounts' },
    { label: 'Current Account',  path: '/accounts' },
    { label: 'Personal Loans',   path: '/loans'    },
    { label: 'NeoBank Card',     path: '/register' },
    { label: 'Bill Payments',    path: '/register' },
    { label: 'Rewards Program',  path: '/rewards'  },
  ];

  footerCompany = [
    'About Us', 'Careers', 'Press Room',
    'Investor Relations', 'Blog', 'Contact Us'
  ];

  footerLegal = [
    'Privacy Policy', 'Terms of Service', 'Security Centre',
    'Grievance Redressal', 'Fair Practices Code', 'RBI Disclosures'
  ];

  currentYear = new Date().getFullYear();
}
