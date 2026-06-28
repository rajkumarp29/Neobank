import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  // ✅ ADD THIS
  showPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // ✅ ADD THIS METHOD
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  login() {
    const payload = {
      email: this.email.trim().toLowerCase(),
      password: this.password
    };

    this.authService.login(payload).subscribe({
      next: (res: any) => {

       this.authService.saveToken(res.token);

// ✅ Extract userId safely
const userId =
  res.id ||
  res.user?.id ||
  res.user?.userId;

const userName =
  res.fullName ||
  res.user?.fullName ||
  res.name ||
  res.email ||
  'Customer';

const role =
  res.role ||
  res.user?.role ||
  'CUSTOMER';

// ✅ ✅ STORE COMPLETE USER OBJECT
localStorage.setItem('user', JSON.stringify({
  id: userId,
  name: userName,
  role: role
}));

// (Optional but fine)
localStorage.setItem('username', userName);
localStorage.setItem('role', role);

        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage =
          err?.error?.message || 'Invalid email or password';
      }
    });
  }
}