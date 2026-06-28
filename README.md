<div align="center">

<img src="https://img.shields.io/badge/NeoBank_360-Unified_Banking_Platform-1D9E75?style=for-the-badge&logoColor=white" alt="NeoBank 360" height="36"/>

<br/><br/>

<img src="https://img.shields.io/badge/Spring_Boot-4.0-6DB33F?style=flat-square&logo=springboot&logoColor=white"/>
<img src="https://img.shields.io/badge/Java-17-ED8B00?style=flat-square&logo=openjdk&logoColor=white"/>
<img src="https://img.shields.io/badge/Angular-21-DD0031?style=flat-square&logo=angular&logoColor=white"/>
<img src="https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql&logoColor=white"/>
<img src="https://img.shields.io/badge/JWT-Secured-000000?style=flat-square&logo=jsonwebtokens&logoColor=white"/>
<img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker&logoColor=white"/>

<br/><br/>

> **A financial-grade, full-stack NeoBank platform** — consolidating accounts, budgets, bills, loans, and analytics into a single secure experience.
>
> Built independently as part of the **Infosys PMIS Internship Program**, Bhubaneswar DC · Lab 5 · June 2026

<br/>

[Features](#-features) · [Architecture](#-architecture) · [API Reference](#-api-reference) · [Getting Started](#-getting-started) · [Author](#-author)

</div>

---

## 📌 The Problem This Solves

| Pain Point | What NeoBank 360 Does |
|---|---|
| 🔀 Fragmented apps for accounts, budgets, bills, loans | One unified platform for every banking journey |
| 📊 No real-time spending visibility | Live category-wise budget tracking vs. actual spend |
| 📝 Paper-heavy, slow loan workflows | Fully digital: apply → review → approve → EMI repayment |
| 👁️ Weak admin oversight | Unified dashboard — users, loans, system health, audit logs |

---

## ✨ Features

### 👤 User Portal

| Module | What you can do |
|---|---|
| **Auth & RBAC** | JWT-based registration & login · BCrypt password hashing · Role-based route guards |
| **Accounts** | Open savings/current accounts · view balances · credit & debit operations |
| **Transactions** | Full ledger per account · categorized transaction history |
| **Budgets** | Create monthly category budgets · track spending vs. limit in real time |
| **Bills** | Create, list & pay bills · lifecycle status: `PENDING → PAID` |
| **Loans** | Browse products · submit application · view EMI schedule · make repayments |
| **Rewards** | Earn and view reward points per transaction |
| **Insights** | Category spend breakdown · monthly trends · financial analytics (Chart.js) |

### 🔐 Admin Panel

| Module | What you can do |
|---|---|
| **Admin Dashboard** | Platform-wide KPIs · pending approvals queue · at-a-glance metrics |
| **User Management** | List all users · view activity logs · toggle account status |
| **Loan Approvals** | Review pending applications · approve or reject with full audit trail |
| **Loan Products** | Create & manage the loan product catalogue |
| **System Health** | Real-time backend health metrics |

---

## 🏗️ Architecture

NeoBank 360 is built on a strict **N-Tier architecture** for independent scaling, security isolation, and long-term maintainability.

```
┌─────────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                          │
│          Angular 21 SPA — Standalone Components                 │
│          Route Guards  ·  JWT Interceptors  ·  Chart.js         │
└──────────────────────────────┬──────────────────────────────────┘
                               │  HTTP / JSON
┌──────────────────────────────▼──────────────────────────────────┐
│                      API / GATEWAY LAYER                         │
│          REST Controllers — 34+ endpoints                       │
│          JWT Auth Filter  ·  CORS Policy  ·  Spring Security    │
└──────────────────────────────┬──────────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────────┐
│                    BUSINESS LOGIC LAYER                          │
│          Service Classes                                        │
│          EMI Engine  ·  Budget Rules  ·  Audit  ·  Insights     │
└──────────────────────────────┬──────────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────────┐
│                     DATA ACCESS LAYER                            │
│          Spring Data JPA — Repository Interfaces                │
│          Hibernate ORM                                          │
└──────────────────────────────┬──────────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────────┐
│                     PERSISTENCE LAYER                            │
│          MySQL 8 · 12 Relational Entities · FK Integrity        │
└─────────────────────────────────────────────────────────────────┘
```

**Request flow:** `Angular Client` → `REST API (JWT-secured)` → `Service Layer` → `JPA Repositories` → `MySQL` — and back.

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|---|---|---|
| **Frontend** | Angular (standalone components) + Chart.js | 21 |
| **Backend** | Spring Boot + Java | Boot 4 · Java 17 |
| **Database** | MySQL + JPA / Hibernate ORM | 8.0 |
| **Security** | Spring Security + Stateless JWT + BCrypt | — |
| **Build** | Maven (backend) · Angular CLI / npm (frontend) | — |
| **Containers** | Docker | — |
| **API Style** | RESTful JSON — 34+ endpoints | — |

---

## 📁 Project Structure

```
NeoBank/
├── neobank-backend/                          # Spring Boot application
│   ├── pom.xml
│   └── src/main/java/com/infy/neobank/
│       ├── config/
│       │   ├── CorsConfig.java
│       │   └── SecurityConfig.java
│       ├── controller/                       # 15 REST controllers
│       │   ├── AuthController.java
│       │   ├── AccountController.java
│       │   ├── TransactionController.java
│       │   ├── BudgetController.java
│       │   ├── BillController.java
│       │   ├── RewardController.java
│       │   ├── InsightsController.java
│       │   ├── LoanProductController.java
│       │   ├── LoanApplicationController.java
│       │   ├── LoanApprovalController.java
│       │   ├── LoanAccountController.java
│       │   ├── LoanRepaymentController.java
│       │   ├── UserController.java
│       │   ├── AdminController.java
│       │   └── AdminDashboardController.java
│       ├── service/                          # Business logic layer
│       ├── repository/                       # Spring Data JPA interfaces
│       ├── entity/                           # 12 JPA entities / DB tables
│       ├── dto/                              # Request & response DTOs
│       ├── security/                         # JWT filter, user details service
│       └── exception/                        # Global exception handler
│
└── neobank-frontend/                         # Angular 21 SPA
    ├── package.json
    └── src/app/
        ├── pages/
        │   ├── landing/                      # Public landing page
        │   ├── login/ & register/            # Auth pages
        │   ├── dashboard/                    # User shell layout
        │   ├── dashboard-home/               # Summary home
        │   ├── accounts/ & account-detail/   # Account management
        │   ├── transactions/                 # Transaction ledger
        │   ├── budget-page/ & budget-create/
        │   ├── bills-list/ & bills-create/
        │   ├── rewards/                      # Rewards dashboard
        │   ├── loan-apply/ & my-loans/       # Loan user flow
        │   ├── insights-dashboard/           # Analytics & charts
        │   ├── admin-layout/                 # Admin shell
        │   ├── admin-dashboard/              # Admin KPIs
        │   ├── admin/ & admin-health/
        │   └── loan-approvals/ & loan-products/
        ├── services/                         # HTTP service layer
        ├── guards/                           # authGuard · adminAuthGuard
        ├── interceptors/                     # JWT interceptor
        └── models/                           # TypeScript interfaces
```

---

## 🗄️ Database Schema

12 relational entities with foreign-key integrity enforced at the database level.

| Entity | Description |
|---|---|
| `User` | Platform users with roles — `USER` or `ADMIN` |
| `Account` | Bank accounts per user — `SAVINGS` or `CURRENT` |
| `Transaction` | Debit / credit records linked to an account |
| `Budget` | Monthly category budgets per user |
| `Bill` | Bill records — lifecycle `PENDING → PAID` |
| `Reward` | Reward points earned per transaction |
| `LoanProduct` | Admin-defined loan product catalogue |
| `LoanApplication` | User loan applications with approval status |
| `LoanAccount` | Active loan accounts created post-approval |
| `LoanRepayment` | EMI schedule entries per loan account |
| `AuditLog` | Admin action audit trail |
| `LoginEvent` | User login history |

---

## 🔌 API Reference

> All protected endpoints require an `Authorization: Bearer <token>` header.

### Authentication — `/api/auth`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | 🌐 Public |
| `POST` | `/api/auth/login` | Login and receive JWT | 🌐 Public |

### Accounts — `/api/accounts`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/accounts` | Open a new bank account | 🔒 User |
| `GET` | `/api/accounts` | List the authenticated user's accounts | 🔒 User |
| `GET` | `/api/accounts/{id}` | Get a specific account's details | 🔒 User |
| `POST` | `/api/accounts/{id}/credit` | Credit an account | 🔒 User |
| `POST` | `/api/accounts/{id}/debit` | Debit an account | 🔒 User |

### Transactions — `/api/accounts`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/accounts/{id}/transactions` | Get transaction history for an account | 🔒 User |
| `POST` | `/api/accounts/{id}/transactions` | Record a new transaction | 🔒 User |

### Budgets — `/api/budgets`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/budgets` | Create a new monthly budget | 🔒 User |
| `GET` | `/api/budgets/{month}` | Get budget breakdown for a month | 🔒 User |

### Bills — `/api/bills`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/bills` | Create a new bill | 🔒 User |
| `GET` | `/api/bills` | List all bills for the current user | 🔒 User |
| `PATCH` | `/api/bills/{id}/status` | Update bill status (e.g., mark as paid) | 🔒 User |

### Rewards — `/api/rewards`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/rewards/{userId}` | Get reward points for a user | 🔒 User |

### Insights — `/api/insights`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/insights/{userId}` | Get financial insights and trends | 🔒 User |

### Loans — `/api/loans`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/loans/products` | List available loan products | 🔒 User |
| `POST` | `/api/loans/apply` | Submit a new loan application | 🔒 User |
| `GET` | `/api/loans/accounts` | Get the user's active loan accounts | 🔒 User |
| `GET` | `/api/loans/{loanAccountId}/repayments` | Get EMI repayment schedule | 🔒 User |
| `PATCH` | `/api/loans/{loanAccountId}/repayments/{repaymentId}/pay` | Pay a specific EMI installment | 🔒 User |

### User Profile — `/api/users`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/users/me` | Get the current user's profile | 🔒 User |
| `PUT` | `/api/users/me` | Update the current user's profile | 🔒 User |

### Admin — `/api/admin`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/admin/users` | List all platform users | 🛡️ Admin |
| `PATCH` | `/api/admin/users/{userId}/status` | Toggle a user's active/inactive status | 🛡️ Admin |
| `GET` | `/api/admin/users/{userId}/activity` | View a specific user's activity log | 🛡️ Admin |
| `GET` | `/api/admin/dashboard` | Get admin dashboard KPIs | 🛡️ Admin |
| `GET` | `/api/admin/pending-approvals` | Get the pending loan approvals queue | 🛡️ Admin |
| `GET` | `/api/admin/system-health` | Get system health metrics | 🛡️ Admin |
| `POST` | `/api/loans/products` | Create a new loan product | 🛡️ Admin |
| `GET` | `/api/admin/loans/pending` | List all pending loan applications | 🛡️ Admin |
| `GET` | `/api/admin/loans/all` | List all loan applications | 🛡️ Admin |
| `POST` | `/api/admin/loans/{id}/approve` | Approve a loan application | 🛡️ Admin |
| `POST` | `/api/admin/loans/{id}/reject` | Reject a loan application | 🛡️ Admin |

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Java 17+** — [Download](https://adoptium.net/)
- **Maven 3.9+** — [Download](https://maven.apache.org/download.cgi)
- **Node.js 20+** and **npm 11+** — [Download](https://nodejs.org/)
- **Angular CLI 21** — `npm install -g @angular/cli`
- **MySQL 8** — [Download](https://dev.mysql.com/downloads/)

---

### 1 · Clone the repository

```bash
git clone https://github.com/rajkumarp29/Neobank.git
cd Neobank
```

---

### 2 · Backend Setup

**Create the MySQL database**

```sql
CREATE DATABASE neobank_db;
```

**Configure your credentials**

Open `neobank-backend/src/main/resources/application.properties` and update:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/neobank_db
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

**Build and run**

```bash
cd neobank-backend
./mvnw spring-boot:run
```

> ✅ Backend starts at **http://localhost:8080** — Hibernate auto-creates all 12 tables on first run.

---

### 3 · Frontend Setup

```bash
cd neobank-frontend
npm install
ng serve
```

> ✅ Frontend starts at **http://localhost:4200**

---

## ⚙️ Environment Configuration

### `application.properties` (Backend)

```properties
spring.application.name=neobank-backend
server.port=8080

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/neobank_db
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA / Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

> ⚠️ **Production note:** Set `ddl-auto=validate` and move credentials to environment variables or a secrets manager before deploying.

---

## 🌐 Running the Application

Once both servers are up, the full application is accessible at:

| URL | Description |
|---|---|
| `http://localhost:4200` | Landing page |
| `http://localhost:4200/register` | New user registration |
| `http://localhost:4200/login` | User login |
| `http://localhost:4200/dashboard` | User dashboard *(requires login)* |
| `http://localhost:4200/admin-panel` | Admin panel *(requires ADMIN role)* |
| `http://localhost:8080/api/...` | REST API base URL |

**First admin account:** Register normally, then grant the role directly in MySQL:

```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'your-admin@email.com';
```

---

## 💡 Key Implementation Highlights

### EMI Engine with `BigDecimal` Precision
Floating-point math risks rounding drift across an entire repayment schedule. All EMI calculations use `BigDecimal` with `RoundingMode.HALF_UP` at every step, ensuring the schedule sums exactly to `principal + total interest` — a critical correctness requirement for financial software.

### Stateless JWT Authentication
Every one of the 34+ endpoints is protected by a JWT filter chain. Tokens carry the `userId` and `role` claim with no server-side session state, making the system horizontally scalable from day one.

### Role-Based Access Control (RBAC)
Spring Security enforces two roles: `USER` and `ADMIN`. Angular route guards (`authGuard`, `adminAuthGuard`) mirror the same rules client-side, so unauthorized routes are never reached — defense in depth at both layers.

### Strict Layered Architecture
`Controller → Service → Repository` separation is never broken. HTTP concerns, business logic, and persistence queries each live in exactly one layer. Every module is independently testable and easy to extend without touching others.

### Cross-Module Data Consistency
As transactions flow across Accounts, Budgets, Bills, and Loans, foreign-key constraints and service-level validations keep all data consistent without distributed transactions — a clean design choice appropriate for the platform's scale.

---

## 📅 Sprint Roadmap

| Sprint | Days | Focus |
|---|---|---|
| Sprint 1 | 1–10 | Auth, RBAC, User registration & login |
| Sprint 2 | 11–20 | Accounts & Transactions |
| Sprint 3 | 21–30 | Budgets & Bills |
| Sprint 4 | 31–40 | Loans & EMI Engine |
| Sprint 5 | 41–60 | Analytics, Admin Dashboard, Testing & Deployment |

---

## 👤 Author

<div align="center">

**Potti Raj Kumar**
*Sole Developer — all 6 modules, 34+ endpoints, 12 entities*

Infosys PMIS Internship · Bhubaneswar DC, Lab 5 · Presented: 23 June 2026

[![GitHub](https://img.shields.io/badge/GitHub-rajkumarp29-181717?style=flat-square&logo=github)](https://github.com/rajkumarp29)

</div>

---

<div align="center">

*NeoBank 360 — Built independently across 6 modules, 34+ REST endpoints, 12 database entities, and a 60-day sprint roadmap.*

</div>
