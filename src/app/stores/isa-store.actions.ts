import { enTipoCriterio, Selopt, Lanzamiento } from './isa.model';

export enum IsaActionTypes {
  CambioTipoCriterio,
  CambioCritero
}

export interface Action {
  readonly type: IsaActionTypes;
  readonly payload?: any;
}

export class CambioTipoCriterio implements Action {
  public readonly type = IsaActionTypes.CambioTipoCriterio;
  constructor(public readonly payload: enTipoCriterio) { }
}

export class CambioCritero implements Action {
  public readonly type = IsaActionTypes.CambioCritero;
  constructor(public readonly payload: string) { }
}

export type IsaActions = CambioTipoCriterio | CambioCritero;
