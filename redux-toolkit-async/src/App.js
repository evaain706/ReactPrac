import { useEffect,useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { cartActions } from './store/mycart-slice';
import { sendCartData,fetchCartData } from './store/mycart-actions';


let isInitial = true;


function App() {

  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification)

  const dispatch = useDispatch();


  useEffect(()=> {
    dispatch(fetchCartData());

  },[dispatch])


  useEffect(()=> {
   
   if(isInitial){
    isInitial = false;
    return;
   }
   
   if(cart.changed){
    dispatch(sendCartData(cart));
   }

   
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
