import React from "react";
import img from "../../../assets/test.png";
import styles from "./Products.module.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Product = ({ id, name, price }) => {
  return (
    <React.Fragment>
      <Link
        to={`/products/${id}`}
        style={{ textDecoration: "none", color: "#000" }}
      >
        <div className={styles.product}>
          <img alt="img" src={img} />
          <div>
            <p>{name}</p>
            <p>${price}</p>
          </div>
        </div>
      </Link>
    </React.Fragment>
  );
};

export default Product;
