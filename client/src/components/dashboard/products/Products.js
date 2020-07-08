import React, { Component } from "react";
import Product from "./Product.js";
import styles from "./Products.module.css";
import { getProducts } from "../../../actions/productAction";
import { connect } from "react-redux";
import Loading from "../../loading/Loading";

class Products extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const products = this.props.products;
    return (
      <div className={styles.container}>
        {this.props.isLoading ? (
          <Loading />
        ) : (
          products.map((product) => (
            <Product
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
            />
          ))
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.products,
  isLoading: state.products.isLoading,
});

export default connect(mapStateToProps, { getProducts })(Products);
