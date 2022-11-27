export type UIState = {
  readonly isLoading: boolean; // is true when some requests are running
};

// REDUCER
export type ActionWithoutPayload = {
  readonly type: string;
};

export type ActionWithPayload<P> = {
  readonly type: string;
  readonly payload: P;
};
