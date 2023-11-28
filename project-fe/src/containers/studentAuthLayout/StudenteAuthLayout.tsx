import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Wrapper from '../../components/Wrapper'
import { RootState } from '../../redux/store'
import paths from '../../utils/constants/paths'

export default function StudentAuthLayout() {
  const { selectedStudent } = useSelector((state: RootState) => state.student)

  return selectedStudent.id.trim().length === 0 ? (
    <Navigate to={paths.STUDENT_FORM.absolutePath} />
  ) : (
    <Wrapper role='student'>
      <Outlet />
    </Wrapper>
  )
}
