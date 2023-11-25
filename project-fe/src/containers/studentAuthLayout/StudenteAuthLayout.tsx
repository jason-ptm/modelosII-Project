import { Navigate, Outlet } from 'react-router-dom'
import paths from '../../utils/constants/paths'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

export default function StudentAuthLayout() {
  const { selectedStudent } = useSelector((state: RootState) => state.student)
  

  return selectedStudent.id.trim().length === 0 ? (
    <Navigate to={paths.STUDENT_FORM.absolutePath} />
  ) : (
    <Outlet />
  )
}
