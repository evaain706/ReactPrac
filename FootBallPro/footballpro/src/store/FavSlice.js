import { createSlice } from "@reduxjs/toolkit";

const FavSlice = createSlice({
  name: 'fav',
  initialState: { fav: [] },
  reducers: {
    AddToFav(state, action) {
      if (state.fav.some(item => item.id === action.payload.id)) {
        window.alert('이미 있는 팀임');
        return;
      }

      state.fav = [...state.fav, action.payload];
      console.log(state.fav);
    },

    RemoveFromFav(state, action) {
      const id = action.payload;
      state.fav = state.fav.filter(item => item.id !== id);
    }
  }
});

export const favActions = FavSlice.actions;
export default FavSlice.reducer;