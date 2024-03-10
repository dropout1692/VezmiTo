import { useCallback } from 'react'
import {
  selectIsLoading,
  selectSelectedSubmissionId,
  usePageSelector,
} from '../../store/features/page/pageSlice'
import {
  CreateSubmissionData,
  selectSubmissionById,
  useSubmissionSelector,
} from '../../store/features/submissions/submissionsSlice'
import { Spinner } from '../Spinner/Spinner'
import { stringify } from '../../libs/tools/stringify'
import { getMachineId } from '../../helpers/getMachineId'
import clsx from 'clsx'

export function EditPinPosition({
  onSubmit,
}: {
  onSubmit: (data: CreateSubmissionData) => void
}) {
  const isLoading = usePageSelector(selectIsLoading)
  const selectedSubmissionId = usePageSelector(selectSelectedSubmissionId)
  const selectedSubmission = useSubmissionSelector((state) =>
    selectSubmissionById(state, selectedSubmissionId),
  )

  const handleSubmit = useCallback(() => {
    onSubmit({
      ...selectedSubmission,
      author: {
        phone: '',
        email: '',
        deviceID: getMachineId(),
      },
      photoUrls: selectedSubmission?.photoUrls || [],
    } as CreateSubmissionData)
  }, [stringify(selectedSubmission)])

  return (
    <div className="flex flex-col sm:flex-row sm:w-[500px]">
      <p>
        Skontroluj prosím umiestnenie. V prípade potreby pohybom na mape uprav
        pozíciu.
      </p>
      <button
        className={clsx(
          'btn btn-primary mt-3 sm:mt-0 ml-0 sm:ml-3 text-center flex-shrink-0',
          { 'opacity-50': isLoading },
        )}
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Spinner
              show={true}
              className="mr-2"
              style={{ width: '1.25rem', height: '1.25rem' }}
            />
            <span>Nahrávam</span>
          </div>
        ) : (
          <span>Odoslať</span>
        )}
      </button>
    </div>
  )
}
