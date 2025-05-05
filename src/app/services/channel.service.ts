import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {// غيري الرابط حسب API بتاعك

  constructor(private http: HttpClient) {}

  getAllChannels(): Observable<any> {
    return this.http.get<any>('http://localhost:5298/api/Channel');
  }
  getChannelById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:5298/api/Channel/${id}`);
  }
  subscribeToChannel(id: number): Observable<any> {
    return this.http.post<any>(`http://localhost:5298/api/Channel/subscribe/${id}`, {});
  }
}
