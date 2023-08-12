import { configureStore } from '@reduxjs/toolkit';
import auth from './features/auth/authSlice';
import product from './features/products/productSlice';
import api from './services/api';

export const store = configureStore({
  reducer: {
    auth, 
    product,
    [api.reducerPath]: api.reducer,
  },
  devTools:true,
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      api.middleware,
    ])

});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;