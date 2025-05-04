import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
constructor(private http : HttpClient) {

   }
   logout(userData: any): Observable<any> {
    return this.http.post(`http://localhost:5298/api/Security/LogOut`,{})
      .pipe(
        catchError(error => {
          console.error('خطأ في التسجيل من API:', error);
          return throwError(() => error); // إعادة توجيه الخطأ إلى المكون
        })
      );
  }
}
