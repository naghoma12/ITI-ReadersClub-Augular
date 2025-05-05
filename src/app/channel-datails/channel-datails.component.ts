import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChannelService } from '../services/channel.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-channel-datails',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './channel-datails.component.html',
  styleUrl: './channel-datails.component.css'
})
export class ChannelDatailsComponent {
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
subscribe(id : number):void{
this.channelService.subscribeToChannel(id).subscribe({
  next: (data) => {
    console.log('تم الاشتراك بنجاح', data);  // رسالة نجاح
    this.router.navigate(['/channels']);  // إعادة التوجيه إلى صفحة القنوات
  }
  ,error: (err) => {
    alert('حدث خطأ أثناء الاشتراك في القناة');  // رسالة خطأ
  }});
}
  goToStory(id: number): void {
    this.router.navigate(['/story', id]);
  }

}
