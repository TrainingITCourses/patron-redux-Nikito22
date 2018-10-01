/// ISA is an acronim of International Space Agency (Dedicater to my dear aunt Isabel)
export interface ICache {
  estados: Selopt[];
  agencias: Selopt[];
  tiposMision: Selopt[];
  lanzamientos: Lanzamiento[];
}

export interface Isa {
  // Valores _cacheados, para evitar copiarlos en la funcion reduce
  cache: ICache;
  cargado: boolean;
  // Valores expuestos por el store
  tipoCriterio: enTipoCriterio;
  criterios: Selopt[];
  lanzamientos: Lanzamiento[];
}

export const IsaInitial: Isa = {
  cache: {
    estados: [],
    agencias: [],
    tiposMision: [],
    lanzamientos: []
  },
  cargado: false,
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

