import { ErrorBoundary } from 'react-error-boundary'
import AttendanceManagement from './components/AttendanceManagement'
import AttendanceListError from './components/AttendanceListError'

function App() {
  return (
    <main>
      <h1>Attendance Management</h1>
      <ErrorBoundary FallbackComponent={AttendanceListError}>
        <AttendanceManagement />
      </ErrorBoundary>
    </main>
  )
}

export default App
