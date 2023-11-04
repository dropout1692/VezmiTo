import { createAsyncThunk as reduxCreateAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const createAsyncThunk = reduxCreateAsyncThunk.withTypes<{
  rejectValue: { code: string; message: string }
  state: RootState
  pendingMeta: { pendingData: any }
}>()
