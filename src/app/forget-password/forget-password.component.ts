import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ForgetPasswordService } from '../services/forget-password.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,RouterLink],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
 emailForm!: FormGroup;
  apiErrors: { [key: string]: string } = {};
  email!: string;
  isLoading: boolean = false;
  constructor(private forgetPasswordService: ForgetPasswordService, private router: Router) {}

  ngOnInit(): void {
    this.emailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
  });
  }

  get formControls() {
    return this.emailForm.controls;
  }


  onSubmit() {
    if (this.emailForm.valid) {
      this.apiErrors = {};
      this.isLoading = true;
       this.email = this.emailForm.value.email;
      localStorage.removeItem('OTP');
      localStorage.removeItem('email');
      this.forgetPasswordService.forgetPassword(this.email).subscribe({
        next: (res: any) => {
            localStorage.setItem('OTP', res);
            localStorage.setItem('email', this.email);
            this.router.navigate(['/varfication-code']);
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
      this.emailForm.markAllAsTouched();
      this.apiErrors['general'] = 'يرجى التأكد من صحة الحقول.';
    }
  }
}
