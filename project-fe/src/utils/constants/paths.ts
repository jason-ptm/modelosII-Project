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
    slug: ':id/home',
    absolutePath: `${studentPath}/:id/home`,
  },
  STUDENT_TEAM: {
    slug: ':id/team',
    absolutePath: `${studentPath}/:id/team`,
  },
  STUDENT_COMPETITIONS: {
    slug: ':id/competitions',
    absolutePath: `${studentPath}/:id/competitions`,
  },
}
