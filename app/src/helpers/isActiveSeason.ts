import { SubmissionType } from '../store/features/submissions/submissionsSliceType'
import { getFreebieSeason } from './getFreebieSeason'

export const isActiveSeason = ({
  submission,
}: {
  submission: SubmissionType
}) => {
  const date = new Date()
  const currentMonth = date.getMonth() + 1
  const activeSeason = getFreebieSeason({ submission })

  return activeSeason.includes(currentMonth)
}
