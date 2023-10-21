import { UserContext } from '../../utils/UserContextMethods'
import { Navigate } from 'react-router-dom'

type Props = {
  user: UserContext | null
  children: any
}

const ProtectedRoute = ({ user, children }: Props) => {
  if (!user) {
    return <Navigate to="/" replace />
  }
  return children
}

export default ProtectedRoute
