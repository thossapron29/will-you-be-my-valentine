import { Outfit, Montserrat } from "next/font/google";
import "./globals.css";
import "./hearts.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Will you be my Valentine?",
  description: "A question for a special person",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${montserrat.variable}`}>
      <body className={outfit.className}>
        <div className="hearts-container">
          <div className="heart"></div>
          <div className="heart"></div>
          <div className="heart"></div>
          <div className="heart"></div>
          <div className="heart"></div>
          <div className="heart"></div>
          <div className="heart"></div>
          <div className="heart"></div>
          <div className="heart"></div>
          <div className="heart"></div>
        </div>
        {children}
      </body>
    </html>
  );
}
