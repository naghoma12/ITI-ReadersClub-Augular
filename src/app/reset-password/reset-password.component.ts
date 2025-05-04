import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ResetPasswordService } from '../services/reset-password.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  resetPassordForm!: FormGroup;
  apiErrors: { [key: string]: string } = {};
  token!: string;
  isLoading: boolean = false;
  email!: string;
  constructor(private resetPasswordservice: ResetPasswordService, private router: Router) {}

  ngOnInit(): void {
    this.resetPassordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
  }

  get formControls() {
    return this.resetPassordForm.controls;
  }


  onSubmit() {
    if (this.resetPassordForm.valid) {
      this.apiErrors = {};
      this.isLoading = true;
      const password = this.resetPassordForm.value.password; 
      const confirmPassword = this.resetPassordForm.value.confirmPassword;
      this.email = localStorage.getItem('email') || '';
      
      if (!this.email) {
        this.apiErrors['general'] = 'البريد الإلكتروني غير موجود. يرجى إعادة المحاولة من البداية.';
        this.isLoading = false;
        return;
      }
  
      this.resetPasswordservice.resetPassword(this.email, password,confirmPassword).subscribe({
        next: (res: any) => {
          this.token = res.token;
          if (this.token) {
            localStorage.setItem('authToken', this.token);
            this.router.navigate(['/']);
            localStorage.removeItem('OTP');
            localStorage.removeItem('email');
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
              if (message.includes('كلمة المرور')) this.apiErrors['password'] = message;
              else if (message.includes('تأكيد')) this.apiErrors['confirmPassword'] = message;
              else this.apiErrors['general'] = message;
            }
          } else if (err?.error?.Error) {
            this.apiErrors['general'] = err.error.Error;
          } else {
            this.apiErrors['general'] = 'حدث خطأ أثناء محاولة إعادة تعيين كلمة المرور.';
          }
        }
      });
    } else {
      this.resetPassordForm.markAllAsTouched();
      this.apiErrors['general'] = 'يرجى التأكد من صحة الحقول.';
    }
  }
  
}
