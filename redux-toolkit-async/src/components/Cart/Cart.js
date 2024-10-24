import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartItems = useSelector(state => state.cart.items);
  return (
    <Card className={classes.cart}>
      <h2>장바구니 목록</h2>
      <ul>
        {cartItems.map((item)=> (
          <CartItem
          ket={item.id}
          item={{ id:item.id ,title: item.name, quantity: item.quantity, total: item.totalPrice, price: item.price }}
          />


        ))}
       
      </ul>
    </Card>
  );
};

export default Cart;
