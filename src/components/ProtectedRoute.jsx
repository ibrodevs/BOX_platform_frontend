import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import Loader from './ui/Loader'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, initialized, loading } = useAuthStore()

  if (!initialized || loading) {
    return <Loader fullScreen />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}
