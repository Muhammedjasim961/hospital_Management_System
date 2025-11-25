import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalsService } from '../../hospitals.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitting = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private hospitalsService: HospitalsService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
  loginUserForm() {
    this.hospitalsService.userLogin(this.loginForm.value).subscribe({
      next: (res) => {
        this.showMessage();
        this.router.navigate(['/home']);
        const getToken = localStorage.setItem('token', res.token);
        this.hospitalsService.setUserLoggedIn(true);
        console.log('token', getToken);
        console.log('logged in user', res);
      },
      error: (err) => {
        this.showErrorMessage();
        console.log('error while logging user', err);
      },
    });
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isSubmitting = true;

      // Simulate API call
      setTimeout(() => {
        console.log('Login successful:', this.loginForm.value);
        this.isSubmitting = false;
      }, 2000);
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  showMessage(): void {
    this._snackBar.open('✅ USER Logged In successfully!', 'Close', {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-success'],
    });
  }

  showErrorMessage() {
    this._snackBar.open('❌ Error while Login User!', 'Close', {
      duration: 2500,
      panelClass: ['snackbar-error'],
    });
  }
}
