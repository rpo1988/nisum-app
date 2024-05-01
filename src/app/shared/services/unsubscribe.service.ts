import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnsubscribeService {

  constructor() { }

  unsubscribe(subject: Subject<void>): void {
    subject.next();
    subject.complete();
    subject.unsubscribe();
 }
}
