import classes from './CartButton.module.css';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import { useSelector } from 'react-redux';




const CartButton = (props) => {
  const dispatch = useDispatch();

  const cartQuantity = useSelector(state => state.cart.totalQuantity);
const toggleCartHandler = () => {
  dispatch(uiActions.toggle());

}




  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>내 장바구니</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
