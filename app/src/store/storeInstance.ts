import { legacy_createStore as createStore, applyMiddleware } from "redux";
import reduxCookiesMiddleware, {
  getStateFromCookies,
  // @ts-ignore
} from "redux-cookies-middleware";
import allReducers from "./redux/reducers";

const storePaths = {
  ui: {
    name: "ui",
  },
};

const initialState = getStateFromCookies({}, storePaths);
const cookieMiddleware = reduxCookiesMiddleware(storePaths);

const middlewares = [cookieMiddleware];

const store = createStore(
  allReducers,
  initialState,
  applyMiddleware(...middlewares)
);
export const dispatchType = <P>(type: string, payload?: P): void => {
  store.dispatch({
    type,
    payload,
  });
};

export type RootState = ReturnType<typeof store.getState>;

export default store;
