export interface IPatient {
    firstname: string;
    lastname: string;
    patient_id: number;
    heart_rate: string;
    sys_blood_pressure: string;
    dia_blood_pressure: string;
    z_accel: string;
    email: string;
    sex: string;
    address_street: string;
    address_number: string;
    address_city: string;
    address_postalcode: string;
    ethnicity: string;
  }

  export interface IFormData {
    firstname: string;
    lastname: string;
    email: string;
    facility_id: number;
    address_street: string;
    address_number: string;
    address_city: string;
    address_postalcode: string;
    phonenumber: string;
    sex: string;
    age: number;
    amka: string;
    ext_patient: boolean;
  }
  
  