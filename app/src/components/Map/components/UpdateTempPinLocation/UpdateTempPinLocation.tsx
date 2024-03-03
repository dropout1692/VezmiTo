import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import {
  selectSelectedSubmissionId,
  usePageSelector,
} from '../../../../store/features/page/pageSlice'
import {
  updateTempSubmission,
  useSubmissionsDispatch,
} from '../../../../store/features/submissions/submissionsSlice'

export const UpdateTempPinLocation = () => {
  const map = useMap()
  const selectedSubmissionId = usePageSelector(selectSelectedSubmissionId)
  const submissionsDispatch = useSubmissionsDispatch()

  useEffect(() => {
    if (selectedSubmissionId) {
      map.on('dragend', function () {
        const { lat, lng } = map.getCenter() || {}
        submissionsDispatch(
          updateTempSubmission({
            id: selectedSubmissionId,
            location: {
              latitude: lat,
              longitude: lng,
            },
          }),
        )
      })
    } else {
      map.off('dragend')
    }
  }, [selectedSubmissionId])

  return null
}
