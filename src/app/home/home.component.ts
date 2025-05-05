import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { BookService } from '../services/book.service';
import { LogoutService } from '../services/logout.service';
import { MatFormFieldControl } from '@angular/material/form-field';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // handle scroll event to change the header style
  isScrolled = false;
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.isScrolled = scrollTop > 50;
  }
  popularBooks: any[] = [];



  constructor(private bookService: BookService, private router: Router,private logoutService: LogoutService) {}

  ngOnInit(): void {
    this.bookService.getPopularBooks().subscribe({
      next: (data) => {
        this.popularBooks = data;
        console.log(data); // للتأكد
      },
      // error: (err) => console.error(err),
    });
  }

  goToDetails(id: number): void {
    this.router.navigate(['/book', id]);
  }
 
  goToAll() : void{
    this.router.navigate(['/allStories']);
  }
}



