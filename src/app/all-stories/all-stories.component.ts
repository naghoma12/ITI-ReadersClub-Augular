import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import {BookService} from '../services/book.service';
import { provideHttpClient } from '@angular/common/http';
import { LogoutService } from '../services/logout.service';

@Component({
  selector: 'app-all-stories',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule , MatToolbarModule , MatIconModule ],
  templateUrl: './all-stories.component.html',
  styleUrl: './all-stories.component.css'
})
export class AllStoriesComponent {

  allStories: any[] = [];
  constructor(private bookService: BookService,private router: Router,private logoutService: LogoutService) {}
  ngOnInit(): void {
    this.bookService.GetAllStories().subscribe({
      next: (data) => {
        this.allStories = data;
      },
      error: (err) => {
        console.error('Error loading stories', err);
      }
    });
  }
  goToDetails(id: number) {
    this.router.navigate(['/book', id]);
  }
  goToSavedStories() {
    this.router.navigate(['/saved-stories']);  // تأكد من أن هذا هو المسار الصحيح لصفحة الروايات المحفوظة
  }
}
