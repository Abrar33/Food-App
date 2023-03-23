import classes from "./Checkout.module.css";
import React, { useRef, useState } from "react";
const isEmpty = (value) => value.trim() === "";
const isFiveChar = (value) => value.trim().length === 5;
const Checkout = (props) => {
  const [formInputValadity, setFormValadity] = useState({
    name: true,
    city: true,
    street: true,
    postalCode: true,
  });
  const nameInputRef = useRef();
  const cityInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const entereNameIsValid = !isEmpty(enteredName);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = isFiveChar(enteredPostalCode);
    setFormValadity({
      name: entereNameIsValid,
      city: enteredCityIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalCodeIsValid,
    });
    const formIsValid =
      entereNameIsValid &&
      enteredCityIsValid &&
      enteredStreetIsValid &&
      enteredPostalCodeIsValid;
    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      city: enteredCity,
      street: enteredStreet,
      postalCode: enteredPostalCode,
    });
  };
  const nameClass = `${classes.control} ${
    formInputValadity.name ? "" : classes.invalid
  }`;
  const streetClass = `${classes.control} ${
    formInputValadity.street ? "" : classes.invalid
  }`;
  const cityClass = `${classes.control} ${
    formInputValadity.city ? "" : classes.invalid
  }`;
  const postalCodeClass = `${classes.control} ${
    formInputValadity.postalCode ? "" : classes.invalid
  }`;
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClass}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValadity.name && <p>Write the Name</p>}
      </div>
      <div className={streetClass}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValadity.street && <p>write the street </p>}
      </div>
      <div className={postalCodeClass}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputValadity.postalCode && (
          <p>Please entered the valid postal Code</p>
        )}
      </div>
      <div className={cityClass}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValadity.city && <p>Please entered the valid City</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
