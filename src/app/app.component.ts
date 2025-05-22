import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , MatToolbarModule, MatButtonModule, CommonModule,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'library-webite';
  showHeader = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      // Define routes where you don't want the header
      const hiddenHeaderRoutes = [
        '/login',
        '/register',
        '/forget-password',
        '/varfication-code',
        '/reset-password',
        '/profile'
      ];

      const dynamicRoutes = [
        /^\/book\/\d+$/, // matches /book/123 or /book/456 etc.
        /^\/profile-update\/\d+$/
      ];

      const url = event.urlAfterRedirects;

      const isStaticMatch = hiddenHeaderRoutes.includes(url);
      const isDynamicMatch = dynamicRoutes.some(regex => regex.test(url));

      this.showHeader = !(isStaticMatch || isDynamicMatch);
    }
  });}
}
