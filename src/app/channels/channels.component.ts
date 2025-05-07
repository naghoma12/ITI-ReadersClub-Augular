import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChannelService } from '../services/channel.service';
import { LogoutService } from '../services/logout.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [RouterModule, CommonModule, MatCardModule,
      MatButtonModule,
      RouterModule,
      MatToolbarModule,
      MatIconModule,],
  standalone: true,
  templateUrl: './channels.component.html',
  styleUrl: './channels.component.css',
})
export class ChannelsComponent {
  channels: any[] = [];
  constructor(private channelService: ChannelService,private router: Router) {}

  ngOnInit(): void {
    this.channelService.getAllChannels().subscribe({
      next: (data) =>{ this.channels = data;},
      error: (err) => console.error('Error loading channels', err)
    });
  }
 
  goToDetails(id: number): void {
    this.router.navigate(['/channel-details', id]); 
  }
}
