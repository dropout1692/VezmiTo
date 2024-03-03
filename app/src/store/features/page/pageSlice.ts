import { createSlice } from '@reduxjs/toolkit'
import type { AppDispatch, RootState } from './../../store'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { PageSliceType } from './pageSliceType'
import { setUrlParameters } from '../../../libs/tools/urlParams'

// ---------------
// Initial State
// ---------------

export const initialState: PageSliceType = {
  zoom: 13,
  location: {
    lat: 48.15635253890314,
    lng: 17.048506736755375,
  },
  selectedSubmissionId: '',
  isLoading: false,
}

// ---------------
// Reducer
// ---------------

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setZoom: (state, action) => {
      const zoom = action.payload
      setUrlParameters({ zoom })
      state.zoom = zoom
    },
    setLocation: (state, action) => {
      const location = action.payload
      setUrlParameters(location)
      state.location = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setZoomAndLocation: (state, action) => {
      const location = action.payload.location
      const zoom = action.payload.zoom
      setUrlParameters({ ...location, zoom })
      state.zoom = zoom
      state.location = location
    },
    setSelectedSubmission: (state, action) => {
      const id = action.payload
      state.selectedSubmissionId = id
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setZoom,
  setLocation,
  setZoomAndLocation,
  setSelectedSubmission,
  setIsLoading,
} = pageSlice.actions

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const usePageDispatch: () => AppDispatch = useDispatch
export const usePageSelector: TypedUseSelectorHook<RootState> = useSelector

// ---------------
// SELECTORS
// ---------------

export const selectZoom = (state: RootState) => {
  return state.page.zoom
}

export const selectLocation = (state: RootState) => {
  return state.page.location
}

export const selectIsLoading = (state: RootState) => {
  return state.page.isLoading
}

export const selectSelectedSubmissionId = (state: RootState) => {
  return state.page.selectedSubmissionId
}

export default pageSlice.reducer
