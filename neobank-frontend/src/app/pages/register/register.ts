import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  fullName        = '';
  email           = '';
  password        = '';
  confirmPassword = '';
  errorMessage    = '';

  showPassword = false;
  showConfirm  = false;

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.authService.register({ fullName: this.fullName, email: this.email, password: this.password }).subscribe({
      next: () => {
        alert('Registration successful');
        this.router.navigate(['/login']);
      },
      error: err => {
        this.errorMessage = err.error || 'Registration failed';
      }
    });
  }
}