import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import { UserProvider } from "@/context/UserContext";
import { ChatbotWrapper } from "@/utils/ChatBotWrapper";

export const metadata: Metadata = {
  title: "Health Monitoring",
  description: "A Web App for patients",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <ChatbotWrapper/>
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
