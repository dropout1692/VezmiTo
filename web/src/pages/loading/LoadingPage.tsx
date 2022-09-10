import { Spinner } from '../../components/Spinner/Spinner'

export default function LoadingPage() {
  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col items-center">
        <Spinner />
        <p className="mt-3">Loading...</p>
      </div>
    </div>
  )
}
