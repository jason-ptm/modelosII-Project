import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'
import './App.css'
import { CompetitionsList } from './components'
import AdminAuthLayout from './containers/adminAuthLayout/AdminAuthLayout'
import StudentAuthLayout from './containers/studentAuthLayout/StudenteAuthLayout'
import { CompetitionDetails, TeamsList } from './pages/admin'
import { Form, Home, TeamDetails } from './pages/student'
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

          <Route path={paths.STUDENT_FORM.absolutePath} element={<Form />} />

          <Route path={studentPath} element={<StudentAuthLayout />}>
            <Route path={paths.STUDENT_HOME.slug} element={<Home />} />

            <Route path={paths.STUDENT_TEAM.slug} element={<TeamDetails />} />

            <Route
              path={paths.STUDENT_COMPETITIONS.slug}
              element={<CompetitionsList />}
            />
          </Route>

          <Route path="*" element={<Navigate to={studentPath} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
