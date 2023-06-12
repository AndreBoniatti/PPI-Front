export interface Questions {
  questions: Question[];
}

export interface Question {
  content: string;
  answers: Answer[];
}

export interface Answer {
  content: string;
  correct: boolean;
}
