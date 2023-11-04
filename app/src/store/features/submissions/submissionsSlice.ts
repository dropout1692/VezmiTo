import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { AppDispatch, RootState } from './../../store'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { createAsyncThunk } from '../../helpers/createAsyncThunk'
import { SubmissionType, SubmissionsSliceType } from './submissionsSliceType'
import { apiClient } from '../../../api/apiClient'
import { SUBMISSIONS_TEST_DATA } from './submissionsTestData'

// ---------------
// Initial State
// ---------------
export const initialState: SubmissionsSliceType = {
  entities: SUBMISSIONS_TEST_DATA,
  status: 'idle',
  error: null,
} as SubmissionsSliceType // https://github.com/reduxjs/redux-toolkit/pull/827

// ---------------
// Thunks
// ---------------

export const fetchSubmissions = createAsyncThunk(
  'submissions/fetchData',
  async () => {
    const response = await apiClient().request({
      url: '/submissions/get',
    })
    return response.data
  },
)

// ---------------
// Reducer
// ---------------

export const submissionsSlice = createSlice({
  name: 'submissions',
  initialState,
  reducers: {
    resetCommentsState: () => {
      return initialState
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSubmissions.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchSubmissions.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const payload = action.payload as SubmissionType
        state.entities = payload.fetchSubmissions || []
      })
      .addCase(fetchSubmissions.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.code || null
      })
  },
})

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useSubmissionsDispatch: () => AppDispatch = useDispatch
export const useSubmissionSelector: TypedUseSelectorHook<RootState> =
  useSelector

// ---------------
// SELECTORS
// ---------------

export const selectAllSubmissions = (state: RootState) => {
  return state.submissions.entities
}

export const selectSubmissionById = createSelector(
  [selectAllSubmissions, (_, submissionId: string) => submissionId],
  (submissions, submissionId) => {
    return submissions.find((submission) => submission.id === submissionId)
  },
)

export const selectSubmissionsStatus = (state: RootState) => {
  return state.submissions.status
}

export default submissionsSlice.reducer
