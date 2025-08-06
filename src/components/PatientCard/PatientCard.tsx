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
import { format } from "date-fns";
import { IPatient, SexType } from "@/utils/interfaces";

interface PatientCardProps {
  patient: IPatient;
}

export default function PatientCard({ patient }: PatientCardProps) {
  return (
    <div className={styles.card}>
      <div>
        <div className={styles.cardHeader}>
          <span>
            {patient.lastname.toUpperCase()} {patient.firstname.toUpperCase()}
          </span>
          {patient.sex === SexType.male ? maleIcon : femaleIcon}
        </div>
        <div>
          <p className={styles.textInfo}>
            Email: <span> {patient.email ? patient.email : "-"}</span>
          </p>
          <p className={styles.textInfo}>
            Phone:{" "}
            <span> {patient.phone_number ? patient.phone_number : "-"}</span>
          </p>
          <p className={styles.textInfo}>
            Address:{" "}
            <span>
              {" "}
              {patient.address_street} {patient.address_number},{" "}
              {patient.address_city}
            </span>
          </p>
         
          <p className={styles.textInfo}>
            Birthday:{" "}
            <span> {patient.birth_date ? format(new Date(patient.birth_date), "dd/MM/yyyy") : "-"}</span>
          </p>
          <p className={styles.textInfo}>
            Ethnicity:{" "}
            <span> {patient.ethnicity ? patient.ethnicity : "-"}</span>
          </p>
        </div>
      </div>

      <div className={styles.cardBody}>
        {(patient.heart_rate ||
          patient.sys_blood_pressure ||
          patient.dia_blood_pressure ||
          patient.z_accel) && (
          <h4 className={styles.subTitle}>Last Measurements</h4>
        )}
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
              <span>{Number(patient.z_accel).toFixed(2)}</span> m/s<sup>2</sup>
            </p>
          </div>
        )}
      </div>
      <div className={styles.cardFooter}>
        <Link className={button.accentButton} href={`/patient/${patient.id}`}>
          {detailsIcon}
        </Link>
      </div>
    </div>
  );
}
