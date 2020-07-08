import React from "react";
// import "./NavBar.css";
import styles from "./NavBar.module.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authAction";

const NavBar = (props) => {
  const linkStyle = {
    textDecoration: "none",
    color: "#000",
  };
  return (
    <div className={styles.container}>
      <h2>
        <Link to="/" style={linkStyle}>
          STEVE
        </Link>
      </h2>
      {props.isAuthenticated ? (
        <ul>
          <li>SEARCH</li>
          <li>
            <Link to="/products" style={linkStyle}>
              CATALOG
            </Link>
          </li>
          <li>
            <Link to="/cart" style={linkStyle}>
              CART
            </Link>
          </li>
          <li>
            <span onClick={props.logoutUser}>LOGOUT</span>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/products" style={linkStyle}>
              CATALOG
            </Link>
          </li>
          <li>SEARCH</li>
          <li>
            <Link to="/login" style={linkStyle}>
              LOGIN
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logoutUser })(NavBar);
