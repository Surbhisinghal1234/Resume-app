import authReducer from '../features/auth/authSlice';
import resumeReducer from '../features/resume/resumeSlice';

import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/auth/authApi';
import { resumeApi } from '../features/resume/resumeApi';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    resume: resumeReducer,
    [authApi.reducerPath]: authApi.reducer,
    [resumeApi.reducerPath]: resumeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, resumeApi.middleware),
});