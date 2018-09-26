import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IsaActions, IsaActionTypes } from './isa-store.actions';
import { isaStoreReducer } from './isa-store.reducer';
import { Isa, IsaInitial, enTipoCriterio } from './isa.model';

@Injectable({
  providedIn: 'root'
})

export class IsaStore {
  private state: Isa = { ...IsaInitial };

  // Para emitir eventos de carga de cada json
  private statuses$ = new BehaviorSubject<any>(this.state.statuses);
  private agencies$ = new BehaviorSubject<any>(this.state.agencies);
  private missionTypes$ = new BehaviorSubject<any>(this.state.missionTypes);
  private launches$ = new BehaviorSubject<any>(this.state.launches);

  // Para emitir eventos de cambio de tipo de criterio y valores de criterio
  private tipoCriterio$ = new BehaviorSubject<enTipoCriterio>(this.state.tipoCriterio);
  private criterio$ = new BehaviorSubject<string>(this.state.criterio);

  constructor() { }

  public select$ = (slice: IsaSlideTypes) => {
    switch (slice) {
      case IsaSlideTypes.statuses:
      return this.statuses$.asObservable();
      case IsaSlideTypes.agencies:
      return this.agencies$.asObservable();
      case IsaSlideTypes.launches:
        return this.launches$.asObservable();
      case IsaSlideTypes.missionTypes:
        return this.missionTypes$.asObservable();
    }
  }

  public selectSnapShot = (slice: IsaSlideTypes): any[] => {
    switch (slice) {
      case IsaSlideTypes.launches:
        return [...this.state.launches];
      case IsaSlideTypes.statuses:
        return [...this.state.statuses];
      case IsaSlideTypes.agencies:
        return [...this.state.agencies];
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
      case IsaActionTypes.LoadAgencies:
        this.agencies$.next([...this.state.agencies]);
        break;
      case IsaActionTypes.CambioTipoCriterio:
        const t: enTipoCriterio = this.state.tipoCriterio;
        this.tipoCriterio$.next(t);
        break;
      case IsaActionTypes.CambioCritero:
      const c: string = this.state.criterio;
        this.criterio$.next(c);
        break;
    }
  }
}

export enum IsaSlideTypes {
  launches ,
  statuses,
  agencies,
  missionTypes,
  enTipoCriterio,
  criterio
}
