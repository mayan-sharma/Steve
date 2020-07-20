import React, { Component } from "react";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div></div>
        <div></div>
        <div>
          <Link
            to="/products"
            style={{ textDecoration: "none", color: "#000" }}
          >
            Discover
          </Link>
        </div>
      </div>
    );
  }
}

export default Dashboard;
