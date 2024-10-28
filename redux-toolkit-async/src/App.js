import { useEffect,useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';


let isInitial = true;


function App() {

  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification)

  const dispatch = useDispatch();




  useEffect(()=> {
    const sendCartData = async () => {
      dispatch(uiActions.showNotification({
        status:'pending',
        title:'전송중...',
        message:'장바구니 데이터 전송중',
      }))
      const response = await fetch('https://reduxprac-843b3-default-rtdb.firebaseio.com/cart.json',
        {
          method:'PUT',
          body:JSON.stringify(cart), //useSelector로 cart state를 가져왔기때문에 항상 최신의 상태유지가능
        });

        if(!response.ok){
         throw new Error('전송실패')
        }
    
      
        dispatch(uiActions.showNotification({
          status:'success',
          title:'전송성공',
          message:'장바구니 데이터 전송성공',
        }))

    };

    if(isInitial){
      isInitial = false;
      return;
    }
   
    sendCartData().catch(error => {
      dispatch(uiActions.showNotification({
        status:'error',
        title:'전송실패',
        message:'장바구니 데이터 전송실패',
      }))

    });
   
  },[cart,dispatch]);
 

  return (
    <>
     <Layout>
      {notification && <Notification status ={notification.status} title={notification.title} message={notification.message}/>} 
    
    {showCart && <Cart /> }
    <Products />
  </Layout>
    </>
   
  );
}

export default App;
