## Patients Health Monitoring App
This module allows authenticated users to register new patients into the system via a structured form. It is built with **Next.js**, uses **React hooks**, and includes validation and authentication logic.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Features

-  Log In with protected route using user authentication (`useUser` context).
-  On Landing Page view all Patients List
-  On view details navigate to a Patient Details Page
-  Add Patient through form includes:
  - Personal info (name, age, AMKA)
  - Contact info (phone, email)
  - Address details (street, number, city, postal code)
  - Facility ID, gender, external patient flag

## Technologies

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [CSS Modules](https://github.com/css-modules/css-modules)
- Custom `UserContext` for authentication state

## Screeshots
![Landing Page with Patients List](/public/patientsList.jpg)
![Patient Details Page](/public/patientDetails.jpg)
![Patient Registration Form](/public/addPatient.jpg)

