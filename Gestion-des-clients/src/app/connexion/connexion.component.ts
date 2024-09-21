import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false; // Loading state for button
  errorMessage: string = ''; // Error messages

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // Reset error message
    this.errorMessage = '';

    // Make sure both fields are filled in
    if (this.email && this.password) {
      this.isLoading = true; // Show loading spinner or disabled state

      // Call the AuthService to send a login request
      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
          if (response && response.token) {
            // Store the JWT token
            localStorage.setItem('token', response.token);
            // Navigate to /clientes on successful login
            this.router.navigate(['/clientes']);
          } else {
            // Show error if no token is returned
            this.errorMessage = 'Invalid email or password';
          }
          this.isLoading = false; // Stop loading
        },
        error: (error) => {
          // Error handling for incorrect credentials or server errors
          if (error.status === 404) {
            this.errorMessage = 'Admin not found';
          } else if (error.status === 401) {
            this.errorMessage = 'Invalid email or password';
          } else {
            this.errorMessage = 'Server error. Please try again later.';
          }
          this.isLoading = false; // Stop loading
        }
      });
    } else {
      // If email or password is not filled in, show an alert
      this.errorMessage = 'Please fill in both email and password.';
    }
  }
}
