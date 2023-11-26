import { configureStore } from '@reduxjs/toolkit'
import { syncWithDatabaseMiddleware } from './middlewares/syncWithDatabaseMiddleware'
import studentReducer from './slice/studentReducer'

export const AppStore = configureStore({
  reducer: {
    student: studentReducer,
  },
  middleware: [syncWithDatabaseMiddleware],
})

export type RootState = ReturnType<typeof AppStore.getState>
