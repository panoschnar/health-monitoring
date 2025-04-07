import { IFormData } from "./interfaces";

export const initialFormData: IFormData = {
  firstname: "",
  lastname: "",
  email: "",
  facility_id: 0,
  address_street: "",
  address_number: "",
  address_city: "",
  address_postalcode: "",
  phonenumber: "",
  sex: "",
  age: 0,
  amka: "",
  ext_patient: true,
};


export function validateForm(formData: IFormData): string | null {
  if (
    !formData.firstname.trim() ||
    !formData.lastname.trim() ||
    !formData.email.trim() ||
    !formData.facility_id ||
    !formData.address_street.trim() ||
    !formData.address_number.trim() ||
    !formData.address_city.trim() ||
    !formData.address_postalcode.trim() ||
    !formData.phonenumber.trim() ||
    !formData.sex ||
    !formData.age ||
    !formData.amka.trim()
  ) {
    return "Please fill in all required fields.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    return "Please enter a valid email address.";
  }

  if (formData.age < 0 || formData.age > 130) {
    return "Please enter a valid age.";
  }

  return null; // No errors!
}