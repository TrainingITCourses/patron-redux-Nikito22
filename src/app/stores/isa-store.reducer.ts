import { IsaActions, IsaActionTypes } from './isa-store.actions';
import { Isa, IsaInitial } from './isa.model';

export function isaStoreReducer(
  state = IsaInitial,
  action: IsaActions
): Isa {
  const result = { ...state };
  switch (action.type) {
    case IsaActionTypes.LoadLaunches:
      result.launches = action.payload;
      break;
    case IsaActionTypes.LoadStatuses:
      result.statuses = action.payload;
      break;
    case IsaActionTypes.LoadFavorites:
      result.favorites = action.payload;
      break;
  }
  return result;
}
