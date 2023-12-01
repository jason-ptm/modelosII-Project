import { useSelector } from 'react-redux'
import { Navigate, Outlet, useParams } from 'react-router-dom'
import Wrapper from '../../components/Wrapper'
import { RootState } from '../../redux/store'
import { studentPath } from '../../utils/constants/paths'

export function StudentAuthLayout() {
  const { selectedStudent } = useSelector((state: RootState) => state.student)

  return selectedStudent.id.trim().length === 0 ? (
    <Outlet />
  ) : (
    <Navigate to={`${studentPath}/${selectedStudent.id}`} />
  )
}

export function StudentAuthenticatedLayout() {
  const { selectedStudent } = useSelector((state: RootState) => state.student)
  const params = useParams()

  return selectedStudent.id === params?.id ? (
    <Wrapper role="student">
      <Outlet />
    </Wrapper>
  ) : (
    <Navigate to={studentPath} />
  )
}
