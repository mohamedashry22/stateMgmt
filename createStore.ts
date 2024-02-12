import createFeature, { Actions } from "./createFeature";
import { State } from './createFeature';


const createStore = (
  features: Record<string, { state: State; actions: Actions<State> }>
) => {
  let store: Record<string, any> = {};

  for (let featureName in features) {
    const { state, actions } = features[featureName];
    store[featureName] = createFeature(state, actions);
  }

  return store;
};

export default createStore;
