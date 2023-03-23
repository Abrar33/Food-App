import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../Store/user-context";
import CartIcon from "../Carts/CartIcon";
import classes from "./HeaderCartButton.module.css";
export default function HeaderCartButton(props) {
  const [btnIsHighlighted, setBtnIsHighligted] = useState(false);
  const createCtx = useContext(CartContext);
  const numberOfItems = createCtx.items.reduce((cuNumber, item) => {
    return cuNumber + item.amount;
  }, 0);
  const { items } = createCtx;
  const btnClasses = `${classes.button}  ${
    btnIsHighlighted ? classes.bump : ""
  }`;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighligted(true);
    setTimeout(() => {
      setBtnIsHighligted(false);
    }, 300);
  }, [items]);

  return (
    <>
      <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Your Carts</span>
        <span className={classes.badge}>{numberOfItems}</span>
      </button>
    </>
  );
}
