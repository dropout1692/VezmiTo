import { Button } from '../components/Button/Button'
import useRouter from '../hooks/router/useRouter'

export function PageContainer({ children }: { children: JSX.Element }) {
  const router = useRouter()
  return (
    <div>
      <div className="fixed z-10 right-0">
        <Button
          onClick={() => router.pushRoute('home')}
          className="bg-blue-500 hover:bg-blue-600 transition m-2"
        >
          Home
        </Button>
        <Button
          onClick={() => router.pushRoute('adminDashboard')}
          className="bg-blue-500 hover:bg-blue-600 transition m-2"
        >
          Admin dashboard
        </Button>
        <Button
          onClick={() => router.pushRoute('privacyPolicy')}
          className="bg-blue-500 hover:bg-blue-600 transition m-2"
        >
          Privacy policy
        </Button>
        <Button
          onClick={() => router.pushRoute('aboutProject')}
          className="bg-blue-500 hover:bg-blue-600 transition m-2"
        >
          About project
        </Button>
      </div>
      {children}
    </div>
  )
}
