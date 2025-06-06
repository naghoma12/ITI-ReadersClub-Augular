import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddReviewDto } from './add-review-dto';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiUrl = `http://readersclubapi.runasp.net/api/Review/AddReview`;
  private apiUrl1=`http://readersclubapi.runasp.net/api/Review/GetAllReviewsInStory?storyId=1`;

  constructor(private http: HttpClient) { }
  getReviews(storyId: number): Observable<any> {
    return this.http.get(`http://readersclubapi.runasp.net/api/Review/GetAllReviewsInStory?storyId=${storyId}`);
  }

  // إضافة كومينت
  addReview(review: AddReviewDto): Observable<any> {
    return this.http.post(this.apiUrl, review);
  }
}
