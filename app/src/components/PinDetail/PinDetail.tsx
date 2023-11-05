import { SubmissionType } from '../../store/features/submissions/submissionsSliceType'
import { Season } from '../Season/Season'

export const PinDetail = ({ submission }: { submission: SubmissionType }) => {
  const { photos, title } = submission
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 lg:text-2xl">
        {title}
      </h2>
      <img className="w-[600px] mh-[300px] cover" src={photos[0]} />
      <h3 className="text-base font-bold text-gray-900 my-2">Sezóna</h3>
      <Season submission={submission} />
    </div>
  )
}
