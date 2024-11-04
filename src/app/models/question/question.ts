
export type MultipleChoiceOption = {
  question: string;
  choices: {
    id: number,
    text: string,
    pronunciation?: string;
  }[];
  pronunciation?: string;
  answerIndexes: number[];
}
export type MatchingOption = {
  english: string;
  telugu: string;
  pronunciation: string;
}

export type FillInTheBlankOption = {
  question: string;
  answer: string;
  pronunciation?: string;
}

export type Data = MultipleChoiceOption | MatchingOption[] | FillInTheBlankOption

export enum QuestionType {
  multipleChoice = 'multipleChoice',
  fillInTheBlank = 'fillInTheBlank',
  matching = 'matching'
}
export type QuestionData = {
  questionType: QuestionType
  questionData: Data;
  hint?: string | string[];
  explanation?: string;
}

export class Question {
  private _id: number;
  private _questionType: QuestionType
  private _questionData: Data;
  private _hint:  string[];
  private _explanation?: string;

  constructor(id?: number, questionData?: QuestionData) {
    if( id === undefined || questionData === undefined ) {
      throw new Error('Invalid question');
    }
    this._id = id;
    this._questionType = questionData.questionType;
    this._questionData = questionData.questionData;
    if(questionData.hint) {
      this._hint = !Array.isArray(questionData.hint) ? [questionData.hint] as string[] : questionData.hint as string[];
    } else {
      this._hint = []
    }
    this._explanation = questionData.explanation;
  }

  public get questionType(): QuestionType {
    return this._questionType;
  }


  public get id(): number {
    return this._id;
  }

  public get questionData(): Data {
    return this._questionData;
  }

  public get multipleChoiceQuestionData(): MultipleChoiceOption {
    if(!this.isMultipleChoice()) {
      throw new Error('Not a multiple choice question');
    }
    return this._questionData as MultipleChoiceOption;
  }

  public get hint(): string[] {
    return this._hint;
  }

  public get explanation(): string | undefined {
    return this._explanation;
  }


  public isMultipleChoice(): boolean {
    return this.questionType === QuestionType.multipleChoice;
  }

  public isFillInTheBlank(): boolean {
    return this.questionType === QuestionType.fillInTheBlank;
  }

  public isMatching(): boolean {
    return this.questionType === QuestionType.matching;
  }

}
