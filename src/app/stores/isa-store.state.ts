import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { IsaActions, IsaActionTypes } from './isa-store.actions';
import { isaStoreReducer } from './isa-store.reducer';
import { Isa, IsaInitial, Lanzamiento, enTipoCriterio } from './isa.model';
import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class IsaStore {
  private state: Isa = { ...IsaInitial };

  // Para emitir eventos cuando cambien los valores de los criterios y los lanzamientos filtrados
  private criterios$ = new BehaviorSubject<any>(this.state.criterios);
  private lanzamientos$ = new BehaviorSubject<any>(this.state.lanzamientos);

  constructor(public http: HttpClient) {

    forkJoin([
      http.get('/assets/launchstatus.json'),
      http.get('/assets/launchagencies.json'),
      http.get('/assets/launchmissions.json'),
      http.get('/assets/launchlibrary.json')
    ]).
      pipe(
        delay(200) // Imitamos una cierta demora si viniera de un WebService externo
      ).subscribe((results: any[]) => {
        // Ya que solo necesitamos ciertos campos, mapeamos los resultados para reducir el consumo de memoria
        this.state._estados = results[0].types.map(d => ({
          value: d.id, viewValue: d.id + ' - ' + d.description + ' (' + d.name + ')'
        }));
        this.state._agencias = results[1].agencies.map(d => ({
          value: d.id, viewValue: d.id + ' - ' + d.name
        }));
        this.state._tiposMision = results[2].types.map(d => ({
          value: d.id, viewValue: d.id + ' - ' + d.name
        }));

        this.state._lanzamientos = results[3].launches.map(d => ({
          name: d.name
          , launchDate: d.net
          , status: d.status
          , agencyId: d.rocket ? d.rocket.agencies ? d.rocket.agencies.length > 0 ? d.rocket.agencies[0].id : 0 : 0 : 0
          , missionType: d.missions ? d.missions.length > 0 ? d.missions[0].type : 0 : 0
        }));
        console.log(this.state._lanzamientos[0]);
        console.log('Store inicializado con los json mapeados (reducidos) y listos para su consumo');
      });
    this.state._tiposCriterios = Object.keys(enTipoCriterio).slice(Object.keys(enTipoCriterio).length / 2);
  }

  public select$ = (slice: IsaSlideTypes) => {
    switch (slice) {
      case IsaSlideTypes.criterios:
        return this.criterios$.asObservable();
      case IsaSlideTypes.lanzamientos:
        return this.lanzamientos$.asObservable();
    }
  }

  public selectSnapShot = (slice: IsaSlideTypes): any[] => {
    switch (slice) {
      case IsaSlideTypes.criterios:
        return [...this.state.criterios];
        break;
      case IsaSlideTypes.lanzamientos:
        return [...this.state.lanzamientos];
        break;
      case IsaSlideTypes.tiposCriterios:
        return [...this.state._tiposCriterios];
        break;
    }
  }

  public dispatch = (action: IsaActions) => {
    console.log('dispatching...', action);
    this.state = isaStoreReducer(this.state, action);
    switch (action.type) {

      case IsaActionTypes.CambioTipoCriterio:
        this.criterios$.next([...this.state.criterios]);
        break;

      case IsaActionTypes.CambioCritero:
        this.lanzamientos$.next([...this.state.lanzamientos]);
        break;
    }
  }
}

export enum IsaSlideTypes {
  tiposCriterios,
  criterios,
  lanzamientos
}
