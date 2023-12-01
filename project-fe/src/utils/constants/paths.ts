export const adminPath = '/admin/:adminId'
export const studentPath = '/student'
export const authenticatedStudentPath = '/student/:id'

export default {
  // ADMINS ROUTES
  ADMIN_HOME: {
    slug: 'home',
    absolutePath: `${adminPath}/home`,
  },
  ADMIN_COMPETITIONS: {
    slug: 'competitions',
    absolutePath: `${adminPath}/competitions`,
  },
  ADMIN_COMPETITION: {
    slug: 'competitions/:id',
    absolutePath: `${adminPath}/competitions/:id`,
  },
  ADMIN_CREATE_COMPETITION: {
    slug: 'create-competition',
    absolutePath: `${adminPath}/create-competition`,
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
  STUDENT_HOME: {
    slug: 'home',
    absolutePath: `${authenticatedStudentPath}/home`,
  },
  STUDENT_TEAM: {
    slug: 'team',
    absolutePath: `${authenticatedStudentPath}/team`,
  },
  STUDENT_COMPETITIONS: {
    slug: 'competitions',
    absolutePath: `${authenticatedStudentPath}/competitions`,
  },
}
