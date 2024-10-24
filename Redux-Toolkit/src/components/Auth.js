import classes from './Auth.module.css';
import {useSelector,useDispatch} from 'react-redux'; //store와 연결하기위해 import
import { authActions } from '../store/auth-slice';




const Auth = () => {

  const isAuth = useSelector((state) => state.auth.isAuth);
 
  const dispatch = useDispatch(); //store에서 action을 전달받기위한 함수


  const loginHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.login());
  }




  return (
    <main className={classes.auth}>
      <section>
        
          <form onSubmit={loginHandler}>
            <div className={classes.control}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" />
            </div>
            <div className={classes.control}>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" />
            </div>
            <button>Login</button>
          </form>
        
      
      </section>
    </main>
  );
};

export default Auth;
