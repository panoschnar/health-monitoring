import React, { useState, FormEvent } from "react";
import styles from "./loginmodal.module.css";
import button from "../../app/buttons.module.css";
import { useUser } from "../../context/UserContext"; // Import the context

interface FormData {
  username: string;
  password: string;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialFormData: FormData = {
  username: "",
  password: "",
};

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { login } = useUser(); 
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!formData.username || !formData.password) {
      setError("Both fields are required.");
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      const token = data?.access_token;

      if (token) {
        localStorage.setItem("access_token", token);
        login(token); 
        onClose();
      } else {
        setError("Invalid credentials or missing token.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.title}>Login</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="username" className={styles.label}>
            Username
          </label>
          <input
            type="username"
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className={styles.input}
          />
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className={styles.input}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={button.primary}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
