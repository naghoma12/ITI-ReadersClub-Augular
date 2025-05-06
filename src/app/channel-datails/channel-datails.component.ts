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
  isSubscribe !: boolean;
  token : string| null = '';
  constructor(
    private route: ActivatedRoute,
    private channelService: ChannelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.token = localStorage.getItem('authToken')
    
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
    this.channelService.isSubscribe(id).subscribe({
      next: (data) => {
        this.isSubscribe = data;  // تعيين البيانات إلى المتغير channel
      },
    })

  }

subscribe(id : number):void{
  if(this.token == null){
    this.router.navigate(['/login'])
  }else{
    this.channelService.subscribeToChannel(id).subscribe({
      next: (data) => {
        console.log('تم الاشتراك بنجاح', data);  // رسالة نجاح
        window.location.reload();  
      }
      ,error: (err) => {
        alert('حدث خطأ أثناء الاشتراك في القناة');  // رسالة خطأ
      }});
  }
}
unSubscribe(id : number):void{
  if(this.token == null){
    this.router.navigate(['/login'])
  }else{
  this.channelService.unSubscribeToChannel(id).subscribe({
    next: (data) => {
      console.log('تم إالغء الاشتراك بنجاح', data);  // رسالة نجاح
      window.location.reload();  
    }
    ,error: (err) => {
      alert('حدث خطأ أثناء إالغاء الاشتراك في القناة');  // رسالة خطأ
    }});
  }
  }
  goToStory(id: number): void {
    this.router.navigate(['/book', id]);
  }

}
