import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { AppService } from '../app.service';
import { Pagination } from '../Shared/Interfaces/Pagination';
import { DisplayQuestion } from '../Shared/Interfaces/DisplayQuestion';
import { SUBJECTS } from '../Shared/Constants/subjects';
import { DIFFICULTIES } from '../Shared/Constants/difficulties';
import { ViewQuestionComponent } from '../view-question/view-question.component';
import { Subject } from '../Shared/Interfaces/Subject';
import { Difficulty } from '../Shared/Interfaces/Difficulty';
import { Debounce } from '../Shared/Utils/Debounce';

@Component({
  templateUrl: 'questions.component.html',
  styleUrls: ['questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<QuestionsComponent>,
    private appService: AppService
  ) {}

  subjects: Subject[] = SUBJECTS;
  difficulties: Difficulty[] = DIFFICULTIES;

  questionFilter = '';
  subjectFilter!: number;
  difficultyFilter!: number;

  displayedColumns: string[] = ['actions', 'subject', 'difficulty', 'content'];

  questions: Pagination<DisplayQuestion> = {
    data: [],
    count: 0,
  };

  ngOnInit(): void {
    this.getQuestions(0, 10);
  }

  @Debounce(500)
  getQuestions(pageIndex: number, pageSize: number): void {
    this.appService
      .getQuestions(
        pageIndex,
        pageSize,
        this.questionFilter,
        this.subjectFilter,
        this.difficultyFilter
      )
      .subscribe({
        next: (res) => (this.questions = res),
      });
  }

  questionsPagination(event?: PageEvent) {
    let pageSize = 10;
    let pageIndex = 0;

    if (event !== undefined && event !== null) {
      pageSize = event.pageSize;
      pageIndex = event.pageIndex;
    }

    this.getQuestions(pageIndex, pageSize);
  }

  openViewQuestionDialog(
    question: DisplayQuestion,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(ViewQuestionComponent, {
      width: '75%',
      data: question,
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  deleteQuestion(id: string): void {
    this.appService.deleteQuestion(id).subscribe({
      next: () => {
        this.questionsPagination();
        alert('Questão removida com sucesso');
      },
      error: (error) => console.error(error),
    });
  }

  getSubjectAsString(value: number): string {
    const subject = SUBJECTS.find((x) => x.value === value)?.viewValue;
    return String(subject);
  }

  getDifficultyAsString(value: number): string {
    const difficulty = DIFFICULTIES.find((x) => x.value === value)?.viewValue;
    return String(difficulty);
  }
}
