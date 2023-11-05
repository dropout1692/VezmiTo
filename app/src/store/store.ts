import { configureStore } from '@reduxjs/toolkit'
import submissionsSlice from './features/submissions/submissionsSlice'
import pageSlice from './features/page/pageSlice'

export const vezmiToStoreReducer = {
  submissions: submissionsSlice,
  page: pageSlice,
}

export const store = configureStore({
  reducer: vezmiToStoreReducer,
})
// Infer the `RootState` and `AppDispatch` types from the storeFactory
export type StoreType = typeof store
export type RootState = ReturnType<StoreType['getState']>
export type AppDispatch = StoreType['dispatch']
