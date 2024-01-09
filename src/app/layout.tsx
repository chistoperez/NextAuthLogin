import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import SessionAuthProvider from "@/context/SessionAuthProvider";
import Navbar from "@/components/molecules/Navbar";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Login App",
  description: "Login App built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <main>
          <SessionAuthProvider>
            <Navbar />
            {children}
          </SessionAuthProvider>
        </main>
      </body>
    </html>
  );
}
