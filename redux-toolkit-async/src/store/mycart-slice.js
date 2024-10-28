import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";


const cartSlice = createSlice({
name: 'cart',

initialState:{
    items:[],
    totalQuantity:0,
    totalAmount:0,
},

reducers: {
  replaceCart(state,action){
    state.totalQuantity = action.payload.totalQuantity;
    state.items = action.payload.items;

  },


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

//Thunk 사용
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
     uiActions.showNotification({
        status:'pending',
        title:'전송중...',
        message:'장바구니 데이터 전송중',
      }))

      const sendRequest =  async () => {
        const response = await fetch('https://reduxprac-843b3-default-rtdb.firebaseio.com/cart.json',
          {
            method:'PUT',
            body:JSON.stringify(cart), //useSelector로 cart state를 가져왔기때문에 항상 최신의 상태유지가능
          });
  
          if(!response.ok){
           throw new Error('전송실패')
          }
      }

      try{
        await sendRequest();
        dispatch(uiActions.showNotification({
          status:'success',
          title:'전송성공',
          message:'장바구니 데이터 전송성공',
        }))
      }catch(error){
          dispatch(uiActions.showNotification({
            status:'error',
            title:'전송실패',
            message:'장바구니 데이터 전송실패',
          }))
      }
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;