import {
  femaleIcon,
  heartRateIcon,
  maleIcon,
  accelIcon,
  bloodPressureIcon,
  detailsIcon,
} from "../../../public/icons";
import styles from "./card.module.css";
import button from "../../app/buttons.module.css";
import Link from "next/link";
import { IPatient } from "@/utils/interfaces";


interface PatientCardProps {
  patient: IPatient;
}

export default function PatientCard({ patient }: PatientCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span>
          {patient.firstname.toUpperCase()} {patient.lastname.toUpperCase()}
        </span>
        {patient.sex === "Male" || patient.sex === "Άνδρας"
          ? maleIcon
          : femaleIcon}
      </div>
      <div className={styles.cardBody}>
        <p className={styles.textInfo}>
          Email: <span> {patient.email ? patient.email : "-"}</span>
        </p>
        <p className={styles.textInfo}>
          Ethnicity: <span> {patient.ethnicity ? patient.ethnicity : "-"}</span>
        </p>
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
            <p>{bloodPressureIcon} Blood Pressure:</p>
            <p>
              {" "}
              <span>
                {patient.sys_blood_pressure}/{patient.dia_blood_pressure}
              </span>
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
      <div className={styles.cardFooter}>
        <Link
          className={button.accentButton}
          href={`/patient/${patient.patient_id}`}
        >
          {detailsIcon}
        </Link>
      </div>
    </div>
  );
}
