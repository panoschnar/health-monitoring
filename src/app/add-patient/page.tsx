"use client";
import React, { useState } from "react";
import styles from "./addpatient.module.css";
import button from "../buttons.module.css";
import { backArrowIcon } from "../../../public/icons";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { IFormData } from "@/utils/interfaces";
import { initialFormData, validateForm } from "@/utils/helper";

const Page = () => {
  const { isLoggedIn, access_token } = useUser();
  const [formData, setFormData] = useState<IFormData>(initialFormData);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    const validationError = validateForm(formData);
    if (validationError) {
      setError(validationError);
      return;
    }
    if (isLoggedIn && access_token) {
      setLoading(true);
      try {
        const response = await fetch("/api/add-patient", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            frontendData: formData,
            access_token: access_token,
          }),
        });
        if (response.status === 200) {
          router.replace("/");
        }
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to create patient. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setError("");
  };
  if (!isLoggedIn || !access_token) {
    return (
      <div className={styles.container}>
        <div className={styles.titleBox}>
          <h4>Please Log In to procced!</h4>
          <Link className={button.primary} href={"/"}>
            {backArrowIcon}
          </Link>
        </div>
      </div>
    );
  }
  if (loading) {
    return (
      <div className={styles.container}>
        <h4 className={styles.title}>Creating Patient...</h4>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <h4>Patient Details</h4>
        <Link className={button.primary} href={"/"}>
          {backArrowIcon}
        </Link>
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.input}>
            <label className={styles.label}>First Name *</label>
            <input
              type="text"
              placeholder="First Name"
              value={formData.firstname}
              onChange={(e) =>
                setFormData({ ...formData, firstname: e.target.value })
              }
            />
          </div>
          <div className={styles.input}>
            <label className={styles.label}>Last Name *</label>
            <input
              type="text"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
            />
          </div>
          <div className={styles.input}>
            <label className={styles.label}>Email *</label>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className={styles.input}>
            <label className={styles.label}>Facility ID *</label>
            <input
              type="number"
              placeholder="Facility ID"
              value={formData.facility_id}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  facility_id: e.target.value ? parseInt(e.target.value) : 0,
                })
              }
            />
          </div>
          <div className={styles.subBox}>
            <div className={styles.input}>
              <label className={styles.label}>Street</label>
              <input
                type="text"
                placeholder="Street"
                value={formData.address_street}
                onChange={(e) =>
                  setFormData({ ...formData, address_street: e.target.value })
                }
              />
            </div>
            <div className={styles.input}>
              <label className={styles.label}>Number</label>
              <input
                type="text"
                placeholder="Number"
                value={formData.address_number}
                onChange={(e) =>
                  setFormData({ ...formData, address_number: e.target.value })
                }
              />
            </div>
            <div className={styles.input}>
              <label className={styles.label}>City</label>
              <input
                type="text"
                placeholder="City"
                value={formData.address_city}
                onChange={(e) =>
                  setFormData({ ...formData, address_city: e.target.value })
                }
              />
            </div>
            <div className={styles.input}>
              <label className={styles.label}>Postal Code</label>
              <input
                type="text"
                placeholder="Postal Code"
                value={formData.address_postalcode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address_postalcode: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className={styles.subBox}>
            <div className={styles.input}>
              <label className={styles.label}>Phone Number</label>
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phonenumber}
                onChange={(e) =>
                  setFormData({ ...formData, phonenumber: e.target.value })
                }
              />
            </div>
            <div className={styles.input}>
              <label className={styles.label}>Sex</label>
              <select
                value={formData.sex}
                onChange={(e) =>
                  setFormData({ ...formData, sex: e.target.value })
                }
              >
                <option value="">Select Sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className={styles.input}>
              <label className={styles.label}>Age</label>
              <input
                type="number"
                placeholder="Age"
                value={formData.age}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    age: e.target.value ? parseInt(e.target.value) : 0,
                  })
                }
              />
            </div>
            <div className={styles.input}>
              <label className={styles.label}>AMKA</label>
              <input
                type="text"
                placeholder="AMKA"
                value={formData.amka}
                onChange={(e) =>
                  setFormData({ ...formData, amka: e.target.value })
                }
              />
            </div>
          </div>

          {error && <p className={styles.error}>{error}</p>}
        </form>
        <div className={styles.formFooter}>
          <p>Please fill all the required fields *</p>
          <div className={styles.btnBox}>
            <button
              type="button"
              onClick={handleReset}
              className={button.primary}
            >
              Reset
            </button>
            <button
              onClick={() => handleSubmit()}
              className={button.accentButton}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
