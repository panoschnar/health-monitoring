"use client";
import styles from "./page.module.css";
import button from "./buttons.module.css";
import { useEffect, useState } from "react";
import { addIcon } from "../../public/icons";
import Link from "next/link";
import PatientCard from "@/components/PatientCard/PatientCard";
import { useUser } from "@/context/UserContext";
import { IPatient } from "@/utils/interfaces";


export default function Home() {
  const { isLoggedIn, access_token } = useUser();
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn || !access_token || loading) return;
  
    setLoading(true);
  
    fetch("/api/get-all-patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ access_token }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPatients(data);
      })
      .catch((err) => console.error("Error fetching patients:", err))
      .finally(() => setLoading(false));
  }, [isLoggedIn, access_token]);
  
  if (!isLoggedIn) {
    return (
      <div className={styles.container}>
        <h4 className={styles.title}>Please log in to view patients!</h4>
      </div>
    );
  }
  if (loading) {
    return (
      <div className={styles.container}>
        <h4 className={styles.title}>Loading patients...</h4>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <h4 className={styles.title}>Remote Health Monitoring</h4>
        <Link className={button.primary} href={"/add-patient"}>
          {addIcon} Add Patient
        </Link>
      </div>
      <div className={styles.cardsContainer}>
        {Array.isArray(patients) && patients.length > 0 ? (
          patients.map((patient, key) => (
            <PatientCard key={key} patient={patient} />
          ))
        ) : (
          <p>No patients found.</p>
        )}
      </div>
    </div>
  );
}
