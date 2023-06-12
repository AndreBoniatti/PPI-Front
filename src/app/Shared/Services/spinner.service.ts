import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  spinner$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  show(): void {
    this.spinner$.next(true);
  }

  hide(): void {
    this.spinner$.next(false);
  }

  getSpinner(): Observable<boolean> {
    return this.spinner$.asObservable();
  }
}
