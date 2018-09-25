import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Actions } from './stores/launches.store.actions';
import { reducer } from './stores/launches.store.reducer';

@Injectable({
  providedIn: 'root'
})
export class LaunchesStoreService {
  private state = { speed: 0 };
  private state$ = new Subject<any>();

  constructor() {}

  public dispatch = (action: Actions) => {
    this.state = reducer(this.state, action);
    this.state$.next(this.getSnapshot());
  }

  public getSnapshot = () => {
    return { ...this.state };
  }
  public select$ = () => this.state$.asObservable();
}
