import { createRoot } from 'react-dom/client'
import { App } from './App'
import { Provider } from './store/redux'
import { store } from './store/store'
import { NotificationContainer } from './components/Notification/NotificationContainer'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <App />
    <NotificationContainer hideProgressBar />
  </Provider>,
)
