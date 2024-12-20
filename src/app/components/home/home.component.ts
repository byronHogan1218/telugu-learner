import {Component, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {routeNames} from '../../app.routes';
import { QuestionService } from '../../services/question.service';
import {MatDivider} from '@angular/material/divider';

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

@Component({
  selector: 'll-home',
  standalone: true,
  imports: [RouterOutlet, MatButton, MatDivider],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private router = inject(Router);
  private questionService = inject(QuestionService);

  public static proceedRandomly = false

  public goToQuestion():void {
    HomeComponent.proceedRandomly = false;
    this.router.navigate([routeNames.question, 1]);
  }

  public start(): void {
    HomeComponent.proceedRandomly = false;
    this.router.navigate([routeNames.question, getRandomInt(1, this.questionService.getQuestionLength() +1)]);
  }

  public startRandom(): void {
    HomeComponent.proceedRandomly = true;
    this.router.navigate([routeNames.question, getRandomInt(1, this.questionService.getQuestionLength())]);
  }
}
