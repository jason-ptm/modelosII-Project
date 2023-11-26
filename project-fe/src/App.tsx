import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'
import './App.css'
import { CompetitionsList } from './components'
import RedirectComponent from './components/RedirectComponent/RedirectComponent'
import AdminAuthLayout from './containers/adminAuthLayout/AdminAuthLayout'
import StudentAuthLayout from './containers/studentAuthLayout/StudenteAuthLayout'
import { CompetitionDetails, TeamsList } from './pages/admin'
import { ConsultForm, Home, TeamForm } from './pages/student'
import paths, { adminPath, studentPath } from './utils/constants/paths'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={adminPath} element={<AdminAuthLayout />}>
            <Route
              path=""
              element={<Navigate to={paths.ADMIN_COMPETITIONS.slug} />}
            />

            <Route
              path={paths.ADMIN_COMPETITIONS.slug}
              element={<CompetitionsList />}
            />
            <Route
              path={paths.ADMIN_COMPETITION.slug}
              element={<CompetitionDetails />}
            />

            <Route path={paths.ADMIN_TEAMS.slug} element={<TeamsList />} />
          </Route>

          <Route
            path={paths.STUDENT_FORM.absolutePath}
            element={<ConsultForm />}
          />

          <Route
            path={paths.STUDENT_REGISTER_FORM.absolutePath}
            element={<TeamForm />}
          />

          <Route path={studentPath} element={<StudentAuthLayout />}>
            <Route
              path=""
              element={<Navigate to={paths.STUDENT_HOME.slug} />}
            />

            <Route path={paths.STUDENT_HOME.slug} element={<Home />} />

            <Route path={paths.STUDENT_TEAM.slug} element={<TeamForm />} />

            <Route
              path={paths.STUDENT_COMPETITIONS.slug}
              element={<CompetitionsList />}
            />
          </Route>

          <Route path="*" element={<Navigate to={studentPath} />} />
        </Routes>
        <RedirectComponent />
      </Router>
    </div>
  )
}

export default App
