import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-verfication-code',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,RouterLink],
  templateUrl: './verfication-code.component.html',
  styleUrl: './verfication-code.component.css'
})
export class VerficationCodeComponent {
  verificationForm!: FormGroup;
  apiErrors: { [key: string]: string } = {};
  isLoading: boolean = false;
  otp !:string;

  constructor(private router: Router) {}
 ngOnInit(): void {
     this.verificationForm = new FormGroup({
       code: new FormControl('', [Validators.required, Validators.pattern(/^\d{6}$/)]),
   });
   }
 
   get formControls() {
     return this.verificationForm.controls;
   }
   onVerifyCode(){
    if (this.verificationForm.valid) {
      this.apiErrors = {};
      this.isLoading = true;
       this.otp = localStorage.getItem('OTP') || '';
      const code = this.verificationForm.value.code;
      if (this.otp === code) {
        // Code is correct, proceed with the next step
        this.router.navigate(['/reset-password']);
        this.isLoading = false;
        // Navigate to the next page or perform any other action
      } else {
        // Code is incorrect, show an error message
        this.apiErrors['code'] = 'رمز التحقق غير صحيح';
        this.isLoading = false;
      }
    }
   }
}
