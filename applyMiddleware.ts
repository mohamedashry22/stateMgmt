import { State, Actions } from './createFeature';

type Middleware<S extends State> = (actionName: string, state: S, ...args: unknown[]) => void;

const applyMiddleware = <S extends State>(middleware: Middleware<S>, store: Record<string, { state: S, actions: Actions<S> }>) => {
  for (const featureName in store) {
    const feature = store[featureName];
    for (const actionName in feature.actions) {
      const originalAction = feature.actions[actionName];
      feature.actions[actionName] = async (...args: unknown[]) => {
        const result = await originalAction(feature.state, ...args);
        middleware(actionName, feature.state, ...args);
        return result;
      };
    }
  }
};

export default applyMiddleware;