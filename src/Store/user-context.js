import React, { createContext } from "react";

const CartContext = createContext({
  items: [],
  totalAmount: 0,
  AddItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});
export default CartContext;
