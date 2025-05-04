import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  apiErrors: { [key: string]: string } = {};
  token!: string;
  isLoading: boolean = false;
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
  }

  get formControls() {
    return this.loginForm.controls;
  }


  onSubmit() {
    if (this.loginForm.valid) {
      this.apiErrors = {};
      this.isLoading = true;
      const userData = this.loginForm.value;

      this.loginService.login(userData).subscribe({
        next: (res: any) => {
          this.token = res.token;
          if (this.token) {
            localStorage.setItem('authToken', this.token);
            this.router.navigate(['/']);
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.error('خطأ في التسجيل من API:', err);
          this.apiErrors = {};
          this.isLoading = false;
          if (typeof err.error === 'string') {
            this.apiErrors['email'] = err.error;
          } else if (err?.error?.errors) {
            const errors = err.error.errors as string[];
            for (const message of errors) {
             if (message.includes('البريد')) this.apiErrors['email'] = message;
             else if (message.includes('كلمة المرور')) this.apiErrors['password'] = message;
              else this.apiErrors['general'] = message;
            }
          } else if (err?.error?.Error) {
            this.apiErrors['general'] = err.error.Error;
          } else {
            this.apiErrors['general'] = 'حدث خطأ أثناء التسجيل';
          }
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      this.apiErrors['general'] = 'يرجى التأكد من صحة الحقول.';
    }
  }
}
