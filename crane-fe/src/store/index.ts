import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import storyReducer from "./story/reducer";
import feedReducer from "./feed/reducer";
import syncReducer from "./sync/reducer";

export const store = configureStore({
  reducer: {
    story: storyReducer,
    feeds: feedReducer,
    sync: syncReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
