// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/admin/admin-login'; // Backend login endpoint
  private isAdmin = false; // Store admin status

  constructor(private http: HttpClient) {}

  // Method to log in the user
  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string, role: string }>(this.apiUrl, { email, password }).pipe(
      tap((response) => {
        // Save the token in localStorage or sessionStorage
        localStorage.setItem('authToken', response.token);

        // Check if the user is an admin based on the role from the backend response
        this.isAdmin = response.role === 'admin';
        console.log('User is admin:', this.isAdmin);
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        return of(null);
      })
    );
  }

  // Check if the user is logged in by verifying the token
  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Check if the logged-in user is an admin
  isUserAdmin(): boolean {
    return this.isAdmin;
  }

  // Log out the user
  logout(): void {
    localStorage.removeItem('authToken');
    this.isAdmin = false;
  }
}
