import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

import 'rxjs/add/operator/delay';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Observable<Leader[]> {
    return of(LEADERS).delay(2000);
  }

  getleader(id: number): Observable<Leader> {
    return of(LEADERS.filter((leader) => (leader.id === id))[0]).delay(2000);
  }

  getFeaturedLeader(): Observable<Leader> {
    return of(LEADERS.filter((leader) => leader.featured)[0]).delay(2000);
  }

}
