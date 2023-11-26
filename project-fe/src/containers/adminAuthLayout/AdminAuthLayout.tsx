import { Navigate, Outlet, useParams } from 'react-router-dom'
import paths from '../../utils/constants/paths'

export default function AdminAuthLayout() {
  const params = useParams()
  const isAdmin = params.adminId === '12345'

  return !isAdmin ? (
    <Navigate to={paths.STUDENT_FORM.absolutePath} />
  ) : (
    <Outlet />
  )
}
