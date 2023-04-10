import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "GPT Plugins",
  description: "A collection of all chatgpt plugins",
  openGraph: {
    title: "GPT Plugins",
    description: "A collection of all chatgpt plugins",
    type: "website",
    url: "https://gpt-plugins.vercel.app/",
    images: [
      {
        url: "https://gpt-plugins.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "GPT Plugins",
      },
    ],
  },
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
