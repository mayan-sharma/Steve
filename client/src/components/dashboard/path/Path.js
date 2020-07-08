import React from "react";
import styles from "./Path.module.css";

function Path(props) {
  return (
    <div className={styles.container}>
      <p>{props.path}</p>
    </div>
  );
}

export default Path;
