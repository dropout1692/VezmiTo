import { useGetSubmissions } from '../../hooks/submissions/useGetSubmissions'
import { Spinner } from '../../components/Spinner/Spinner'
import { useGeolocation } from '../../hooks/location/useGeolocation'
import { Map } from '../../components/Map/Map'
import { useCallback, useState } from 'react'
import { AddButton } from '../../components/AddButton/AddButton'
import { AddModal } from '../../components/AddModal/AddModal'

export const Homepage = () => {
  const { data, silentLoading } = useGetSubmissions()
  const [showAddSubmissionModal, setShowAddSubmissionModal] =
    useState<boolean>(false)
  const { geoData } = useGeolocation({ getOnInit: true })

  const toggleSetShowAddSubmissionModal = useCallback(() => {
    setShowAddSubmissionModal((prevState) => !prevState)
  }, [])

  return (
    <div className="h-full w-full">
      <Spinner show={silentLoading} isFullscreen />
      {!showAddSubmissionModal && (
        <AddButton onClick={() => setShowAddSubmissionModal(true)} />
      )}
      <AddModal
        open={showAddSubmissionModal}
        onOpenChange={toggleSetShowAddSubmissionModal}
        onSubmit={console.log}
      />
      <Map
        latitude={geoData?.coords?.latitude}
        longitude={geoData?.coords?.longitude}
        data={data}
      />
    </div>
  )
}
