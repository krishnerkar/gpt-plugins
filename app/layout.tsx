import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "GPT Plugins",
  description: "A collection of all chatgpt plugins",
  twitter: {
    card: "summary_large_image",
    title: "GPT Plugins",
    description: "A collection of all chatgpt plugins",
    creator: "@krishnerkar",
    images: ["https://www.gptplugins.app/og.png"],
  },
  openGraph: {
    title: "GPT Plugins",
    description: "A collection of all chatgpt plugins",
    type: "website",
    url: "https://www.gptplugins.app/",
    images: [
      {
        url: "https://www.gptplugins.app/og.png",
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
