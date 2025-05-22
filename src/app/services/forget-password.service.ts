import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {
constructor(private http : HttpClient) {

   }
   forgetPassword(email: string): Observable<any> {
    return this.http.post(`http://readersclubapi.runasp.net/api/Security/ForgetPassword`, {email})
      .pipe(
        catchError(error => {
          console.error('خطأ في التسجيل من API:', error);
          return throwError(() => error); // إعادة توجيه الخطأ إلى المكون
        })
      );
  }
}
