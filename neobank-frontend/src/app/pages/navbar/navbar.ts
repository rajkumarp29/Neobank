import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {

  menuOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getUserName(): string {
    return localStorage.getItem('username') || 'User';
  }

  getRole(): string {
    return localStorage.getItem('role') || 'Customer';
  }
}