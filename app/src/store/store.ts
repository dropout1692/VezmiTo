import { configureStore } from '@reduxjs/toolkit'
import submissionsSlice from './features/submissions/submissionsSlice'

export const vezmiToStoreReducer = {
  submissions: submissionsSlice,
}

export const store = configureStore({
  reducer: vezmiToStoreReducer,
})
// Infer the `RootState` and `AppDispatch` types from the storeFactory
export type RootState = ReturnType<StoreType['getState']>
export type AppDispatch = StoreType['dispatch']
