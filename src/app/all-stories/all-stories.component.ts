import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import {BookService} from '../services/book.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-all-stories',
  standalone: true,
  imports: [CommonModule, MatCardModule,MatFormFieldModule, MatButtonModule, RouterModule, MatToolbarModule , MatIconModule ,FormsModule],
  templateUrl: './all-stories.component.html',
  styleUrl: './all-stories.component.css'
})
export class AllStoriesComponent {

  filteredStories: any[] = [];
  allStories: any[] = []; // متغير لتخزين جميع الروايات
  searchText !: string;
  constructor(private bookService: BookService,private router: Router) {}
  filterStories(): void {
    const keyword = this.searchText.trim().toLowerCase();
  if (!keyword) {
    this.filteredStories = this.allStories;
    return;
  }
  this.bookService.getFilteredStories(keyword).subscribe({
    next: (data) => {
      this.filteredStories = data;
    },
    error: (err) => {
      console.error('Error loading stories', err);
    }
  });
  }

  ngOnInit() {
    this.bookService.GetAllStories().subscribe({
      next: (data) => {
        this.filteredStories = data; // تخزين جميع الروايات
        this.allStories = data; // تخزين جميع الروايات في متغير آخر
      },
      error: (err) => {
        console.error('Error loading stories', err);
      }
    });
  }
  clearSearch(): void {
    this.searchText = '';
    this.bookService.getFilteredStories().subscribe({
      next: (data) => {
        this.filteredStories = data;
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
