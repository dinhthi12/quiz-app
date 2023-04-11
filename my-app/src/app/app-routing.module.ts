import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { QuizPhpComponent } from './quiz-php/quiz-php.component';
import { QuizQuestionComponent } from './quiz-question/quiz-question.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { ContentComponent } from './component/content/content.component';
const routes: Routes = [

  {path:'home/quiz/:id',component: QuizQuestionComponent},
  {path:'register',component: RegisterComponent},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'content',component: ContentComponent},

  { path: '**', component: PageNotFoundComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
