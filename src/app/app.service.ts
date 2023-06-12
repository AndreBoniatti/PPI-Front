import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Questions } from './Shared/Interfaces/Questions';
import { CreateQuestions } from './Shared/Interfaces/CreateQuestions';
import { Pagination } from './Shared/Interfaces/Pagination';
import { DisplayQuestion } from './Shared/Interfaces/DisplayQuestion';

const BASE_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  generateQuestions(
    quantity: number,
    subject: string,
    difficulty: string
  ): Observable<Questions> {
    return this.http
      .get<Questions>(
        `${BASE_URL}/ChatGPT/ChatCompletion?quantity=${quantity}&subject=${subject}&difficulty=${difficulty}`
      )
      .pipe(take(1));
  }

  getQuestions(
    pageIndex: number,
    pageSize: number,
    filter?: string,
    subject?: number,
    difficulty?: number
  ): Observable<Pagination<DisplayQuestion>> {
    let url = `${BASE_URL}/ChatGPT/Question?pageIndex=${pageIndex}&pageSize=${pageSize}`;

    if (filter) url += `&filter=${filter}`;
    if (subject || subject === 0) url += `&subject=${subject}`;
    if (difficulty || difficulty === 0) url += `&difficulty=${difficulty}`;

    return this.http.get<Pagination<DisplayQuestion>>(url).pipe(take(1));
  }

  saveQuestions(data: CreateQuestions): Observable<any> {
    return this.http.post(`${BASE_URL}/ChatGPT/Question`, data).pipe(take(1));
  }

  deleteQuestion(id: string): Observable<any> {
    return this.http
      .put(`${BASE_URL}/ChatGPT/Question/${id}`, null)
      .pipe(take(1));
  }
}
