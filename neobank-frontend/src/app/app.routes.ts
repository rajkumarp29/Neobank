import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { adminAuthGuard } from './guards/admin-auth-guard';

// Public pages
import { LandingComponent } from './pages/landing/landing';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';

// Dashboard shell & pages
import { DashboardComponent } from './pages/dashboard/dashboard';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home';
import { AccountsComponent } from './pages/accounts/accounts';
import { AccountDetailComponent } from './pages/account-detail/account-detail';
import { ProfileComponent } from './pages/profile/profile';
import { TransactionsComponent } from './pages/transactions/transactions';
import { AdminComponent } from './pages/admin/admin';
import { OpenAccountComponent } from './pages/open-account/open-account';

// Admin Panel shell & pages
import { AdminLayoutComponent } from './pages/admin-layout/admin-layout';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard';

// Budget
import { BudgetCreateComponent } from './pages/budget-create/budget-create';
import { BudgetPageComponent } from './pages/budget-page/budget-page';

// Bills
import { BillsListComponent } from './pages/bills-list/bills-list';
import { BillsCreateComponent } from './pages/bills-create/bills-create';

// Rewards
import { RewardsDashboardComponent } from './pages/rewards/rewards-dashboard/rewards-dashboard';

// Loans
import { LoanProductsComponent } from './pages/admin/loan-products/loan-products';
import { LoanApplyComponent } from './pages/loan-apply/loan-apply';
import { LoanApprovalsComponent } from './pages/admin/loan-approvals/loan-approvals';

export const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: DashboardHomeComponent },
      { path: 'accounts', component: AccountsComponent },
      { path: 'accounts/:accountId', component: AccountDetailComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'open-account', component: OpenAccountComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'transactions/:accountId', component: TransactionsComponent },

      // Legacy admin URLs -> admin shell
      { path: 'admin',           redirectTo: '/admin-panel/dashboard',      pathMatch: 'full' },
      { path: 'user-management', redirectTo: '/admin-panel/users',          pathMatch: 'full' },
      { path: 'admin-health',    redirectTo: '/admin-panel/health',         pathMatch: 'full' },

      { path: 'loan-products', component: LoanProductsComponent },
      { path: 'loan-apply', component: LoanApplyComponent },
      { path: 'loan-approvals', component: LoanApprovalsComponent },
      { path: 'loan-decision/:id',
        loadComponent: () =>
          import('./pages/loan-decision/loan-decision')
            .then(m => m.LoanDecisionComponent)
      },

      { path: 'my-loans',
        loadComponent: () =>
          import('./pages/loans/my-loans/my-loans')
            .then(m => m.MyLoansComponent)
      },
      { path: 'loans/schedule/:id',
        loadComponent: () =>
          import('./pages/loans/repayment-schedule/repayment-schedule')
            .then(m => m.RepaymentScheduleComponent)
      },

      { path: 'budget', component: BudgetPageComponent },
      { path: 'budget-create', component: BudgetCreateComponent },
      { path: 'rewards', component: RewardsDashboardComponent },
      { path: 'bills', component: BillsListComponent },
      { path: 'bills/create', component: BillsCreateComponent },

      { path: 'insights',
        loadComponent: () =>
          import('./pages/insights-dashboard/insights-dashboard')
            .then(m => m.InsightsDashboardComponent)
      }
    ]
  },

  // ADMIN PANEL SHELL
  {
    path: 'admin-panel',
    component: AdminLayoutComponent,
    canActivate: [adminAuthGuard],
    children: [
      { path: '',                redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard',       component: AdminDashboardComponent },
      { path: 'users',           component: AdminComponent },
      { path: 'loan-approvals',  component: LoanApprovalsComponent },
      { path: 'loan-products',   component: LoanProductsComponent },
      { path: 'loan-decision/:id',
        loadComponent: () =>
          import('./pages/loan-decision/loan-decision')
            .then(m => m.LoanDecisionComponent)
      },
      { path: 'health',
        loadComponent: () =>
          import('./pages/admin-health/admin-health')
            .then(m => m.AdminHealthComponent)
      }
    ]
  },

  { path: '**', redirectTo: 'login' }
];