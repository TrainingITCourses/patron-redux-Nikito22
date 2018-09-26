import { Selopt } from './isa.model';
/// ISA is an acronim of International Space Agency (Dedicater to my dear aunt Isabel)

export interface Isa {
  launches: Lanzamiento[];
  statuses: Selopt[];
  agencies: Selopt[];
  missionTypes: Selopt[];
  tipoCriterio: enTipoCriterio;
  criterio: string;
}

export const IsaInitial: Isa = {
  launches: [],
  statuses: [],
  agencies: [],
  missionTypes: [],
  tipoCriterio: null,
  criterio: null
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

export interface Mission {
  type: number;
}
export interface Agency {
  id: number;
}
export interface Rocket {
  agencies: Agency[];
}

export interface Lanzamiento {
  name: string;
  launchDate: string;
  status: number;
  agencyId: string;
  missionType: number;
}

