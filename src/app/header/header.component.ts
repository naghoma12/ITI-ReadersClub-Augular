import { Component } from '@angular/core';
import { LogoutService } from '../services/logout.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatButtonModule,RouterModule,MatToolbarModule, MatIconModule,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isAuthorize !:boolean;

  ngOnInit(): void {

    const token = localStorage.getItem('authToken');
    this.isAuthorize = !!token;
  }
  constructor(private router: Router, private logoutService: LogoutService) {}
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

}
