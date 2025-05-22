import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
 private apiUrl = 'http://readersclubapi.runasp.net/api/Profile/GetProfile';
  constructor(private http : HttpClient) { }

  getUserImage(): Observable<any> {
      const token = localStorage.getItem('authToken'); // or wherever you store your token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
    return this.http.get(`http://readersclubapi.runasp.net/api/Security/GetUserImage`,
        { headers: headers } 
      
    );
  }
   updateProfileData(userData: any): Observable<any> {
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

    return this.http.put(`${this.apiUrl}/profile/update`, userData, { headers });
  }

  getProfile() {
    return this.http.get<any>('api/profile', this.getAuthHeader());
  }

  updateProfile(user: any) {
    return this.http.put('api/profile', user, this.getAuthHeader());
  }

  deleteAccount() {
    return this.http.delete('api/profile', this.getAuthHeader());
  }

  private getAuthHeader() {
    const token = localStorage.getItem('authToken');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  uploadProfileImage(file: File): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
   const formData = new FormData();
  formData.append('Image', file);
    return this.http.post('http://readersclubapi.runasp.net/api/Profile/upload-image', formData, { headers : headers });
  }
  
}
