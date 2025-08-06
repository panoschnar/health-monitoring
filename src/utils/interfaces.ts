export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  role: Role;
}
enum Role {
  Admin = "admin",
  Doctor = "doctor",
  Nurse = "nurse",
}

export interface IPatient {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  sex: SexType;
  address_street: string;
  address_number: string;
  address_city: string;
  address_postalcode: string;
  phone_number: string;
  birth_date: string; // ISO string;
  ethnicity: string;

  // Optional latest measurements
  heart_rate?: number;
  sys_blood_pressure?: number;
  dia_blood_pressure?: number;
  z_accel?: number;

  measurements: IMeasurement[];
  notes: INote[];
}
interface INote {
  id: number;
  patientId: number;
  createdAt: string; // ISO string
  content: string;
  authorID: number;
}
export enum SexType {
  male = "Male",
  female = "Female",
  other = "Other",
}
export enum MeasurementType {
  HEART_RATE = "HEART_RATE",
  SYS_BLOOD_PRESSURE = "SYS_BLOOD_PRESSURE",
  DIA_BLOOD_PRESSURE = "DIA_BLOOD_PRESSURE",
  Z_ACCEL = "Z_ACCEL",
}
export interface IMeasurement {
  id: number;
  patientId: number;
  date: string; // ISO string
  type: MeasurementType;
  value: number;
}
export interface IFormData {
  firstname: string;
  lastname: string;
  email: string;
  sex: SexType | null;
  address_street: string;
  address_number: string;
  address_city: string;
  address_postalcode: string;
  phone_number: string;
  birth_date: string; // ISO string;
  ethnicity: string;
}

export interface MyJwtPayload {
  userId: number;
  username: string;
  role: string;
  iat: number;
  exp: number;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
