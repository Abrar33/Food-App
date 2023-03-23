import React, { useContext, useState } from "react";
import CartContext from "../../Store/user-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./CheckOut";
export default function Cart(props) {
  const [isSubmitingData, setIsSubmitingData] = useState(false);
  const [didSubmiting, setDidSubmiting] = useState(false);
  const [isCheckout, setIsCheckOut] = useState(false);
  const cartCtx = useContext(CartContext);
  const orderHandler = () => {
    setIsCheckOut(true);
  };
  const submitOrderhandler = async (userData) => {
    setIsSubmitingData(true);
    await fetch(
      "https://react-http-68385-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitingData(false);
    setDidSubmiting(true);
    cartCtx.clearCart();
  };
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const addCartItemHandler = (item) => {
    cartCtx.AddItem(item);
  };
  const CartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={addCartItemHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const cartModalContent = (
    <>
      {CartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderhandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </>
  );
  const submitingModalContent = <p>Sending Data...</p>;
  const didSubmitOrder = (
    <>
      <p>Sucessfully Send The Order</p>;
      <div className={classes.actions}>
        <button className={classes.actions} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );
  return (
    <Modal onClose={props.onClose}>
      {!isSubmitingData && !didSubmiting && cartModalContent}
      {isSubmitingData && submitingModalContent}
      {!isSubmitingData && didSubmiting && didSubmitOrder}
    </Modal>
  );
}
