import React, { Component } from "react";
import styles from "./Menu.module.css";

class Menu extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div>
          <p>CLOTHES</p>
        </div>
        <div>
          <p>ELECTRONICS</p>
        </div>
        <div>
          <p>ASSESSORIES</p>
        </div>
        <div>
          <p>BOOKS</p>
        </div>
        <div>
          <p>LIFESTYLE</p>
        </div>
      </div>
    );
  }
}

export default Menu;
