"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./patient.module.css";
import button from "../../buttons.module.css";
import {
  accelIcon,
  backArrowIcon,
  bloodPressureIcon,
  heartRateIcon,
} from "../../../../public/icons";
import { useParams } from "next/navigation";
import { useUser } from "@/context/UserContext";
import BloodPressureChart from "@/components/Charts/BloodPressureChart";
import { IPatient } from "@/utils/interfaces";

const page = () => {
  const { id } = useParams();
  const { isLoggedIn, access_token } = useUser();
  const [patient, setPatient] = useState<IPatient>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn && access_token) {
      setLoading(true);
      fetch("/api/get-patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ access_token: access_token, patient_id: id }),
      })
        .then((response) => response.json())
        .then((data) => {
          setPatient(data[0]);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching patients:", error);
          setLoading(false);
        });
    }
  }, [isLoggedIn, access_token]);

if(!isLoggedIn || !access_token){
  return (
    <div className={styles.container}>
        <div className={styles.titleBox}>
          <h4>Please Log In to preview patient!</h4>
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
        <h4>Loading patient...</h4>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className={styles.container}>
        <div className={styles.titleBox}>
          <h4>Patient not found</h4>
          <Link className={button.primary} href={"/"}>
            {backArrowIcon}
          </Link>
        </div>
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
      <div className={styles.mainBox}>
        <h4>{patient.firstname + " " + patient.lastname}</h4>
        <p>
          {patient.address_street +
            " " +
            patient.address_number +
            ", " +
            +patient.address_postalcode +
            ", " +
            patient.address_city}
        </p>
        <div className={styles.metricsContainer}>
          {patient.heart_rate && (
            <div className={styles.metricBox}>
              <p>{heartRateIcon} Heart Rate:</p>
              <p>
                {" "}
                <span>{patient.heart_rate}</span> bpm
              </p>
            </div>
          )}
          {patient.sys_blood_pressure && (
            <div className={styles.metricBox}>
              <p>{bloodPressureIcon} SYS Blood Pressure:</p>
              <p>
                {" "}
                <span>{patient.sys_blood_pressure}</span> mm/Hg
              </p>
            </div>
          )}
          {patient.dia_blood_pressure && (
            <div className={styles.metricBox}>
              <p>{bloodPressureIcon} DIA Blood Pressure:</p>
              <p>
                {" "}
                <span>{patient.dia_blood_pressure}</span> mm/Hg
              </p>
            </div>
          )}
          {patient.z_accel && (
            <div className={styles.metricBox}>
              <p>{accelIcon} Z Accel:</p>
              <p>
                {" "}
                <span>{patient.z_accel}</span> m/s<sup>2</sup>
              </p>
            </div>
          )}
        </div>
      </div>
      <div className={styles.mainBox}>
      <BloodPressureChart/>
      </div>
    </div>
  );
};

export default page;
