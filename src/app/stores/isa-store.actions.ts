export enum IsaActionTypes {
  LoadLaunches = 'LoadLaunches',
  LoadStatuses = 'LoadStatuses',
  LoadFavorites = 'LoadFavorites'
}

export interface Action {
  readonly type: IsaActionTypes;
  readonly payload: any;
}

export class LoadLaunches implements Action {
  public readonly type = IsaActionTypes.LoadLaunches;
  constructor(public readonly payload: any[]) {}
}

export class LoadStatuses implements Action {
  public readonly type = IsaActionTypes.LoadStatuses;
  constructor(public readonly payload: any[]) {}
}

export class LoadFavorites implements Action {
  public readonly type = IsaActionTypes.LoadFavorites;
  constructor(public readonly payload: any[]) {}
}

export type IsaActions = LoadLaunches | LoadStatuses | LoadFavorites;
