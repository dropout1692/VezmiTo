import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'
import { store, type AppDispatch, type RootState } from './../../store'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { createAsyncThunk } from '../../helpers/createAsyncThunk'
import { SubmissionType, SubmissionsSliceType } from './submissionsSliceType'
import { apiClient } from '../../../api/apiClient'
import { SUBMISSIONS_TEST_DATA } from './submissionsTestData'

type ThunkData<T = Object> = {
  queryVariables?: T
  thunkOptions?: {
    onSuccess?: () => void
    onError?: (err: any) => void
  }
}

// ---------------
// Initial State
// ---------------
export const initialState: SubmissionsSliceType = {
  entities: [],
  status: 'idle',
  error: null,
} as SubmissionsSliceType // https://github.com/reduxjs/redux-toolkit/pull/827

// ---------------
// Thunks
// ---------------

export const fetchSubmissions = createAsyncThunk<SubmissionType[], ThunkData>(
  'submissions/fetchData',
  async ({ thunkOptions = {} }) => {
    const { onError } = thunkOptions
    const response = await apiClient()
      .request({
        url: '/submissions/get',
      })
      .catch((err) => {
        if (onError) {
          onError(err)
        }
      })

    return response
  },
)

export type SubmissionType = 'FREEBIE' | 'GIVEAWAY'

export type CreateSubmissionData = {
  author: {
    phone: ''
    email: ''
    deviceID: string
  }
  title: string
  submissionType: SubmissionType
  tags: string[]
  photoUrls: string[]
  location: {
    latitude: string
    longitude: string
    altitude: string
  }
  description: string
}

export const createSubmission = createAsyncThunk<
  SubmissionType,
  ThunkData<CreateSubmissionData>
>('submissions/create', async ({ queryVariables, thunkOptions = {} }) => {
  const { onError } = thunkOptions

  const response = await apiClient()
    .request({
      url: '/submissions/create',
      method: 'put',
      data: queryVariables,
    })
    .catch((err) => {
      if (onError) {
        onError(err)
      }
    })

  return response
})

// ---------------
// Reducer
// ---------------

export const submissionsSlice = createSlice({
  name: 'submissions',
  initialState,
  reducers: {
    resetSubmissionsState: () => {
      return initialState
    },
    tempAddSubmission: (state, action: PayloadAction<SubmissionType>) => {
      const submission = action.payload
      state.entities = [...state.entities, submission]
    },
    deleteTempSubmission: (state) => {
      state.entities = state.entities.filter(({ meta }) => !meta?.tempLocation)
    },
    updateTempSubmission: (state, action: PayloadAction<SubmissionType>) => {
      const { id, ...restData } = action.payload
      const submissionIndex = state.entities.findIndex(
        (submission) => submission.id === id,
      )

      const submission = state.entities[submissionIndex]

      if (!submission) {
        return
      }

      state.entities[submissionIndex] = {
        ...submission,
        ...restData,
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSubmissions.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchSubmissions.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const payload = action.payload
        state.entities = payload
      })
      .addCase(fetchSubmissions.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.code || null
      })
      .addCase(createSubmission.fulfilled, (state, action) => {
        if (state.status === 'succeeded') {
          const newSubmission = action.payload

          // delete temp submission
          state.entities = state.entities.filter(
            ({ meta }) => !meta?.tempLocation,
          )

          if (newSubmission) {
            state.entities = [...state.entities, newSubmission]
          }
        }
      })
  },
})

// Action creators are generated for each case reducer function
export const {
  resetSubmissionsState,
  tempAddSubmission,
  updateTempSubmission,
  deleteTempSubmission,
} = submissionsSlice.actions

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
    return (
      submissions.find((submission) => submission?.id === submissionId) || ''
    )
  },
)

export const selectSubmissionsStatus = (state: RootState) => {
  return state.submissions.status
}

export default submissionsSlice.reducer
