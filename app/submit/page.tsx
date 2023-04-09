/* eslint-disable @next/next/no-img-element */
"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState, FormEvent } from "react";
import { Toaster, toast } from "sonner";

export default function Add() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("/api/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, url }),
    });

    if (response.status === 200) {
      const result = await response.json();
      toast.success(`Plugin submitted successfully!`);
      setUrl("");
      setName("");
    } else {
      toast.error("Error: Failed to add plugin");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Navbar />
      <div>
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <Link href="/">
              <img
                className="mx-auto h-12 w-auto"
                src="/logo.svg"
                alt="Your Company"
              />
            </Link>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Submit a plugin
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Your plugin will be reviewed by the team before addition{" "}
            </p>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                action="#"
                method="POST"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Zapier"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="url"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Plugin URL
                  </label>
                  <div className="mt-2">
                    <input
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      id="url"
                      name="url"
                      type="url"
                      required
                      placeholder="https://nla.zapier.com/.well-known/ai-plugin.json"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    disabled={loading}
                    type="submit"
                    className="disabled:opacity-50 disabled:pointer-events-none flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {loading ? (
                      <div
                        className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status"
                      >
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                          Loading...
                        </span>
                      </div>
                    ) : (
                      <p>Submit Plugin</p>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
      <Footer />
    </div>
  );
}
