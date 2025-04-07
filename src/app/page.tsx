"use client";
import styles from "./page.module.css";
import button from "./buttons.module.css";
import { useEffect, useState } from "react";
import { addIcon } from "../../public/icons";
import Link from "next/link";
import PatientCard from "@/components/PatientCard/PatientCard";
import { useUser } from "@/context/UserContext";
import { IPatient } from "@/utils/interfaces";

// const patients: IPatient[] = [
//   {
//     firstname: "Panagiotis",
//     lastname: "Chnarakis",
//     patient_id: 11,
//     heart_rate: "75",
//     sys_blood_pressure: "128",
//     dia_blood_pressure: "97",
//     email: "chnapa@gmail.com",
//     sex: "Male",
//     address_street: "Athenian",
//     address_number: "189",
//     address_city: "Athens",
//     address_postalcode: "11631",
//     z_accel: "",
//     ethnicity: ""
//   },
//   {
//     firstname: "Maria",
//     lastname: "Papadopoulos",
//     patient_id: 12,
//     heart_rate: "82",
//     z_accel: "0.5",
//     email: "maria.pap@gmail.com",
//     sex: "Female",
//     address_street: "Patision",
//     address_number: "34",
//     address_city: "Athens",
//     address_postalcode: "11257",
//     sys_blood_pressure: "",
//     dia_blood_pressure: "",
//     ethnicity: ""
//   },
//   {
//     firstname: "John",
//     lastname: "Smith",
//     patient_id: 11,
//     heart_rate: "75",
//     sys_blood_pressure: "128",
//     dia_blood_pressure: "97",
//     email: "jsmith@gmail.com",
//     sex: "Male",
//     address_street: "Syggrou",
//     address_number: "189",
//     address_city: "Athens",
//     address_postalcode: "17673",
//     z_accel: "",
//     ethnicity: ""
//   },
//   {
//     firstname: "Maria",
//     lastname: "Papadopoulos",
//     patient_id: 12,
//     heart_rate: "82",
//     z_accel: "0.5",
//     email: "maria.pap@gmail.com",
//     sex: "Female",
//     address_street: "Patision",
//     address_number: "34",
//     address_city: "Athens",
//     address_postalcode: "11257",
//     sys_blood_pressure: "",
//     dia_blood_pressure: "",
//     ethnicity: ""
//   },
//   {
//     firstname: "Giannis",
//     lastname: "Melanos",
//     patient_id: 13,
//     heart_rate: "90",
//     sys_blood_pressure: "135",
//     dia_blood_pressure: "88",
//     email: "kostas.nik@gmail.com",
//     sex: "Male",
//     address_street: "Tsimiski",
//     address_number: "87",
//     address_city: "Thessaloniki",
//     address_postalcode: "54622",
//     z_accel: "",
//     ethnicity: ""
//   },
// ];

export default function Home() {
  const { isLoggedIn, access_token } = useUser();
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn && access_token) {
      setLoading(true);
      fetch("/api/get-all-patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ access_token: access_token }),
      })
        .then((response) => response.json())
        .then((data) => {
          setPatients(data.patients);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching patients:", error);
          setLoading(false);
        });
    }
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
