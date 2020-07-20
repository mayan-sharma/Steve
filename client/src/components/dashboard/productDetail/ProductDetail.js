import React from "react";
import img from "../../../assets/test.png";
import styles from "./ProductDetail.module.css";
import { connect } from "react-redux";
import { getProduct } from "../../../actions/productAction";
import { addToCart, getCart } from "../../../actions/cartAction";
import Loading from "../../loading/Loading";

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: "",
    };
    this.addToCartHandler = this.addToCartHandler.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getProduct(id);
    // this.props.getCart();
  }

  componentDidUpdate() {
    if (!this.props.isLoading && !this.state.name.length) {
      const { name, price } = this.props.product;
      this.setState({ name: name, price: price });
    }
  }

  addToCartHandler() {
    const id = this.props.match.params.id;
    this.props.addToCart(id);
  }

  // productInCart = (product) => this.props.cartProducts.includes(product);

  render() {
    return this.props.isLoading ? (
      <Loading />
    ) : (
      <div className={styles.container}>
        <div>
          <img src={img} alt="product" />
        </div>
        <div className={styles.info}>
          <h1>{this.state.name}</h1>
          <p>
            Praesent massa mauris, porttitor at metus non, hendrerit pretium
            orci. Duis pharetra mauris volutpat, consequat sapien a, mollis
            enim. Donec facilisis ex risus, at rhoncus libero auctor nec.
          </p>
          <p>$ {this.state.price}</p>
          {/* <select name="options">
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="black">Black</option>
          </select> */}
          <button
            disabled={!this.props.isAuthenticated}
            onClick={this.addToCartHandler}
          >
            ADD TO CART
          </button>
          {!this.props.isAuthenticated && (
            <p className={styles.disclaimer}>*Login to access cart</p>
          )}
          {/* {this.productInCart(this.props.product) && (
            <p className={styles.disclaimer}>* Item already in cart</p>
          )} */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.products.activeProduct,
  isLoading: state.products.isLoading,
  isAuthenticated: state.auth.isAuthenticated,
  cartProducts: state.cart.products,
});

export default connect(mapStateToProps, { getProduct, addToCart, getCart })(
  ProductDetail
);
