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
  const [description, setDescription] = useState("");

  const [tabs, setTabs] = useState([
    {
      name: "Hosted Plugin",
      href: "#",
      current: true,
      id: 0,
    },
    { name: "Open Source Plugin", href: "#", current: false, id: 1 },
  ]);

  const [activeTab, setActiveTab] = useState(0);

  function handleTabClick(index: number) {
    setTabs((prevTabs) =>
      prevTabs.map((tab, idx) => ({ ...tab, current: idx === index }))
    );
    setActiveTab(index);
  }

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("/api/submit/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        url,
        description,
        type: activeTab == 0 ? "hosted" : "open",
      }),
    });

    if (response.status === 200) {
      toast.success(`Plugin submitted successfully!`);
      setUrl("");
      setName("");
      setDescription("");
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
                alt="GPT Plugins"
              />
            </Link>

            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Submit a plugin
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Your plugin will be reviewed by the team before addition{" "}
            </p>
          </div>

          <nav
            className="w-full justify-center mt-8 flex space-x-4"
            aria-label="Tabs"
          >
            {tabs.map((tab, index) => (
              <a
                onClick={() => handleTabClick(index)}
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.current
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-500 hover:text-gray-700",
                  "rounded-md px-3 py-2 text-sm font-medium"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
              </a>
            ))}
          </nav>

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
                      placeholder={activeTab === 0 ? "Zapier" : "GPT Weather"}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {activeTab === 1 && (
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Description
                    </label>
                    <div className="mt-2">
                      <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        id="description"
                        name="description"
                        type="text"
                        required
                        placeholder="Plugin for getting current weather information."
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="url"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {activeTab === 0 ? "Plugin URL" : "GitHub Repository URL"}
                  </label>
                  <div className="mt-2">
                    <input
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      id="url"
                      name="url"
                      type="url"
                      required
                      placeholder={
                        activeTab === 0
                          ? "https://nla.zapier.com/.well-known/ai-plugin.json"
                          : "https://github.com/Doriandarko/gptweather"
                      }
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
