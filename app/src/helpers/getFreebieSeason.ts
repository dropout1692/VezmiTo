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

  const result = []

  for (const range of season) {
    for (let num = range.start; num <= range.end; num++) {
      result.push(num)
    }
  }

  return result.sort((a, b) => a - b)
}
