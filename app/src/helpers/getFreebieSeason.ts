import { SubmissionType } from '../store/features/submissions/submissionsSliceType'
import { FREEBIES } from '../config/freebies'
import { slugify } from '../libs/tools/slugify'

export const getFreebieSeason = ({
  submission,
}: {
  submission: SubmissionType
}) => {
  const season =
    FREEBIES.find((f) => slugify(f.title) === slugify(submission.title))
      ?.season || []

  const activeSeason = season.reduce((acc, { start, end }) => {
    return [...acc, start, end]
  }, [] as number[])

  return activeSeason
}
