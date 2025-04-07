"use client";
import React, { useState } from "react";
import styles from "./navbar.module.css";
import button from "../../app/buttons.module.css";
import Link from "next/link";
import { logoIcon, userIcon, notificationIcon } from "../../../public/icons";
import LoginModal from "../Login Modal/LoginModal";
import { useUser } from "../../context/UserContext"; 

const NavBar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { isLoggedIn, logout } = useUser(); 

  return (
    <div className={styles.container}>
      <div className={styles.logoBox}>
        <Link href={"/"}>{logoIcon}</Link>
      </div>
      <div className={styles.notifUserBox}>
        <button className={button.primary}>{notificationIcon}</button>

        {isLoggedIn ? (
          <button className={button.primary} onClick={logout}>
            {userIcon} <span>Log Out</span> 
          </button>
        ) : (
          <button className={button.primary} onClick={() => setIsLoginOpen(true)}>
            {userIcon} <span>Log In</span>
          </button>
        )}
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
};

export default NavBar;
