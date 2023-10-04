import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userReducer from './userSlice/userSlice';
import qrReducer from './qrCodeSlice/qrCodeSlice';

const rootReducer = combineReducers({
  user: userReducer,
  qrcode: qrReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;