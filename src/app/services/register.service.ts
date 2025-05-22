import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {


  constructor(private http : HttpClient) {

   }
   register(userData: any): Observable<any> {
    return this.http.post(`http://readersclubapi.runasp.net/api/Security/Register`, userData)
      .pipe(
        catchError(error => {
          console.error('خطأ في التسجيل من API:', error);
          return throwError(() => error); // إعادة توجيه الخطأ إلى المكون
        })
      );
  }
}
