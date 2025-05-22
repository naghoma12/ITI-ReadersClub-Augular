import { Component , OnInit} from '@angular/core';
import { BookService } from '../services/book.service';
import { CommonModule } from '@angular/common'; // استيراد CommonModule
import { ActivatedRoute, Router } from '@angular/router';
import { on } from 'events';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LogoutService } from '../services/logout.service';
import { AddReviewDto } from '../add-review-dto';
import { ReviewService } from '../review.service';
import { FormsModule } from '@angular/forms';
import { getDocument } from 'pdfjs-dist';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule, MatButtonModule , MatToolbarModule ,FormsModule ],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {
  book: any;
  bookId!: number;
  like :boolean=false;
  disLick : boolean=false;
  saved : boolean=false;
  pdfUrl!: SafeResourceUrl;
  storyId!: number;
  story: any;
  fileUrl!: string;
  isAuthorize !:boolean;
  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private logoutService: LogoutService,
    private reviewService: ReviewService, // جديد
    private sanitizer: DomSanitizer
  ) {}
  

  ngOnInit() {
    this.storyId = Number(this.route.snapshot.paramMap.get('id'));

    this.http.post(`http://readersclubapi.runasp.net/api/Stories/${this.storyId}/increase-views`, {})
    .subscribe({
      next: () => {
       
        this.getStoryDetails(this.storyId);
        const token = localStorage.getItem('authToken');
        this.isAuthorize = !!token;
      },
      error: (err) => {
        console.error("فشل في زيادة عدد المشاهدات", err);
        this.getStoryDetails(this.storyId);
      }
    });

    this.ifSaved();
    this.loadReviews();
    
   
  }
  openPdf(){
        this.fileUrl = this.story.file;
        window.open(this.fileUrl , '_blank');
  }
  getStoryDetails(id: number) {
    this.bookService.GetAllStories().subscribe(res => {
      this.story = res.find(story => story.id === id); 
    });
  }
  goBack() {
    this.router.navigate(['/allStories']);
  }
 
  Saved() {
    const token = localStorage.getItem('authToken');
  
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
  
    this.bookService.toggleSaveStory(this.storyId).subscribe({
      next: (res) => {
        this.saved = res.isSaved;
        const msg = this.saved ? "تم حفظ القصة" : "تم إزالة القصة من المحفوظات";
        this.snackBar.open(msg, 'إغلاق', { duration: 2000 });
      },
      error: (err) => {
        console.error("فشل في حفظ/إلغاء الحفظ", err);
      }
    });
  }
  ifSaved() {
    const token = localStorage.getItem('authToken');
  
    if (token) {
      this.bookService.isStorySaved(this.storyId).subscribe({
        next: (res) => {
          return this.saved = res;
        },
        error: (err) => {
          console.error("فشل في التحقق من حالة الحفظ", err);
        }
      });
      
    }
  
   
  }
  

  clickLick() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.like == false) {
      
      this.bookService.likeStory(this.storyId).subscribe({
        next: () => { 
          this.getStoryDetails(this.storyId);
          this.like = true;
        },
        error: (err) => {
          console.error("فشل في زيادة عدد اللايكات", err);
        }
      });
    } else {
      
      this.bookService.unLick(this.storyId).subscribe({
        next: () => { 
          this.getStoryDetails(this.storyId);
          this.like = false;
        },
        error: (err) => {
          console.error("فشل في نقص عدد اللايكات", err);
        }
      });
    }
  }


  clickdisLick() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      // إذا لم يكن المستخدم مسجلاً دخوله، توجيهه إلى صفحة تسجيل الدخول
      this.router.navigate(['/login']);
      return;
    }

    if (this.disLick == false) {
     
      this.bookService.DislikeStory(this.storyId).subscribe({
        next: () => {
          this.disLick = true;
          this.getStoryDetails(this.storyId);
        },
        error: (err) => {
          console.error("فشل في زيادة عدد الديسلايكات", err);
        }
      });
    } else {
      
      this.bookService.unDisLick(this.storyId).subscribe({
        next: () => { 
          this.disLick = false;
          this.getStoryDetails(this.storyId);
        },
        error: (err) => {
          console.error("فشل في نقص عدد الديسلايكات", err);
        }
      });
    }
  }
  showComments(): void {
    console.log("Comment clicked")
    const commentsSection = document.getElementById('commentsSection');
    if (commentsSection) {
      commentsSection.scrollIntoView({ behavior: 'smooth' });
    }
    this.loadReviews();
  }
 
  reviews: any[] = [];
  newReview: AddReviewDto = {
    StoryId: this.storyId,
    UserId: 0,
    Rating: 3,
    Comment: ''
  };
  
  loadReviews() {
    this.reviewService.getReviews(this.storyId).subscribe({
      next: (data) => {
        this.reviews = data;
      },
      error: (error) => {
        console.error('Error loading reviews', error);
      }
    });
    
  }
  
  addReview() {
  this.newReview.StoryId = this.storyId;

  const userId = Number(localStorage.getItem('userId')); 
  if (!userId) {
    this.router.navigate(['/login']);
    return;
  }

  this.newReview.UserId = userId;

  this.reviewService.addReview(this.newReview).subscribe({
    next: (res) => {
      console.log('Review added:', res);
      this.snackBar.open('تمت إضافة المراجعة بنجاح', 'إغلاق', { duration: 2000 });

      // Reset form
      this.newReview.Comment = '';
      this.newReview.Rating = 3;

      // Reload reviews after slight delay
      setTimeout(() => {
        this.loadReviews();
      }, 500);
    },
    error: (error) => {
      console.error('Error adding review', error);
    }
  });
}


}

