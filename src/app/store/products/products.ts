
import { CookieType } from '@/utils/constants';
import { Product } from '@/utils/interfaces';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { setCookie } from 'cookies-next';

interface ProductsState { 
  favorites: { [key: string]: Product },
}

const initialState: ProductsState = {
  favorites: {},
}

const setStoredFavorites = ( newFavorites : { [key: string]: Product }) => {
  setCookie(CookieType.FAVORITES, JSON.stringify( newFavorites ) );
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFavoriteProduct( state, action: PayloadAction<{ [key: string]: Product }> ) {
      state.favorites = action.payload;
      setStoredFavorites( state.favorites );
    },

    toggleFavorite( state, action: PayloadAction<Product> ) {
      const product = action.payload;
      const { name } = product;
      if ( !!state.favorites[name] ) {
        delete state.favorites[name];
      } else {
        state.favorites[name] = product;
      }
      setStoredFavorites( state.favorites );
    }
  }
});

export const { toggleFavorite, setFavoriteProduct } = productsSlice.actions;

export default productsSlice.reducer;