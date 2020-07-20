import React from "react";
import NavBar from "./components/navbar/NavBar";
import Menu from "./components/dashboard/menu/Menu";
import Path from "./components/dashboard/path/Path";
import Products from "./components/dashboard/products/Products";
import ProductDetail from "./components/dashboard/productDetail/ProductDetail";
import Cart from "./components/cart/Cart";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { connect } from "react-redux";
import { loadUser } from "./actions/authAction";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
  componentDidMount() {
    document.body.style = "background: rgb(145, 145, 145, 0.6)";
    this.props.loadUser();
  }

  static propTypes = {
    loadUser: PropTypes.func.isRequired,
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/products">
            <Menu />
            <Path path="/ Home / Products" />
            <Products />
          </Route>
          <Route path="/products/:id" component={ProductDetail} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/cart" exact component={Cart} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default connect(null, { loadUser })(App);
