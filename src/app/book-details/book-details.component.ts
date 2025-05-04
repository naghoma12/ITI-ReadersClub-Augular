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

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule, MatButtonModule , MatToolbarModule  ],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {
  book: any;
  bookId!: number;
 
 
  storyId!: number;
  story: any;
  isAuthorize !:boolean;
  constructor(private bookService: BookService,private route: ActivatedRoute, private http: HttpClient, private router: Router,private snackBar: MatSnackBar
    ,private logoutService: LogoutService
  ) {}

  ngOnInit() {
  
    this.storyId = Number(this.route.snapshot.paramMap.get('id'));
    this.http.post(`http://localhost:5298/api/Stories/${this.storyId}/increase-views`, {})
    .subscribe({
      next: () => {
        // ثم نجيب تفاصيل الرواية بعد نجاح زيادة المشاهدات
        this.getStoryDetails(this.storyId);
        const token = localStorage.getItem('authToken');
        this.isAuthorize = !!token;
      },
      error: (err) => {
        console.error("فشل في زيادة عدد المشاهدات", err);
        // نجيب التفاصيل حتى لو حصل خطأ في الزيادة
        this.getStoryDetails(this.storyId);
      }
    });
  }
 
  LogOut(): void {
    this.logoutService.logout({}).subscribe({
      next: () => {
        localStorage.removeItem('authToken');
        this.isAuthorize = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout failed:', err);
      }});
    }
  getStoryDetails(id: number) {
    this.bookService.GetAllStories().subscribe(res => {
      this.story = res.find(story => story.id === id); 
    });
  }
  goBack() {
    this.router.navigate(['/allStories']);
  }
  like :boolean=false;
  disLick : boolean=false;
  saved : boolean=false;
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
  clickLick() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      // إذا لم يكن المستخدم مسجلاً دخوله، توجيهه إلى صفحة تسجيل الدخول
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
 
}

