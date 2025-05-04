import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
@Component({
  selector: 'app-saved-stories',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule , MatToolbarModule , MatIconModule ],
  templateUrl: './saved-stories.component.html',
  styleUrl: './saved-stories.component.css'
})
export class SavedStoriesComponent {
  savedStories :any;;

  constructor(private storyService: BookService,private router:Router) { }

  ngOnInit(): void {
    this.getSavedStories();
  }

  getSavedStories() {
    this.storyService.getSavedStories().subscribe({
      next: (response) => {
        this.savedStories = response;
      },
      error: (error) => {
        console.error('Error fetching saved stories', error);
      }
    });
  }
  
  goToDetails(id: number) {
    this.router.navigate(['/book', id]);
  }
  
}
