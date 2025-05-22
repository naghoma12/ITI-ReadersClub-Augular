import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { VerficationCodeComponent } from './verfication-code/verfication-code.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChannelsComponent } from './channels/channels.component';
import { SavedStoriesComponent } from './saved-stories/saved-stories.component';
import { ChannelDatailsComponent } from './channel-datails/channel-datails.component';
import { ReviewComponent } from './review/review.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'الصفحة الرئيسية',
  },
  {
    path: 'book/:id',
    loadComponent: () =>
      import('./book-details/book-details.component').then(
        (m) => m.BookDetailsComponent
      ),
  },
  
        { path: 'chanels', component: ChannelsComponent },
        { path: 'channel-details/:id', component: ChannelDatailsComponent },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'تسجيل حساب جديد',
  },

  {
    path: 'login',
    component: LoginComponent,
    title: 'تسجيل الدخول',
  },
{
  path: 'profile-update/:id',
  component: ProfileUpdateComponent
},
  {
    path: 'allStories',
    loadComponent: () =>
      import('./all-stories/all-stories.component').then(
        (m) => m.AllStoriesComponent
      ),
  },
   {path: 'forget-password',
    component: ForgetPasswordComponent,
    title: 'نسيت كلمة المرور'
  },
  {
    path: 'varfication-code',
    component: VerficationCodeComponent,
    title: 'التحقق من الرمز'
  },
{
  path: 'profile',
  component: ProfileComponent
},
{
  path: 'reset-password',
  component: ResetPasswordComponent,
  title: 'تغيير كلمة المرور'
},
  { path: 'channels', component: ChannelsComponent },
  { path: 'saved-stories', component: SavedStoriesComponent },
  {path:'comments' ,component:ReviewComponent},
  //Must be the last route in the array
  {
    path: '**',
    component: NotFoundComponent,
    title: '404 Not Found',
  },
  
 
];
