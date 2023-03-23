import React from "react";
import imageMeals from "../../assests/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
export default function Header(props) {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeal</h1>
        <HeaderCartButton onClick={props.Click} />
      </header>
      <div className={classes["main-image"]}>
        <img src={imageMeals} />
      </div>
    </>
  );
}
