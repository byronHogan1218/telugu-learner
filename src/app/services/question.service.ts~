import { Injectable } from '@angular/core';
import {Question, QuestionData} from '../models/question/question';
import {data} from '../data/questions';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private data: QuestionData[] = data

  constructor() { }

  public getQuestion(questionId: number): Question {
    if(questionId < 1 || questionId > this.data.length) {
      throw new Error(`Invalid question id "${questionId}". Must be between 1 and ${this.data.length}.`);
    }
    const zeroBasedQuestionId = questionId - 1;
    const questionData = this.data[zeroBasedQuestionId];
    return new Question(zeroBasedQuestionId,questionData);
  }

  public getQuestionLength(): number {
    return this.data.length
  }
}
