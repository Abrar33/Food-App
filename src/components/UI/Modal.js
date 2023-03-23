import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
const BackDrops = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};
const ModalOverLays = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
const portalElement = document.getElementById("overlays");
export default function Modal(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrops onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverLays>{props.children}</ModalOverLays>,
        portalElement
      )}
    </>
  );
}
