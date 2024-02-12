import { produce, Draft } from "immer";

export type State = Record<string, any>;
export type AsyncAction<S extends State> = (
  state: S,
  ...args: any[]
) => Promise<S | void>;
export type Actions<S extends State> = Record<string, AsyncAction<S>>;

export interface Feature<S extends State> {
  state: S;
  actions: Actions<S>;
  loading: boolean;
  error: Error | null;
}

const createFeature = <S extends State>(
  initialState: S,
  actions: Actions<S>,
): S & Actions<S> => {
  let state = initialState;
  let loading = false;
  let error: Error | null = null;

  const boundActions: Actions<S> = {} as Actions<S>;
  for (const actionName in actions) {
    boundActions[actionName] = async (...args: any[]) => {
      try {
        loading = true;
        error = null;

        const result = await actions[actionName](state, ...args);

        state = produce(state, (draft: Draft<S>) => {
          if (result != null) {
            Object.assign(draft, result);
          }
        });
      } catch (err) {
        error = err as Error;
      } finally {
        loading = false;
      }

      return state;
    };
  }

  return {
    ...state,
    ...boundActions,
    loading,
    error,
  };
};

export default createFeature;
