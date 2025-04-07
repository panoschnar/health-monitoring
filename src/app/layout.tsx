import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import { UserProvider } from "@/context/UserContext";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body>
          <div className="mainContainer">
            <div className="main">
              <NavBar />
              {children}
              <Footer />
            </div>
          </div>
        </body>
      </UserProvider>
    </html>
  );
}
