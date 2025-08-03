import React from "react";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.main}>
      <nav className={styles.nav}>
        <h3 className="navText" id="nav1">
          <a href="#home" className={styles.navText}>
            home
          </a>
        </h3>
        <h3 className="navText" id="nav2">
          <a href="#about" className={styles.navText}>
            about
          </a>
        </h3>
        <h3 className="navText" id="nav3">
          <a href="#film" className={styles.navText}>
            film
          </a>
        </h3>
        <h3 className="navText" id="nav4">
          <a href="#services" className={styles.navText}>
            services
          </a>
        </h3>
      </nav>
    </div>
  );
};

export default Navbar;
