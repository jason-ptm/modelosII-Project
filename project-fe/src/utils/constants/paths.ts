export const adminPath = '/admin/:adminId'
export const studentPath = '/student'

export default {
  // ADMINS ROUTES
  ADMIN_COMPETITIONS: {
    slug: 'competitions',
    absolutePath: `${adminPath}/competitions`,
  },
  ADMIN_COMPETITION: {
    slug: 'competitions/:id',
    absolutePath: `${adminPath}/competitions/:id`,
  },
  ADMIN_TEAMS: {
    slug: 'teams',
    absolutePath: `${adminPath}/teams`,
  },
  //   STUDENT ROUTES
  STUDENT_FORM: {
    slug: 'form',
    absolutePath: `${studentPath}/form`,
  },
  STUDENT_REGISTER_FORM: {
    slug: 'register',
    absolutePath: `${studentPath}/register`,
  },
  STUDENT_HOME: {
    slug: 'home',
    absolutePath: `${studentPath}/home`,
  },
  STUDENT_TEAM: {
    slug: 'team',
    absolutePath: `${studentPath}/team`,
  },
  STUDENT_COMPETITIONS: {
    slug: 'competitions',
    absolutePath: `${studentPath}/competitions`,
  },
}
