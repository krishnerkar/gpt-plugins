import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";

export const metadata = {
  title: "GPT Plugins",
  description: "A collection of all chatgpt plugins",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
