import { useDispatch, useSelector } from 'react-redux';

import { cartActions } from '../../store/mycart-slice';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';

const ProductItem = (props) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const { title, price, description, id } = props;

  const addToCartHandler = () => {
  

    // and then send Http request
    // fetch('firebase-url', { method: 'POST', body: JSON.stringify(newCart) })

     dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
            })
            );
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>장바구니에 추가</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;