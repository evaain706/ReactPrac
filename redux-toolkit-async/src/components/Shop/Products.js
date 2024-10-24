import ProductItem from './ProductItem';
import classes from './Products.module.css';


const DUMMY_PRODUCTS = [
{
  id:'p1', price:6, title:'책1', description:'The Frist Book I ever wrote'
},
{
  id:'p2', price:5, title:'책2', description:'The Second Book I ever wrote'
},
{
  id:'p3', price:4, title:'책3', description:'The Third Book I ever wrote'
},
{
  id:'p4', price:3, title:'책4', description:'The Fourth Book I ever wrote'
},


]



const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Redux Toolkit 연습 장바구니</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
          />
        ))}
      
      
      </ul>
    </section>
  );
};

export default Products;
