import { Answer } from './Questions';

export interface DisplayQuestion {
  id: string;
  content: string;
  subject: number;
  difficulty: number;
  answers: Answer[];
}
