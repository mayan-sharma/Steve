import React from "react";
import styles from "./CartItem.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { connect } from "react-redux";
import { removeFromCart } from "../../actions/cartAction";

const CartItem = (props) => {
  const removeHandler = () => {
    props.removeFromCart(props.id);
  };

  const { name, price } = props;
  return (
    <div className={styles.container}>
      <p>{name}</p>
      <p>${price}</p>
      <span className={styles.remove} onClick={removeHandler}>
        <AiOutlineClose />
      </span>
    </div>
  );
};

export default connect(null, { removeFromCart })(CartItem);
