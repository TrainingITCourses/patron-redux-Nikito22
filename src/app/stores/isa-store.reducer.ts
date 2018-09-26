import { IsaActions, IsaActionTypes } from './isa-store.actions';
import { Isa, IsaInitial } from './isa.model';

export function isaStoreReducer(
  state = IsaInitial,
  action: IsaActions
): Isa {
  const result = { ...state };
  switch (action.type) {
    case IsaActionTypes.LoadLaunches:
      result.launches = action.payload.map(d => ({
        name: d.name, launchDate: d.net, status: d.status, agencyId: d.rocket.agency[0].id, missionType: d.missions[0].type
      }));
      break;

    case IsaActionTypes.LoadStatuses:
      result.statuses = action.payload.map(d => ({
        value: d.id, viewValue: d.id + ' - ' + d.description + ' (' + d.name + ')'
      }));
      break;

    case IsaActionTypes.LoadAgencies:
      result.agencies = action.payload.map(d => ({
        value: d.id, viewValue: d.id + ' - ' + d.name
      }));
      break;

    case IsaActionTypes.LoadMissionTypes:
      result.missionTypes = action.payload.map(d => ({
        value: d.id, viewValue: d.id + ' - ' + d.name
      }));
      break;

    case IsaActionTypes.CambioTipoCriterio:
      result.tipoCriterio = action.payload;
      break;

    case IsaActionTypes.CambioCritero:
      result.criterio = action.payload;
      break;
  }
  return result;
}

