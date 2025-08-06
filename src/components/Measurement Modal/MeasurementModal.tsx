import React, { useState, FormEvent } from "react";
import styles from "./measureModal.module.css";
import button from "../../app/buttons.module.css";
import { ModalProps } from "@/utils/interfaces";
import { MeasurementType } from "@/utils/interfaces";
import { useUser } from "@/context/UserContext";

type MeasurementValues = Partial<Record<MeasurementType, number>>;

const initialMeasurements: MeasurementValues = {
  [MeasurementType.HEART_RATE]: undefined,
  [MeasurementType.SYS_BLOOD_PRESSURE]: undefined,
  [MeasurementType.DIA_BLOOD_PRESSURE]: undefined,
  [MeasurementType.Z_ACCEL]: undefined,
};

const MeasurementModal = ({
  isOpen,
  onClose,
  patientId,
}: ModalProps & { patientId: any }) => {
  const { access_token } = useUser();

  const [measurements, setMeasurements] =
    useState<MeasurementValues>(initialMeasurements);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (type: MeasurementType, value: string) => {
    setMeasurements((prev) => ({
      ...prev,
      [type]: value === "" ? undefined : Number(value),
    }));
  };

  const handleReset = () => {
    setMeasurements(initialMeasurements);
    setError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const payload = Object.entries(measurements)
      .filter(([, value]) => value !== undefined && !isNaN(value as number))
      .map(([type, value]) => ({
        type,
        value: value as number,
        date: new Date(date).toISOString(),
        patientId,
      }));

    if (payload.length === 0) {
      setError("Please fill at least one measurement.");
      return;
    }

    try {
      const res = await fetch("/api/measurement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_token: access_token,
          measurements: payload,
        }),
      });

      if (!res.ok) throw new Error("Failed to save measurements");

      setMeasurements(initialMeasurements);
      onClose();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.title}>Add Patient's Measurements</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.dateInput}>
            <label>Date: </label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className={styles.subBox}>
            {Object.values(MeasurementType).map((type, idx) => (
              <div key={idx} className={styles.input}>
                <label key={type}>
                  {type.replace(/_/g, " ").toUpperCase()}:
                </label>
                <input
                  type="number"
                  value={measurements[type] ?? ""}
                  onChange={(e) => handleChange(type, e.target.value)}
                  placeholder="Optional"
                />
              </div>
            ))}
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.formFooter}>
            <div className={styles.btnBox}>
              <button
                type="button"
                onClick={handleReset}
                className={button.primary}
              >
                Reset
              </button>
              <button
                onClick={(e) => handleSubmit(e)}
                className={button.accentButton}
              >
                Save Measurements
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MeasurementModal;
