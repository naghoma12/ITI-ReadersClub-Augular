import { Component } from '@angular/core';
import { ReviewService } from '../review.service';
import { Review } from '../review';
import { AddReviewDto } from '../add-review-dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  reviews: Review[] = [];
  newReview: AddReviewDto = {
    StoryId: 1,  // هذا يجب تغييره بناءً على القصة الحالية
    UserId: 1,   // نفس الشيء، استخدم الـ UserId من الـ JWT أو الـ session
    Rating: 0,
    Comment: ''
  };

  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews() {
    this.reviewService.getReviews(this.newReview.StoryId).subscribe(
      (data) => {
        this.reviews = data;
      },
      (error) => {
        console.error('Error loading reviews', error);
      }
    );
  }

  addReview() {
    this.reviewService.addReview(this.newReview).subscribe(
      (response) => {
        console.log('Review added successfully');
        this.loadReviews();  // Reload reviews after adding
        this.newReview.Comment = '';  // Reset the form
        this.newReview.Rating = 0;
      },
      (error) => {
        console.error('Error adding review', error);
      }
    );
  }
}
