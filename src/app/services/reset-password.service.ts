import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http : HttpClient) {

  }
  resetPassword(email: string,newPassword : string,confirmPassword : string): Observable<any> {
   return this.http.post(`http://readersclubapi.runasp.net/api/Security/ResetPassword`, {email,newPassword,confirmPassword})
     .pipe(
       catchError(error => {
         console.error('خطأ في التسجيل من API:', error);
         return throwError(() => error); // إعادة توجيه الخطأ إلى المكون
       })
     );
 }
}
