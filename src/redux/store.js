import { configureStore } from '@reduxjs/toolkit';
import albumsReducer from './albumsSlice';
import artistsReducer from './artistsSlice';
import musicReducer from './songsSlice';
import userAccountsReducer from './userAccountsSlice';
import userRolesReducer from './userRolesSlice';
const store = configureStore({
  reducer: {
    artists: artistsReducer,
    songs: musicReducer,
    albums: albumsReducer,
    userRoles: userRolesReducer,
    userAccounts: userAccountsReducer,
  },
});

export default store;
