import React, { Component } from "react";
import { connect } from "react-redux";
import { getCart } from "../../actions/cartAction";
import CartItem from "./CartItem";
import styles from "./Cart.module.css";
import Loading from "../loading/Loading";
// import { Redirect } from "react-router-dom";

class Cart extends Component {
  componentDidMount() {
    console.log(this.props);
    if (!this.props.userLoading) {
      this.props.getCart();
    }
  }

  render() {
    // if (!this.props.isAuthenticaed) {
    //   return <Redirect to="/" />;
    // }
    const items = this.props.products;
    let total = 0;
    items.forEach((item) => (total += item.price));
    return (
      <div className={styles.container}>
        <h1>CART</h1>
        <div>
          {this.props.cartLoading ? (
            <Loading />
          ) : (
            <div className={styles.items}>
              {items.length ? (
                items.map((item) => (
                  <CartItem
                    key={item._id}
                    name={item.name}
                    price={item.price}
                    id={item._id}
                  />
                ))
              ) : (
                <p>No items in cart</p>
              )}
            </div>
          )}
        </div>
        <div className={styles.info}>
          <p>Items: {items.length}</p>
          <p>Total: ${total}</p>
          <button>Next Step</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userLoading: state.auth.isLoading,
  products: state.cart.products,
  cartLoading: state.cart.isLoading,
  isAuthenticaed: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getCart })(Cart);
