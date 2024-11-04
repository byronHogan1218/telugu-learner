import { TestBed } from '@angular/core/testing';
import { QuestionComponent } from './question.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(QuestionComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'telugu-learner' title`, () => {
    const fixture = TestBed.createComponent(QuestionComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('telugu-learner');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(QuestionComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, telugu-learner');
  });
});
