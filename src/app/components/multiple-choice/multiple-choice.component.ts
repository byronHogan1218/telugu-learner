import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  OnInit,
  output,
  QueryList,
  signal,
  ViewChildren,
  WritableSignal
} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Question} from '../../models/question/question.type';
import {MatDivider} from '@angular/material/divider';
import {MatCheckbox, MatCheckboxChange} from '@angular/material/checkbox';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatRadioButton, MatRadioChange, MatRadioGroup} from '@angular/material/radio';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'll-multiple-choice',
  standalone: true,
  imports: [RouterOutlet, MatDivider, MatCheckbox, MatButton, ReactiveFormsModule, MatRadioButton, MatRadioGroup],
  templateUrl: './multiple-choice.component.html',
  styleUrl: './multiple-choice.component.scss'
})
export class MultipleChoiceComponent implements OnInit {
  public myForm: FormGroup;

  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef> | undefined;
  public shouldShowAnswer = signal(false)
  public hintIndex = signal(0)
  public activeHints: WritableSignal<{ index: number, text: string }[]> = signal([])
  public done = output<void>();

  public inputQuestion = input.required<Question>()
  public data = computed(() => {
    const data = this.inputQuestion().multipleChoiceQuestionData
    const randomizedChoices = this.randomizeArrayWithIndices(data.choices);
    return {
      ...data,
      choices: randomizedChoices
    }
  })
  public hasMultipleAnswers = computed(() => this.data().answerIndexes.length > 1)
  public hasHint = computed(() => this.inputQuestion().hint.length > 0 && this.hintIndex() < this.inputQuestion().hint.length)
  private formBuilder = inject(FormBuilder)
  private snackBarService = inject(MatSnackBar);

  public constructor() {
    this.myForm = this.formBuilder.group({});
  }

  public ngOnInit(): void {
    for (const choice of this.data().choices) {
      this.myForm.addControl(choice.value.id.toString(), new FormControl<boolean>(false))
    }
  }

  public getAnswersAsString(): string {
    const answerIndexArray: number[] = this.data().answerIndexes
    const answersText: string[] = [];
    for (const answerIndex of answerIndexArray) {
      const correctAnswer = this.data().choices.find((choice) => choice.value.id === answerIndex)
      const answerText = correctAnswer?.value.text
      if (answerText === undefined) {
        throw new Error('We did not find the proper answer text. It cannot be shown')
      }
      answersText.push(answerText)
    }
    return answersText.map((value) => value.toString()).join(', ')
  }

  public onSubmit() {
    const controlValues: boolean[] = []
    const answerArray: number[] = this.data().answerIndexes
    Object.values(this.myForm.controls).forEach((control) => {
      controlValues.push(control.value)
    })
    const amountTrue = controlValues.filter((value) => (value)).length

    if (amountTrue !== answerArray.length) {
      if(amountTrue > answerArray.length) {
        this.openSnackBar('Too many selected answers ❌')
      } else {
        this.openSnackBar('Too few selected answers ❌')
      }
      return
    }

    for (let i = 0; i < controlValues.length; i++) {
      const expectedValue = answerArray.includes(i);
      if (controlValues[i] !== expectedValue) {
        this.resetCheckboxes()
        this.openSnackBar('Incorrect answer selected ❌')
        return
      }
    }

    this.openSnackBar('Correct answer selected ✅')
    this.shouldShowAnswer.set(false)
    this.hintIndex.set(0)
    this.activeHints.set([])
    this.resetCheckboxes()
    this.done.emit();
  }

  private resetCheckboxes(): void {
    for (const control of Object.values(this.myForm.controls)) {
      control.setValue(false)
    }
    this.checkboxes?.forEach((element: ElementRef<MatCheckbox>) => {
      // This is a MatCheckbox under the hood so we can access the checked property here
      (element as any).checked = false;
    });
  }

  updateState(event: MatCheckboxChange | MatRadioChange, id: number) {
    if (event instanceof MatCheckboxChange) {
      this.myForm.controls[id.toString()].setValue(event.checked)
    } else {
      for (const control of Object.values(this.myForm.controls)) {
        control.setValue(false)
      }
      this.myForm.controls[id.toString()].setValue(true)
    }
  }

  public showAnswer(): void {
    this.shouldShowAnswer.set(!this.shouldShowAnswer())
  }

  public showHint(): void {
    const nextHint = this.inputQuestion().hint[this.hintIndex()]
    this.activeHints.set([{index: this.hintIndex(), text: nextHint}, ...this.activeHints()])
    this.hintIndex.set(this.hintIndex() + 1)
  }

  private openSnackBar(message: string, action?: string) {
    this.snackBarService.open(message, action, {duration: 2000});
  }

  private randomizeArrayWithIndices<T>(array: T[]): { originalIndex: number, value: T }[] {
    const randomizedArray = [...array]; // Create a copy to avoid modifying the original

    // Fisher-Yates shuffle algorithm
    for (let i = randomizedArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomizedArray[i], randomizedArray[j]] = [randomizedArray[j], randomizedArray[i]];
    }

    return randomizedArray.map((value,
                                index) => ({originalIndex: index, value}));
  }
}
