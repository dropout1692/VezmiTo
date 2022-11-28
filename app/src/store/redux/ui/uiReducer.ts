import type { UIState, ActionWithoutPayload } from "../types";
import { UI } from "../constants";

const initialState: UIState = {
  isLoading: false,
};
export default function uiReducer(
  state: UIState = initialState,
  { type }: ActionWithoutPayload
): UIState {
  /** LOADING */
  if (type === UI.SET_LOADING_START) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (type === UI.SET_LOADING_STOP) {
    return {
      ...state,
      isLoading: false,
    };
  }

  return state;
}
