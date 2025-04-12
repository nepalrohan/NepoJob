import { configureStore } from '@reduxjs/toolkit';


export const Store = () => {
  return configureStore({
    reducer: {
     
    },
  });
};

export type AppStore = ReturnType<typeof Store>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];