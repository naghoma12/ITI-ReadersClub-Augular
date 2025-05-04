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
import { ChannelComponent } from './channel/channel.component';

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
        { path: 'channel/:id', component: ChannelComponent },
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
  path: 'reset-password',
  component: ResetPasswordComponent,
  title: 'تغيير كلمة المرور'
},
  { path: 'channels', component: ChannelsComponent },
  //Must be the last route in the array
  {
    path: '**',
    component: NotFoundComponent,
    title: '404 Not Found',
  },
  { path: 'saved-stories', component: SavedStoriesComponent },
];
