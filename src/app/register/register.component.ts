import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  apiErrors: { [key: string]: string } = {};
  token!: string;
  isLoading: boolean = false;
  constructor(private registerService: RegisterService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required,Validators.minLength(8)]),
      isAuthor: new FormControl(false)
  });
  }

  get formControls() {
    return this.registerForm.controls;
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.apiErrors = {};
      this.isLoading = true;
      const userData = this.registerForm.value;

      this.registerService.register(userData).subscribe({
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
              if (message.includes('الاسم')) this.apiErrors['name'] = message;
              else if (message.includes('البريد')) this.apiErrors['email'] = message;
              else if (message.includes('كلمة المرور')) this.apiErrors['password'] = message;
              else if (message.includes('تأكيد')) this.apiErrors['confirmPassword'] = message;
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
      this.registerForm.markAllAsTouched();
      this.apiErrors['general'] = 'يرجى التأكد من صحة الحقول.';
    }
  }
}
