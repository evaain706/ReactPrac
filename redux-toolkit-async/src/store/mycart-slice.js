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
  if(!isExist){ //장바구니에 존재하지않는 상품 추가시
    state.items.push({
    id: newItem.id,
    price:newItem.price,
    quantity:1,
    totalPrice:newItem.price,
    name:newItem.title
    }); //redux toolkit 에서는 push 사용가능
    
  } else { //이미 장바구니에 담아놓은 상품 다시 추가시
    isExist.quantity = isExist.quantity +1 ;
    isExist.totalPrice = isExist.totalPrice + newItem.price;
  }
 },
 removeItemFromCart(state,action) {
    const id = action.payload;
    const isExist = state.items.find(item => item.id === id);
    state.totalQuantity--;
    if(isExist.quantity === 1){ //장바구니에 상품수량이 1일때
        state.items = state.items.filter(item => item.id !== id);

    }else{ //1이 아닐때는 수량을 1줄이고 해당상품 총 수량에서 1개수량만큼의 가격 빼기
        isExist.quantity--;
        isExist.totalPrice = isExist.totalPrice - isExist.price;
    }

 }

},


})

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;