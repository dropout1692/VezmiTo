import { legacy_createStore as createStore, applyMiddleware } from "redux";
import allReducers from "./redux/reducers";

const initialState = {
  ui: {
    isLoading: false,
  },
};

const store = createStore(allReducers, initialState, applyMiddleware());
export const dispatchType = <P>(type: string, payload?: P): void => {
  store.dispatch({
    type,
    payload,
  });
};

export type RootState = ReturnType<typeof store.getState>;

export default store;
