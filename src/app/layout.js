import { Jaini } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const jaini = Jaini({
  variable: "--font-sans",
  weight: ["400"],
  subsets: ["latin"] // optional but recommended
});

export const metadata = {
  title: "Tirian Trains",
  description: "Narnian Railway System. Always on time, never late, and never delayed",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${jaini.variable} antialiased`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
