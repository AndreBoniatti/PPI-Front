import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewQuestionComponent } from './new-question/new-question.component';
import { SpinnerService } from './Shared/Services/spinner.service';
import { QuestionsComponent } from './questions/questions.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private spinnerService: SpinnerService
  ) {}

  spinnerActive: boolean = false;

  ngOnInit(): void {
    this.spinnerService.getSpinner().subscribe({
      next: (active: boolean) => (this.spinnerActive = active),
    });
  }

  openNewQuestionDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(NewQuestionComponent, {
      width: '75%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openQuestionsDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(QuestionsComponent, {
      width: '75%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
