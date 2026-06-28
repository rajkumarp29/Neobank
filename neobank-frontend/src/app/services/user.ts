import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  fullName: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'MEMBER';
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  // ✅ Logged-in user
  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.API}/me`);
  }

  // ✅ ADMIN: Get all users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API);
  }

  // ✅ Update own profile
  updateProfile(fullName: string): Observable<void> {
    return this.http.put<void>(`${this.API}/me`, { fullName });
  }

  // ✅ ADMIN: Update user role (THIS WAS THE BUG)
  updateUserRole(userId: number, role: User['role']): Observable<void> {
    return this.http.put<void>(
      `${this.API}/${userId}/role`,
      { role }
    );
  }
}