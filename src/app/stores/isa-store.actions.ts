import { enTipoCriterio, Selopt, Lanzamiento } from './isa.model';

export enum IsaActionTypes {
  LoadLaunches,
  LoadStatuses,
  LoadAgencies,
  LoadMissionTypes,
  CambioTipoCriterio,
  CambioCritero
}

export interface Action {
  readonly type: IsaActionTypes;
  readonly payload: any;
}

export class LoadLaunches implements Action {
  public readonly type = IsaActionTypes.LoadLaunches;
  constructor(public readonly payload: any[]) { }
}

export class LoadStatuses implements Action {
  public readonly type = IsaActionTypes.LoadStatuses;
  constructor(public readonly payload: any[]) { }
}

export class LoadAgencies implements Action {
  public readonly type = IsaActionTypes.LoadAgencies;
  constructor(public readonly payload: any[]) { }
}

export class LoadMissionTypes implements Action {
  public readonly type = IsaActionTypes.LoadMissionTypes;
  constructor(public readonly payload: any[]) { }
}

export class CambioTipoCriterio implements Action {
  public readonly type = IsaActionTypes.CambioTipoCriterio;
  constructor(public readonly payload: enTipoCriterio) { }
}
export class CambioCriterio implements Action {
  public readonly type = IsaActionTypes.CambioCritero;
  constructor(public readonly payload: string) { }
}

export type IsaActions = LoadLaunches | LoadStatuses | LoadAgencies |
   LoadMissionTypes |CambioTipoCriterio | CambioCriterio ;
