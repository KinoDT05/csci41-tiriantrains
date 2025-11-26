import { Jaini } from "next/font/google";
import { Inika } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import NextAuthProvider from "@/providers/NextAuthProvider";

const jaini = Jaini({
  variable: "--font-header",
  weight: ["400"],
  subsets: ["latin"] // optional but recommended
});

const inika = Inika({
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
      <body className={`${jaini.variable} ${inika.variable} antialiased`}>
              <NextAuthProvider>
              <NavBar />
                  {children}
              </NextAuthProvider>
      </body>
    </html>
  );
}
