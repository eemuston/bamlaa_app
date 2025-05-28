import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './NotificationContext'
import { UserContextProvider } from './UserContext'
import { BrowserRouter as Router } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <NotificationContextProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </NotificationContextProvider>
  </UserContextProvider>
);