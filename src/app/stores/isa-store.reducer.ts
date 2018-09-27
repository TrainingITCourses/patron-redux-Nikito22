import { IsaActions, IsaActionTypes } from './isa-store.actions';
import { Isa, IsaInitial, enTipoCriterio } from './isa.model';

interface Mission {
  type: number;
}
interface Agency {
  id: number;
}
interface Rocket {
  agencies: Agency[];
}

export function isaStoreReducer(
  state = IsaInitial,
  action: IsaActions
): Isa {
  const result = { ...state };

  switch (action.type) {

    case IsaActionTypes.CambioTipoCriterio:

      result.tipoCriterio = action.payload;
      switch (action.payload) {
        case enTipoCriterio.Estado:
          result.criterios = result._estados;
          break;

        case enTipoCriterio.Agencia:
          result.criterios = result._agencias;
          break;

        case enTipoCriterio.TipoMision:
          result.criterios = result._tiposMision;
          break;
      }
      console.log('Asignados criterios ' + enTipoCriterio[action.payload]);
      break;

    case IsaActionTypes.CambioCritero:
      switch (result.tipoCriterio) {
        case enTipoCriterio.Estado:
          result.lanzamientos = result._lanzamientos.filter(l => l.status === Number(action.payload));
          break;

        case enTipoCriterio.Agencia:
          result.lanzamientos = result._lanzamientos.filter(l => l.agencyId === Number(action.payload));
          break;

        case enTipoCriterio.TipoMision:
          result.lanzamientos = result._lanzamientos.filter(l => l.missionType === Number(action.payload));
          break;
      }
      console.log(`Asignado ${result.lanzamientos.length} lanzamientos del tipoCriterio:
          ${enTipoCriterio[result.tipoCriterio]} criterio: ${action.payload}`);
      break;
  }
  return result;
}
