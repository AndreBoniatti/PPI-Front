import { Question } from './Questions';

export interface CreateQuestions {
  questions: Question[];
  subject: number;
  difficulty: number;
}
