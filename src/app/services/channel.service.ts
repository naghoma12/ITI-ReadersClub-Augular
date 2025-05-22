import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {// غيري الرابط حسب API بتاعك

  constructor(private http: HttpClient) {}

  getAllChannels(): Observable<any> {
    return this.http.get<any>('http://readersclubapi.runasp.net/api/Channel');
  }
  getChannelById(id: number): Observable<any> {
    return this.http.get<any>(`http://readersclubapi.runasp.net/api/Channel/${id}`);
  }
  subscribeToChannel(id: number): Observable<any> {
    const token = localStorage.getItem('authToken'); // or wherever you store your token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.post<any>(`http://readersclubapi.runasp.net/api/Channel/Subscribe/${id}`, {},
      { headers: headers } 
    );
  }

  unSubscribeToChannel(id: number): Observable<any> {
    const token = localStorage.getItem('authToken'); // or wherever you store your token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.post<any>(`http://readersclubapi.runasp.net/api/Channel/UnSubscribe/${id}`, {},
      { headers: headers } 
    );
  }
  isSubscribe(id: number): Observable<any>{
    const token = localStorage.getItem('authToken'); // or wherever you store your token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get(`http://readersclubapi.runasp.net/api/Channel/IsSubscribed/${id}`,
       { headers: headers }
    );
  }
}
