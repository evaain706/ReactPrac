import classes from './Header.module.css';
import {useSelector,useDispatch,} from 'react-redux'; //store와 연결하기위해 import
import { authActions } from '../store/auth-slice';


const Header = () => {

  const isAuth = useSelector((state) => state.auth.isAuth);
 
  const dispatch = useDispatch(); //store에서 action을 전달받기위한 함수


  const logout = () => {
    dispatch(authActions.logout());
  }


  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>

      {isAuth && 
        <nav>
        <ul>
          <li>
            <a href='/'>My Products</a>
          </li>
          <li>
            <a href='/'>My Sales</a>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </nav>
      
      
      }
    
    </header>
  );
};

export default Header;
