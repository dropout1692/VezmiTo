import { Spinner } from '../../components/Spinner/Spinner'
import { useGeolocation } from '../../hooks/location/useGeolocation'
import { Map } from '../../components/Map/Map'
import { useCallback, useEffect, useState } from 'react'
import { AddButton } from '../../components/AddButton/AddButton'
import { AddModal } from '../../components/AddModal/AddModal'
import {
  fetchSubmissions,
  selectAllSubmissions,
  selectSubmissionsStatus,
  useSubmissionSelector,
  useSubmissionsDispatch,
} from './../../store/features/submissions/submissionsSlice'

export const Homepage = () => {
  const submissionsStatus = useSubmissionSelector(selectSubmissionsStatus)
  const submissions = useSubmissionSelector(selectAllSubmissions)
  const submissionsDispatch = useSubmissionsDispatch()

  const [showAddSubmissionModal, setShowAddSubmissionModal] =
    useState<boolean>(false)

  const { geoData } = useGeolocation({ getOnInit: true })

  const toggleSetShowAddSubmissionModal = useCallback(() => {
    setShowAddSubmissionModal((prevState) => !prevState)
  }, [])

  useEffect(() => {
    if (submissionsStatus === 'idle') {
      submissionsDispatch(fetchSubmissions())
    }
  }, [submissionsStatus])

  const isLoading = submissionsStatus === 'loading'

  return (
    <div className="h-full w-full">
      <Spinner show={isLoading} isFullscreen />
      {!showAddSubmissionModal && (
        <AddButton onClick={() => setShowAddSubmissionModal(true)} />
      )}
      <AddModal
        open={showAddSubmissionModal}
        onOpenChange={toggleSetShowAddSubmissionModal}
        onSubmit={(data) => {
          alert(JSON.stringify(data, null, 2))
        }}
      />
      <Map
        latitude={geoData?.coords?.latitude}
        longitude={geoData?.coords?.longitude}
        data={submissions}
      />
    </div>
  )
}
