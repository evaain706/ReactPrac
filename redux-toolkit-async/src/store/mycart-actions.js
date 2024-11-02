import { uiActions } from "./ui-slice";
import { cartActions } from "./mycart-slice";



//Thunk 사용
export const fetchCartData = () => {
    return async dispatch => {
        const fetchData =  async () => {
            const response = await fetch('https://reduxprac-843b3-default-rtdb.firebaseio.com/cart.json');


            if(!response.ok){
                throw new Error('데이터 받기 실패');
            }
            const data = await response.json();

            return data;
        };

        try{
          const cartData =  await fetchData();
          dispatch(cartActions.replaceCart({
            items: cartData.items || [],
            totalQuantity:cartData.totalQuantity,
          }));

            dispatch(uiActions.showNotification({
                status:'success',
                title:'받기성공',
                message:'장바구니 데이터 받기성공',
              }))

        }catch(error){
            dispatch(uiActions.showNotification({
                status:'error',
                title:'받기실패',
                message:'장바구니 데이터 받기실패',
              }))
        }


    }

}





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
              body:JSON.stringify({
                items: cart.items, 
                totalQuantity: cart.totalQuantity,}), //useSelector로 cart state를 가져왔기때문에 항상 최신의 상태유지가능
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