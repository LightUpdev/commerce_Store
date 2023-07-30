import "./App.css";
import Navbar from "./Component/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import Products from "./Component/ProductsComponent/Products";
import { commerce } from "./lib/Commerce";
import { useEffect, useState } from "react";
import CartItem from "./Component/Cart/Cart_Item";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Component/CheckoutForm/Checkout/Checkout";
import { Notify } from "./Component/Notification";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // REACT HOOK STATE
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  // FETCH PRODUCT DATA
  const fetchProduct = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  // FETCH CART DATA
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  // ADD PRODUCT TO Cart
  const handleAddToCart = async (productId, qty) => {
    const data = await commerce.cart.add(productId, qty);
    setCart(data);
    data && toast.success(`product added to cart`);
  };

  // REMOVE ITEM FROM THE CART
  const removeCartItem = async (productId) => {
    const data = await commerce.cart.remove(productId);
    setCart(data);
    data && toast.danger(`product remove from cart`);
  };

  const decreaseCartItem = async (productId, qty) => {
    const data = await commerce.cart.update(productId, qty);
    setCart(data);
  };

  const emptyCart = async () => {
    const data = await commerce.cart.empty();
    setCart(data);
    data && toast.info(`All cart items cleared successfully`);
  };

  useEffect(() => {
    fetchProduct();
    fetchCart();
  }, []);

  return (
    <Router>
      <Navbar totalItem={cart.total_items} emptyCart={emptyCart} />
      <Switch>
        <Route path="/" exact={true}>
          <Products products={products} onAddToCart={handleAddToCart} />
          <ToastContainer />
        </Route>
        <Route path="/cart" exact={true}>
          <CartItem
            cartList={cart}
            removeCartItem={removeCartItem}
            decreaseCartItem={decreaseCartItem}
            handleAddToCart={handleAddToCart}
          />
        </Route>
        <Route path="/checkout" exact={true}>
          <Checkout cart={cart} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
