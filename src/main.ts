// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { provideRouter, RouterModule } from '@angular/router';
// import { HomeComponent } from './app/home/home.component';
// import { BookDetailsComponent } from './app/book-details/book-details.component';

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideRouter([
//       { path: '', component: HomeComponent },
//       { path: 'book/:id', component: BookDetailsComponent},
//     ]),
//   ],
// });
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { BookDetailsComponent } from './app/book-details/book-details.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { RegisterComponent } from './app/register/register.component';
import { LoginComponent } from './app/login/login.component';
import { NotFoundComponent } from './app/not-found/not-found.component';
import { AllStoriesComponent } from './app/all-stories/all-stories.component';
import { ForgetPasswordComponent } from './app/forget-password/forget-password.component';
import { VerficationCodeComponent } from './app/verfication-code/verfication-code.component';
import { ResetPasswordComponent } from './app/reset-password/reset-password.component';
import { ChannelsComponent } from './app/channels/channels.component';
import { ChannelComponent } from './app/channel/channel.component';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    provideRouter([
      { path: '', component: HomeComponent },
      { path: 'book/:id', component: BookDetailsComponent },
      {path:'register',component:RegisterComponent},
      {path:'login',component:LoginComponent},
      {path:'allStories',component: AllStoriesComponent},
      {path: 'forget-password', component: ForgetPasswordComponent},
      {path: 'varfication-code', component: VerficationCodeComponent},
      {path : 'reset-password', component: ResetPasswordComponent},
      { path: 'allStories', component: AllStoriesComponent },
      { path: 'chanels', component: ChannelsComponent },
      { path: 'channel/:id', component: ChannelComponent },
      {path:'**', component: NotFoundComponent}
    ]),
    provideHttpClient(),
  ],
});
