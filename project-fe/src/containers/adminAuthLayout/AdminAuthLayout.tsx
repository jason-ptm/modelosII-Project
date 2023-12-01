import { Navigate, Outlet, useParams } from 'react-router-dom'
import paths from '../../utils/constants/paths'
import { Wrapper } from '../../components'

export default function AdminAuthLayout() {
  const params = useParams()
  const isAdmin = params.adminId === '12345'

  return !isAdmin ? (
    <Navigate to={paths.STUDENT_FORM.absolutePath} />
  ) : (
    <Wrapper role="admin">
      <Outlet />
    </Wrapper>
  )
}
