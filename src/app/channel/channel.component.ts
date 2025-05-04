import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChannelService } from '../services/channel.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css'],
})
export class ChannelComponent implements OnInit {
  channel: any;
  errorMessage: string = '';  // متغير لتخزين رسائل الأخطاء

  constructor(
    private route: ActivatedRoute,
    private channelService: ChannelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.channelService.getChannelById(id).subscribe({
        next: (data) => {
          this.channel = data;  // تعيين البيانات إلى المتغير channel
        },
        error: (err) => {
          this.errorMessage = 'حدث خطأ أثناء تحميل البيانات';  // رسالة خطأ
          console.error(err);
        },
      });
    }
  }

  goToStory(id: number): void {
    this.router.navigate(['/story', id]);
  }
}
