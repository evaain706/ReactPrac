import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
name: 'cart',

initialState:{
    items:[],
    totalQuantity:0,
    totalAmount:0,
},

reducers: {
 addItemToCart(state,action) {
  const newItem = action.payload;
  const isExist = state.items.find(item => item.id === newItem.id);
  state.totalQuantity++;
  if(!isExist){
    state.items.push({
    id: newItem.id,
    price:newItem.price,
    quantity:1,
    totalPrice:newItem.price,
    name:newItem.title
    }); //redux toolkit 에서는 push 사용가능
  } else {
    isExist.quantity = isExist.quantity +1 ;
    isExist.totalPrice = isExist.totalPrice + newItem.price;
  }
 },
 removeItemFromCart(state,action) {
    const id = action.payload;
    const isExist = state.items.find(item => item.id === id);
    state.totalQuantity--;
    if(isExist.quantity ===1){
        state.items = state.items.filter(item => item.id !== id);

    }else{
        isExist.quantity--;
        isExist.totalPrice = isExist.totalPrice - isExist.price;
    }

 }

},


})

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;