import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {QuestionComponent} from './components/question/question.component';

export const routeNames = {
  home: 'home',
  question: 'question'
}

export const routes: Routes = [
  { path: routeNames.home, component: HomeComponent },
  { path: `${routeNames.question}/:id`, component: QuestionComponent },
  { path: '', redirectTo: routeNames.home, pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
