import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalsService } from '../../hospitals.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  isSubmitting = false;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private hospitalsService: HospitalsService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4)]],
      }
      // { validators: this.passwordMatchValidator }
    );
  }
  registerUser() {
    this.hospitalsService.userRegister(this.registerForm.value).subscribe({
      next: (res: any) => {
        this.showMessage();
        this.router.navigate(['/login']);
        console.log('Registration successful:', res);
      },
      error: (error: any) => {
        this.showErrorMessage();
        console.error('Registration failed:', error);
      },
    });
  }
  // Add the missing method
  // passwordMatchValidator(form: FormGroup) {
  //   const password = form.get('password');
  //   const confirmPassword = form.get('confirmPassword');
  //   return password &&
  //     confirmPassword &&
  //     password.value === confirmPassword.value
  //     ? null
  //     : { mismatch: true };
  // }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isSubmitting = true;

      // Simulate API call
      setTimeout(() => {
        console.log('Registration successful:', this.registerForm.value);
        this.isSubmitting = false;
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.registerForm.controls).forEach((key) => {
      this.registerForm.get(key)?.markAsTouched();
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  get username() {
    return this.registerForm.get('firstName');
  }

  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }

  showMessage(): void {
    const name = this.registerForm.value.username;
    this._snackBar.open(
      `✅ ${name || 'User'} Registered successfully!`,
      'Close',
      {
        duration: 2500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['snackbar-success'],
      }
    );
  }
  showErrorMessage() {
    this._snackBar.open('❌ Registration failed. Please try again.!', 'Close', {
      duration: 2500,
      panelClass: ['snackbar-error'],
    });
  }
}
