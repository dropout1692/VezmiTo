import { getFreebieSeason } from '../../helpers/getFreebieSeason'
import { SubmissionType } from '../../store/features/submissions/submissionsSliceType'
import { Month } from './components/Month'

export const Season = ({ submission }: { submission: SubmissionType }) => {
  const activeSeason = getFreebieSeason({ submission })
  return (
    <div className="container m-auto grid grid-cols-6 gap-2">
      {[...Array(12).keys()].map((month) => {
        const monthNumber = month + 1
        const monthActive = activeSeason.includes(monthNumber)
        return (
          <Month
            key={month}
            name={monthNumber.toString()}
            active={monthActive}
          />
        )
      })}
    </div>
  )
}
