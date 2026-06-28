import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  // 🔐 Login API

login(data: any) {
  return this.http.post<any>(`${this.baseUrl}/login`, data).pipe(
    tap(res => {

      console.log('✅ Login Response:', res);

      // ✅ Save token
      localStorage.setItem('token', res.token);

      // ✅ FIXED USER EXTRACTION
      const user = res.user || res;

      const userObj = {
        id: user.id,
        name: user.fullName || user.name || 'Customer',
        role: user.role || 'CUSTOMER'
      };

      // ✅ Store user object
      localStorage.setItem('user', JSON.stringify(userObj));

      // ✅ ALSO STORE SEPARATELY (IMPORTANT)
      localStorage.setItem('userId', userObj.id);
      localStorage.setItem('fullName', userObj.name);
      localStorage.setItem('role', userObj.role);

      console.log('✅ Stored user:', userObj);
    })
  );
}


  // 📝 Register API
  register(data: any) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  // ✅ Token methods
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ✅ ✅ Get User from localStorage
  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // ✅ ✅ Get userId (VERY IMPORTANT)
  getUserId(): number | null {
    const user = this.getUser();
    return user?.id || null;
  }

  // ✅ Other helpers
  getFullName(): string {
    return localStorage.getItem('fullName') || '';
  }

  getUserName(): string {
    return localStorage.getItem('username') || '';
  }

  getRole(): string {
    return localStorage.getItem('role') || 'CUSTOMER';
  }

  logout(): void {
    localStorage.clear();
  }
}