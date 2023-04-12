/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import Navbar from "@/components/Navbar";
import { SimplePlugin } from "@/pages/api/getPlugins";
import { Result } from "@/pages/api/getByName";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Clipboard } from "lucide-react";
import copy from "clipboard-copy";
import Footer from "@/components/Footer";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Metadata, ResolvingMetadata } from "next";

export default function PluginContent({ name }: { name: string }) {
  const [data, setData] = useState<SimplePlugin>();
  const [loading, setLoading] = useState(false);
  const [activeContent, setActiveContent] = useState("");

  const [loadingJSON, setLoadingJSON] = useState(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const fallbackImageUrl = "/fallback.svg";
    e.currentTarget.src = fallbackImageUrl;
  };

  const [tabs, setTabs] = useState([
    {
      name: "Plugin JSON",
      href: "#",
      current: true,
      content: "",
    },
    { name: "OpenAPI", href: "#", current: false, content: "" },
  ]);

  useEffect(() => {
    if (!data) return;
    setLoadingJSON(true);
    fetch(`/api/fetch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: data.url,
      }),
    }).then((res) => {
      res.json().then((data: { plugin: string; openapi: string }) => {
        const plugin = JSON.parse(data.plugin);
        const openapi = JSON.parse(data.openapi);

        setTabs((prevTabs) => [
          { ...prevTabs[0], content: plugin },
          { ...prevTabs[1], content: openapi },
        ]);

        setLoadingJSON(false);
      });
    });
  }, [data]);

  useEffect(() => {
    const activeTab = tabs.find((tab) => tab.current);
    setActiveContent(activeTab?.content || tabs[0].content);
  }, [tabs]);

  function handleTabClick(index: number) {
    setTabs((prevTabs) =>
      prevTabs.map((tab, idx) => ({ ...tab, current: idx === index }))
    );
  }

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    if (!data) {
      setLoading(true);
      fetch(`/api/getByName?name=${name}`).then((res) => {
        if (res.ok) {
          res.json().then((data: Result) => {
            if (data.error) {
              toast.error(data.error);
              return;
            }
            if (!data.data) return;
            setData(data.data);
          });
        } else {
          res.json().then((data: Result) => {
            if (data.error) {
              toast.error(data.error);
              return;
            } else {
              toast.error("Something went wrong");
            }
          });
        }
        setLoading(false);
      });
    }
  }, [data, name]);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-6 lg:px-8 w-full">
        <div>
          <div>
            <nav className="sm:hidden" aria-label="Back">
              <Link
                href="/"
                className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                <ChevronLeftIcon
                  className="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                Back
              </Link>
            </nav>
            <nav className="hidden sm:flex" aria-label="Breadcrumb">
              <ol role="list" className="flex items-center space-x-4">
                <li>
                  <div className="flex">
                    <Link
                      href="/"
                      className="text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                      Plugins
                    </Link>
                  </div>
                </li>

                <li>
                  <div className="flex items-center">
                    <ChevronRightIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <a
                      href="#"
                      aria-current="page"
                      className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                      {data?.name}
                    </a>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          <div className="mt-10 md:flex gap-4 md:items-center md:justify-between">
            {loading ? (
              <div className="w-16 h-16 bg-gray-200 rounded-sm animate-pulse"></div>
            ) : (
              <img
                onError={handleImageError}
                src={data?.logo}
                width={60}
                className="rounded-sm"
              />
            )}
            <div className="min-w-0 flex-1">
              {loading ? (
                <div className="h-8 bg-gray-200 w-1/3 rounded-md animate-pulse"></div>
              ) : (
                <h2 className="text-2xl mt-6 md:mt-0 font-bold leading-7 text-gray-900 sm:truncate sm:text-4xl sm:tracking-tight">
                  {data?.name}
                </h2>
              )}
            </div>
          </div>
          {loading ? (
            <>
              <div className="h-4 bg-gray-200 w-1/4 rounded-sm animate-pulse mt-4"></div>
              <div className="h-4 bg-gray-200 w-1/2 rounded-sm animate-pulse mt-4"></div>
            </>
          ) : (
            <p className="text-slate-900 text-md mt-6 max-w-lg">
              {data?.description}
            </p>
          )}

          {!loading && (
            <div className="mt-4 flex items-center">
              <input
                className="py-3 px-4 rounded-md w-full md:w-1/2  text-gray-500"
                value={data?.url || ""}
                disabled
              />
              <button
                onClick={() => {
                  void copy(data?.url || "").then(() => {
                    toast.success("Copied plugin URL to clipboard!");
                  });
                }}
                style={{
                  marginLeft: "-45px",
                }}
                className="disabled:opacity-50 disabled:pointer-events-none flex justify-center rounded-md bg-indigo-600 px-2 h-full py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <Clipboard size={20} />
              </button>
            </div>
          )}
        </div>

        {!loading && (
          <div className="mt-8">
            <nav className="flex space-x-4" aria-label="Tabs">
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
            <ScrollArea className="bg-gray-50 h-full border rounded-md mt-6 p-4">
              {!loadingJSON && !loading ? (
                <pre className="text-gray-500">
                  {JSON.stringify(activeContent, null, 2)}
                </pre>
              ) : (
                <div className="h-24 w-full bg-gray-200 animate-pulse"></div>
              )}
            </ScrollArea>
          </div>
        )}
      </main>
      <Toaster />
      <Footer />
    </>
  );
}
