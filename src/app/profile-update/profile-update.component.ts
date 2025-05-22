import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-update',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile-update.component.html',
  styleUrl: './profile-update.component.css'
})
export class ProfileUpdateComponent {
  
    user: any = {};           // البيانات الأصلية
  editModel: any = {};      // نسخة للعرض والتعديل
  
    selectedImage: any;
    passwordVisibility = false;
  
    constructor(private http: HttpClient ,private profileService: ProfileService 
      ,private router : Router) {}

    ngOnInit(): void {
    this.getUserProfile();
     // جلب بيانات المستخدم عند تحميل الصفحة
  }  
  onCancelEdit(): void {
   this.router.navigate(['/profile'])
  }
  getUserProfile(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.get<any>('http://readersclubapi.runasp.net/api/Profile/GetProfile', { headers })
        .subscribe({
          next: (res) => {
            this.user = res;
            this.editModel = { ...res };
          },
          error: (err) => {
            console.error('خطأ في جلب بيانات المستخدم:', err);
          }
        });
    }
  }
  onSaveProfile(): void {
    const token = localStorage.getItem('authToken');
    if (!token) return;
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    const updateProfileDto: any = {
      name: this.editModel.name,
      email: this.editModel.email,
      phone: this.editModel.phone
    };
  
    // لو المستخدم اختار صورة جديدة
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfileDto.image = reader.result;
  
        this.sendProfileUpdate(updateProfileDto, headers);
      };
      reader.readAsDataURL(this.selectedImage);
    } else {
      updateProfileDto.image = this.editModel.image;
      this.sendProfileUpdate(updateProfileDto, headers);
    }
  }
  sendProfileUpdate(data: any, headers: HttpHeaders): void {
    this.http.put<any>('http://readersclubapi.runasp.net/api/Profile/UpdateProfile', data, { headers })
      .subscribe({
        next: () => {
          // بعد التحديث، لو فيه باسورد هنبعته
          if (this.editModel.currentPassword && this.editModel.newPassword && this.editModel.confirmPassword) {
            const changePasswordDto = {
              oldPassword: this.editModel.currentPassword,
              newPassword: this.editModel.newPassword,
              confirmPassword: this.editModel.confirmPassword
            };
  
            this.http.post<any>('http://readersclubapi.runasp.net/api/Profile/change-password', changePasswordDto, { headers })
              .subscribe({
                next: () => {
                  alert('✅ تم حفظ البيانات وتغيير كلمة المرور');
                
                 this.getUserProfile();
                 this.router.navigate(['/profile'])
                },
                error: (err) => {
                  console.error('❌ خطأ في تغيير كلمة المرور:', err);
                  alert('✅ تم حفظ البيانات، لكن حدث خطأ في تغيير كلمة المرور');
                }
              });
          } else {
            alert('✅ تم حفظ البيانات بنجاح');
            this.getUserProfile();
          }
        },
        error: (err) => {
          console.error('❌ خطأ في تحديث البيانات:', err);
          alert('❌ حدث خطأ أثناء تحديث البيانات');
        }
      });
  }
    

  onDeleteAccount(): void {
    const confirmDelete = confirm('هل أنت متأكد أنك تريد حذف حسابك؟');
    if (!confirmDelete) return;

    const token = localStorage.getItem('authToken');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.delete('http://readersclubapi.runasp.net/api/Profile', { headers })
        .subscribe({
          next: () => {
            alert('تم حذف الحساب بنجاح');
            localStorage.removeItem('authToken');
            window.location.href = '/login'; // أو route حسب مشروعك
          },
          error: (err) => {
            console.error('خطأ في حذف الحساب:', err);
          }
        });
      }
  }


  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedImage = file;
  
      const formData = new FormData();
      formData.append('Image', this.selectedImage);
  
      this.profileService.uploadProfileImage(file).subscribe({
        next: (res: any) => {
          console.log('Response from image upload:', res);
          const imageUrl = 'http://readersclubapi.runasp.net/' + res.imageUrl; // تأكد من تعديل هذا حسب الـ API بتاعك
          
          // حفظ الصورة في الـ localStorage
          localStorage.setItem('userImage', imageUrl);
  
          // تحديث الـ user.image
          this.user.image = imageUrl;
          
          alert('تم تحديث الصورة بنجاح');
        },
        error: (err) => {
          console.error('Upload failed:', err);
          alert('فشل رفع الصورة');
        }
      });
    }
  }


  togglePasswordVisibility() {
    this.passwordVisibility = !this.passwordVisibility;
  }
}
