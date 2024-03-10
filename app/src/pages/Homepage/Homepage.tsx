import { Spinner } from '../../components/Spinner/Spinner'
import { useGeolocation } from '../../hooks/location/useGeolocation'
import { Map } from '../../components/Map/Map'
import { useCallback, useEffect, useState } from 'react'
import { AddButton } from '../../components/AddButton/AddButton'
import { AddModal } from '../../components/AddModal/AddModal'
import {
  createSubmission,
  fetchSubmissions,
  selectAllSubmissions,
  selectSubmissionsStatus,
  useSubmissionSelector,
  useSubmissionsDispatch,
} from './../../store/features/submissions/submissionsSlice'
import { stringify } from '../../libs/tools/stringify'
import { getUrlParameters } from '../../libs/tools/urlParams'
import {
  selectSelectedSubmissionId,
  setZoomAndLocation,
  usePageDispatch,
  usePageSelector,
} from '../../store/features/page/pageSlice'
import { useNotification } from '../../hooks/notification/useNotification'

export const Homepage = () => {
  const { lat, lng, zoom } = getUrlParameters()
  const submissionsStatus = useSubmissionSelector(selectSubmissionsStatus)
  const submissions = useSubmissionSelector(selectAllSubmissions)
  const submissionsDispatch = useSubmissionsDispatch()
  const pageDispatch = usePageDispatch()
  const submissionDispatch = useSubmissionsDispatch()
  const { errorNotification } = useNotification()

  const [showAddSubmissionModal, setShowAddSubmissionModal] =
    useState<boolean>(false)

  const selectedSubmissionId = usePageSelector(selectSelectedSubmissionId)

  const { geoData } = useGeolocation({ getOnInit: true })

  const toggleSetShowAddSubmissionModal = useCallback(() => {
    setShowAddSubmissionModal((prevState) => !prevState)
  }, [])

  useEffect(() => {
    if (submissionsStatus === 'idle') {
      submissionsDispatch(
        fetchSubmissions({
          thunkOptions: {
            onError: () => {
              errorNotification('Nepodarilo sa načítať dáta', {
                autoClose: 1500,
                pauseOnHover: false,
                pauseOnFocusLoss: false,
                hideProgressBar: false,
              })
            },
          },
        }),
      )
    }
  }, [submissionsStatus])

  useEffect(() => {
    if (lat && lng && zoom) {
      pageDispatch(
        setZoomAndLocation({
          zoom,
          location: {
            lat,
            lng,
          },
        }),
      )
      return
    }
    if (geoData?.coords) {
      pageDispatch(
        setZoomAndLocation({
          zoom: 15,
          location: {
            lat: geoData?.coords?.latitude,
            lng: geoData?.coords?.longitude,
          },
        }),
      )
    }
  }, [stringify(geoData)])

  const isLoading = submissionsStatus === 'loading'

  return (
    <div className="h-full w-full">
      <Spinner show={isLoading} isFullscreen />
      {!showAddSubmissionModal && !selectedSubmissionId && (
        <AddButton onClick={() => setShowAddSubmissionModal(true)} />
      )}
      <AddModal
        open={showAddSubmissionModal}
        onOpenChange={toggleSetShowAddSubmissionModal}
        onSubmit={(data) => {
          submissionDispatch(
            createSubmission({
              queryVariables: data,
            }),
          )
        }}
      />
      <Map data={submissions} />
    </div>
  )
}
