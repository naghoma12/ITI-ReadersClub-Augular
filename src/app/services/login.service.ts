import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
constructor(private http : HttpClient) {}

   login(userData: any): Observable<any> {
    return this.http.post(`http://readersclubapi.runasp.net/api/Security/Login`, userData)
      .pipe(
        catchError(error => {
          console.error('خطأ في التسجيل من API:', error);
          return throwError(() => error); // إعادة توجيه الخطأ إلى المكون
        })
      );
  }
}
