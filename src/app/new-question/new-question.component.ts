import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from '../Shared/Interfaces/Subject';
import { Difficulty } from '../Shared/Interfaces/Difficulty';
import { AppService } from '../app.service';
import { SpinnerService } from '../Shared/Services/spinner.service';
import { Question } from '../Shared/Interfaces/Questions';
import { CreateQuestions } from '../Shared/Interfaces/CreateQuestions';
import { SUBJECTS } from '../Shared/Constants/subjects';
import { DIFFICULTIES } from '../Shared/Constants/difficulties';

@Component({
  templateUrl: 'new-question.component.html',
  styleUrls: ['new-question.component.css'],
})
export class NewQuestionComponent {
  constructor(
    public dialogRef: MatDialogRef<NewQuestionComponent>,
    private spinnerService: SpinnerService,
    private appService: AppService
  ) {}

  questions: Question[] = [];
  subjects: Subject[] = SUBJECTS;
  difficulties: Difficulty[] = DIFFICULTIES;

  quantityFormControl = new FormControl(2, [
    Validators.required,
    Validators.min(2),
    Validators.max(10),
  ]);
  subjectFormControl = new FormControl('', Validators.required);
  difficultyFormControl = new FormControl('', Validators.required);

  generateQuestions(): void {
    if (!this.formIsValid()) return alert('Formulário inválido');

    this.spinnerService.show();

    const quantity = this.quantityFormControl.value;

    const subject = this.subjects.find(
      (x) => x.value === Number(this.subjectFormControl.value)
    )?.viewValue;

    const difficulty = this.difficulties.find(
      (x) => x.value === Number(this.difficultyFormControl.value)
    )?.viewValue;

    this.appService
      .generateQuestions(Number(quantity), String(subject), String(difficulty))
      .subscribe({
        next: (res) => {
          this.quantityFormControl.disable();
          this.subjectFormControl.disable();
          this.difficultyFormControl.disable();

          this.questions = res.questions;
        },
        error: (error) => console.error(error),
        complete: () => this.spinnerService.hide(),
      });
  }

  deleteQuestion(index: number): void {
    if (index >= 0 && index < this.questions.length) {
      this.questions.splice(index, 1);
    }
  }

  saveQuestions(): void {
    this.spinnerService.show();

    const subject = this.subjectFormControl.value;
    const difficulty = this.difficultyFormControl.value;

    const data: CreateQuestions = {
      questions: this.questions,
      subject: Number(subject),
      difficulty: Number(difficulty),
    };

    this.appService.saveQuestions(data).subscribe({
      next: () => alert('Questões salvas com sucesso'),
      error: (error) => console.error(error),
      complete: () => {
        this.dialogRef.close();
        this.spinnerService.hide();
      },
    });
  }

  private formIsValid(): boolean {
    return (
      this.quantityFormControl.valid &&
      this.subjectFormControl.valid &&
      this.subjectFormControl.valid
    );
  }
}
