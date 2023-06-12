import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Question } from '../Shared/Interfaces/Questions';

@Component({
  templateUrl: 'view-question.component.html',
  styleUrls: ['view-question.component.css'],
})
export class ViewQuestionComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public question: Question
  ) {}
}
