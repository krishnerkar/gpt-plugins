"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Chat() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Navbar />
      <main className="isolate">

        <div className="mx-auto flex flex-col items-center max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
            Chat is coming soon!
          </h1>
        </div>
      </main>
      <Footer />
    </div>
  );
}
