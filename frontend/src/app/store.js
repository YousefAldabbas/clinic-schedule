import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from '../features/auth/authSlice';
import PatientReducer from '../features/patient/patientSlice';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    patient: PatientReducer,
  },
});
