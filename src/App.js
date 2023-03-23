import { useState } from "react";
import Cart from "./components/Carts/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./Store/cart-provider";
function App() {
  const [cartShow, setCartShow] = useState(false);
  const cartShowHandler = () => {
    setCartShow(true);
  };
  const HideCartHandler = () => {
    setCartShow(false);
  };

  return (
    <CartProvider>
      {cartShow && <Cart onClose={HideCartHandler} />}
      <Header Click={cartShowHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
