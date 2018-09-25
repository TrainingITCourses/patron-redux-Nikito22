import { Actions, ActionTypes } from './stores/launches.store.actions';
export function reducer(state: any, action: Actions): any {
  const result = { ...state };
  switch (action.type) {
    case ActionTypes.break:
      result.speed = result.speed - action.payload;
      break;
    case ActionTypes.throttle:
      result.speed = result.speed + action.payload;
      break;
    default:
      break;
  }
  return result;
}
