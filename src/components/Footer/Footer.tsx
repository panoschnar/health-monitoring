import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <p>
        All rights reserved Health Monitoring
        <span> &#169;{` ${new Date().getFullYear()}`}</span>
      </p>
    </div>
  );
};

export default Footer;
