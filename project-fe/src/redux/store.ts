import { configureStore } from '@reduxjs/toolkit'
import { syncWithDatabaseMiddleware } from './middlewares/syncWithDatabaseMiddleware'
import studentReducer from './slice/studentReducer'
import adminReducer from './slice/adminReducer'

export const AppStore = configureStore({
  reducer: {
    student: studentReducer,
    admin: adminReducer,
  },
  middleware: [syncWithDatabaseMiddleware],
})

export type RootState = ReturnType<typeof AppStore.getState>
