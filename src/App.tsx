import { ErrorBoundary } from 'react-error-boundary'
import { ClientProvider } from './state/ClientContext'
import AttendanceManagement from './components/AttendanceManagement'
import AttendanceListError from './components/AttendanceListError'

function App() {
  return (
    <ClientProvider>
      <main>
        <h1>Attendance Management</h1>
        <ErrorBoundary FallbackComponent={AttendanceListError}>
          <AttendanceManagement />
        </ErrorBoundary>
      </main>
    </ClientProvider>
  )
}

export default App
