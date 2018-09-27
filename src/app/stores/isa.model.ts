import { Selopt } from './isa.model';
/// ISA is an acronim of International Space Agency (Dedicater to my dear aunt Isabel)

export interface Isa {
  // Valores _cacheados, no expuestos por el store
  _estados: Selopt[];
  _agencias: Selopt[];
  _tiposMision: Selopt[];
  _lanzamientos: Lanzamiento[];
  _tiposCriterios: string[];

  // Valores expuestos por el store
  tipoCriterio: enTipoCriterio;
  criterios: Selopt[];
  lanzamientos: Lanzamiento[];
}

export const IsaInitial: Isa = {
  _estados: [],
  _agencias: [],
  _tiposMision: [],
  _lanzamientos: [],
  _tiposCriterios: [],
  tipoCriterio: null,
  criterios: [],
  lanzamientos: [],
};


export enum enTipoCriterio {
  Estado,
  Agencia,
  TipoMision
}

export interface Selopt {
  value: string;
  viewValue: string;
}

export interface Lanzamiento {
  name: string;
  launchDate: string;
  status: number;
  agencyId: number;
  missionType: number;
}

