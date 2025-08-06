"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./navbar.module.css";
import button from "../../app/buttons.module.css";
import Link from "next/link";
import {
  logoIcon,
  userIcon,
  notificationIcon,
  logoutIcon,
  settingsIcon,
  profileIcon,
} from "../../../public/icons";
import LoginModal from "../Login Modal/LoginModal";
import { useUser } from "../../context/UserContext";
import { jwtDecode } from "jwt-decode";
import { MyJwtPayload } from "@/utils/interfaces";

const NavBar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { isLoggedIn, logout, access_token } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = access_token ? jwtDecode<MyJwtPayload>(access_token) : null;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);
  return (
    <div className={styles.container}>
      <div className={styles.logoBox}>
        <Link href={"/"}>{logoIcon}</Link>
      </div>
      <div className={styles.notifUserBox}>
        <button className={button.primary}>{notificationIcon}</button>

        {isLoggedIn ? (
          <div className={styles.dropdownWrapper} ref={dropdownRef}>
            <button className={button.userButton} onClick={toggleDropdown}>
              {userIcon}{" "}
              <p>
                Welcome <span>{user?.username}</span>
              </p>
            </button>

            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <Link
                 href={`/profile/${user?.userId}`}
                  className={styles.dropdownItem}
                >
                  {profileIcon}Profile
                </Link>
                <button
                  onClick={() => alert("Open settings")}
                  className={styles.dropdownItem}
                >
                  {settingsIcon}Settings
                </button>
                <button onClick={logout} className={styles.dropdownItem}>
                  {logoutIcon}Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className={button.primary}
            onClick={() => setIsLoginOpen(true)}
          >
            {userIcon} <span>Log In</span>
          </button>
        )}
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
};

export default NavBar;
