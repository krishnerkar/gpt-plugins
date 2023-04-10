import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "GPT Plugins",
  description: "A collection of all chatgpt plugins",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {children}
        {modal}
      </body>
      <Analytics />
    </html>
  );
}
