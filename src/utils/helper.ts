import { IFormData, IMeasurement, MeasurementType } from "./interfaces";

export const ethnicities = [
  'Caucasian',
  'African',
  'Asian',
  'Greek',
  'Hispanic or Latino',
  'Native American',
  'Middle Eastern',
  'Pacific Islander',
  'Mixed',
  'Other',
];

export const initialFormData: IFormData = {
  firstname: "",
  lastname: "",
  email: "",
  address_street: "",
  address_number: "",
  address_city: "",
  address_postalcode: "",
  phone_number: "",
  sex: null, 
  birth_date: "",
  ethnicity: ""
};


export function validateForm(formData: IFormData): string | null {
  if (
    !formData.firstname.trim() ||
    !formData.lastname.trim() ||
    !formData.email.trim() ||
    !formData.address_street.trim() ||
    !formData.address_number.trim() ||
    !formData.address_city.trim() ||
    !formData.address_postalcode.trim() ||
    !formData.phone_number.trim() ||
    !formData?.sex
  ) {
    return "Please fill in all required fields.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    return "Please enter a valid email address.";
  }

  return null; 
}



interface BloodPressureChartDatum {
  date: string;
  [key: string]: string | number | undefined; // Allow dynamic keys
}

export function getBloodPressureChartData(measurements: IMeasurement[]): BloodPressureChartDatum[] {
  if (!Array.isArray(measurements) || measurements.length === 0) {
    return []; // Ensure the function always returns an empty array if no measurements are provided
  }

  const bloodPressureMeasurements = measurements.filter(
    (m) =>
      m.type === MeasurementType.SYS_BLOOD_PRESSURE ||
      m.type === MeasurementType.DIA_BLOOD_PRESSURE
  );

  const grouped: { [date: string]: BloodPressureChartDatum } = {};

  for (const m of bloodPressureMeasurements) {
    const dateOnly = m.date.slice(0, 10); // extract 'YYYY-MM-DD'

    if (!grouped[dateOnly]) {
      grouped[dateOnly] = { date: dateOnly };
    }

    grouped[dateOnly][m.type] = m.value;
    grouped[dateOnly][m.type as string] = m.value; // Explicitly cast m.type to string
  }

  // Return as sorted array
  return Object.values(grouped).sort((a, b) => a.date.localeCompare(b.date));
}

export const fetcher = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const res = await fetch(url, options);

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.error || "An unexpected error occurred");
  }

  return res.json();
};
