import { Component } from '@angular/core';
import { LogoutService } from '../services/logout.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatButtonModule,RouterModule,MatToolbarModule, MatIconModule,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isAuthorize !:boolean;
userImage!: string;
  ngOnInit(): void {

    const token = localStorage.getItem('authToken');
    this.isAuthorize = !!token;

    this.profile.getUserImage().subscribe({
      next: (res) => {
        console.log('User image response:', res);
        this.userImage = res.image;
        console.log('User image:', this.userImage);
      },
      error: (err) => {
        console.error('Error fetching user image:', err);
      }});
  }
  constructor(private router: Router, private logoutService: LogoutService,private profile : ProfileService) {}
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
