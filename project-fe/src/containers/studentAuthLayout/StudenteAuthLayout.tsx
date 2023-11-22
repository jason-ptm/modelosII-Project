import { Navigate, Outlet } from "react-router-dom";
import paths from "../../utils/constants/paths";


export default function StudentAuthLayout() {

  return false ? (
    <Navigate to={paths.STUDENT_FORM.absolutePath} />
  ) : (
    <Outlet />
  )
}
