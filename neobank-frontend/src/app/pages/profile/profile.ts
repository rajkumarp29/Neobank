import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../../services/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

  user: any = {
    id: 0,
    fullName: '',
    email: '',
    role: null,
    bio: '',
    avatarColor: '#2563eb'  // always valid
  };

  maxBioLength = 200;
  saving = false;
  showToast = false;
  isDarkMode = false;

  constructor(private userService: UserService) {}

  // ✅ INIT
  ngOnInit(): void {

    // ✅ Always light mode
    document.body.classList.remove('dark-theme');

    this.setDefaultColor();

    this.userService.getProfile().subscribe((data: User) => {

      this.user.fullName = data.fullName;
      this.user.email = data.email;
      this.user.role = data.role;

      // ✅ Ensure safe color after API
      this.setDefaultColor();
    });
  }

  // ✅ ✅ FIX for color error
  setDefaultColor(): void {
    if (!this.user.avatarColor || !this.isValidHex(this.user.avatarColor)) {
      this.user.avatarColor = '#2563eb';
    }
  }

  // ✅ hex validation
  isValidHex(color: string): boolean {
    return /^#[0-9A-Fa-f]{6}$/.test(color);
  }

  // ✅ ✅ FIX: controlled color change (NO auto save)
  onColorChange(color: string): void {
    if (this.isValidHex(color)) {
      this.user.avatarColor = color;
    }
  }

  // ✅ theme toggle
  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  // ✅ ONLY button triggers save
  saveProfile(): void {
    this.saving = true;

    this.userService.updateProfile(this.user.fullName).subscribe(() => {
      this.saving = false;
      this.showToast = true;

      setTimeout(() => {
        this.showToast = false;
      }, 2000);
    });
  }

  // ✅ initials
  getInitials(): string {
    if (!this.user.fullName) return '?';

    return this.user.fullName
      .split(' ')
      .map((p: string) => p[0])
      .join('')
      .toUpperCase();
  }
}