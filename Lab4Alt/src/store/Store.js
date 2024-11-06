import {configureStore, createSlice} from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    favorites: [],
  },
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    toggleFavorite: (state, action) => {
      const contact = action.payload;
      const isFavorite = state.favorites.some(
        fav => fav.login.uuid === contact.login.uuid,
      );
      if (isFavorite) {
        state.favorites = state.favorites.filter(
          fav => fav.login.uuid !== contact.login.uuid,
        );
      } else {
        state.favorites.push(contact);
      }
    },
  },
});
export const {setContacts, toggleFavorite} = contactsSlice.actions;

export const store = configureStore({
  reducer: {
    contacts: contactsSlice.reducer,
  },
});
