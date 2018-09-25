import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IsaActions, IsaActionTypes } from './isa-store.actions';
import { isaStoreReducer } from './isa-store.reducer';
import { Isa, IsaInitial } from './isa.model';

@Injectable({
  providedIn: 'root'
})

export class IsaStore {
  private state: Isa = { ...IsaInitial };
  private launches$ = new BehaviorSubject<any>(this.state.launches);
  private statuses$ = new BehaviorSubject<any>(this.state.statuses);
  private favorites$ = new BehaviorSubject<any>(this.state.favorites);

  constructor() {}

  public select$ = (slice: IsaSlideTypes) => {
    switch (slice) {
      case IsaSlideTypes.launches:
        return this.launches$.asObservable();
      case IsaSlideTypes.statuses:
        return this.statuses$.asObservable();
      case IsaSlideTypes.favorites:
        return this.favorites$.asObservable();
    }
  }

  public selectSnapShot = (slice: IsaSlideTypes) => {
    switch (slice) {
      case IsaSlideTypes.launches:
        return [...this.state.launches];
      case IsaSlideTypes.statuses:
        return [...this.state.statuses];
      case IsaSlideTypes.favorites:
        return [...this.state.favorites];
    }
  }

  public dispatch = (action: IsaActions) => {
    console.log('dispatching...', action);
    this.state = isaStoreReducer(this.state, action);
    switch (action.type) {
      case IsaActionTypes.LoadLaunches:
        this.launches$.next([...this.state.launches]);
        break;
      case IsaActionTypes.LoadStatuses:
        this.statuses$.next([...this.state.statuses]);
        break;
      case IsaActionTypes.LoadFavorites:
        this.favorites$.next([...this.state.favorites]);
        break;
    }
  }
}

export enum IsaSlideTypes {
  launches = 'launches',
  statuses = 'statuses',
  favorites = 'favorites'
}
