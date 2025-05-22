import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  
  private apiUrl = 'http://readersclubapi.runasp.net/api/Stories/popular'; 
  private apiUrl2 = 'http://readersclubapi.runasp.net/api/Stories';
  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No token found'); // كده هيتوقف الطلب فعلاً برسالة واضحة
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
  

  getPopularBooks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getMostViewedBooks(): Observable<any[]> {
    return this.http.get<any[]>("http://readersclubapi.runasp.net/api/Stories/MostViewed");
  }
  
  
  GetAllStories(): Observable<any[]> {

    return this.http.get<any[]>(this.apiUrl2);

  }
 
  getStoryDetails(storyId: number): Observable<any[]> {

    return this.http.get<any[]>(`http://readersclubapi.runasp.net/api/Stories/${storyId}`);

  }

  increaseViews(storyId: number): Observable<any> {
    return this.http.post(
      `http://readersclubapi.runasp.net/api/Stories/${storyId}/increase-views`,
      {},
      { headers: this.getAuthHeaders() }
    );
  }
  likeStory(storyId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return throwError('You must be logged in to like a story');
    }

    return this.http.post(
      `http://readersclubapi.runasp.net/api/Stories/${storyId}/like`, 
      {},
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError(err => {
        console.error("Error liking story", err);
        return throwError(err); // إرجاع الخطأ في حال فشل الطلب
      })
    );
  }
  DislikeStory(storyId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return throwError('You must be logged in to dislike a story');
    }

    return this.http.post(
      `http://readersclubapi.runasp.net/api/Stories/${storyId}/dislike`, 
      {},
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError(err => {
        console.error("Error disliking story", err);
        return throwError(err);
      })
    );
  }
  unLick(storyId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return throwError('You must be logged in to unlike a story');
    }
  
    return this.http.post(
      `http://readersclubapi.runasp.net/api/Stories/${storyId}/unlike`,
      {},
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError(err => {
        console.error("Error unliking story", err);
        return throwError(err); // إرجاع الخطأ في حال فشل الطلب
      })
    );
  }
  
  unDisLick(storyId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return throwError('You must be logged in to undislike a story');
    }
  
    return this.http.post(
      `http://readersclubapi.runasp.net/api/Stories/${storyId}/undislike`,
      {},
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError(err => {
        console.error("Error undisliking story", err);
        return throwError(err); // إرجاع الخطأ في حال فشل الطلب
      })
    );
  }
  toggleSaveStory(storyId: number) {
    return this.http.post<{ isSaved: boolean }>(`http://readersclubapi.runasp.net/api/Stories/${storyId}/toggle-save`, {}, { headers: this.getAuthHeaders() });
  }
  
  isStorySaved(storyId: number) {
    return this.http.get<boolean>(
      `http://readersclubapi.runasp.net/api/Stories/${storyId}/issaved`,
      { headers: this.getAuthHeaders() }
    );  }
  
    getSavedStories() {
      return this.http.get<any[]>(`http://readersclubapi.runasp.net/api/Stories/saved`, {
        headers: this.getAuthHeaders()  
      });
    }
    getFilteredStories(title?: string): Observable<any[]> {
        let params = new HttpParams();
      
        if (title) {
          params = params.set('title', title);
        }
        return this.http.get<any[]>(`http://readersclubapi.runasp.net/api/Stories/FilterStory`, {params: params });
      
    }
    setStoryAsReader(storyId : number)
    {
       const token = localStorage.getItem('authToken');
    if (!token) {
      return throwError('You must be logged in to unlike a story');
    }
  
    return this.http.post(
      `http://localhost:5298/api/Stories/SetLastPage?storyId=${storyId}`,
      {},
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError(err => {
        console.error("Error unliking story", err);
        return throwError(err); // إرجاع الخطأ في حال فشل الطلب
      })
    );
    }
}
