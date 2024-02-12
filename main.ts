import createStore from "./createStore";
import applyMiddleware from "./applyMiddleware";
import { State } from "./createFeature";

const loggingMiddleware = (actionName: string, state: any, ...args: any[]) => {
  console.log(`Action ${actionName} was called with `, args);
  console.log("The state is now ", state);
};

const featureA = {
  state: { items: [] },
  actions: {
    fetchItems: async (state?: any) => {
      console.log("fetch items", state);
      return state;
    },
  },
};

const featureB = {
  state: { user: null },
  actions: {
    fetchUser: async (state?: any) => {
      console.log("fetch user", state);
      return state;
    },
  },
};

const store = createStore({
  featureA,
  featureB,
});

applyMiddleware(loggingMiddleware, store);

console.log(store.getState());

store.featureA.fetchItems();
store.featureB.fetchUser();
