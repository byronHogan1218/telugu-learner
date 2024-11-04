import {Component, computed, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {Question, QuestionType} from '../../models/question/question';
import {MultipleChoiceComponent} from '../multiple-choice/multiple-choice.component';
import {QuestionService} from '../../services/question.service';
import {routeNames} from '../../app.routes';
import {getRandomInt, HomeComponent} from '../home/home.component';

@Component({
  selector: 'll-question',
  standalone: true,
  imports: [RouterOutlet, MultipleChoiceComponent],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent implements OnInit {

  private router = inject(Router);
  private route = inject(ActivatedRoute)
  private questionId: number | undefined
  protected readonly QuestionType = QuestionType;
  private questionService = inject(QuestionService);

  public question: WritableSignal<Question | undefined> = signal(undefined);
  public definedQuestion = computed(() => this.question() || new Question());

  public ngOnInit(): void {
    const possibleId =this.route.snapshot.paramMap.get('id');
    if(!possibleId){
      // TODO: create error page saying id not found
    }
    const possibleNumber = Number(possibleId);
    if(Number.isNaN(possibleNumber)){
      // TODO: create error page saying id not found
    }
    this.questionId = possibleNumber;
    this.question.set(this.questionService.getQuestion(this.questionId));
    console.log('saved id is', this.questionId);
  }

  public handleQuestionEnd(): void {
    let newId = HomeComponent.proceedRandomly ? getRandomInt(1, this.questionService.getQuestionLength()) : this.questionId! + 1;
    while (newId === this.questionId) {
      newId = getRandomInt(1, this.questionService.getQuestionLength());
    }
    this.questionId = newId;
    console.log('randomly picking', HomeComponent.proceedRandomly, 'new id is', this.questionId);
    if(this.questionId > this.questionService.getQuestionLength()) {
      this.questionId = 1;
    }
    this.router.navigate([routeNames.question, this.questionId]);
    this.question.set(this.questionService.getQuestion(this.questionId));
  }
}
