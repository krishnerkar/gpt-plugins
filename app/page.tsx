/* eslint-disable @next/next/no-img-element */
"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PluginCard from "@/components/ui/PluginCard";
import PluginCardSkeleton from "@/components/ui/PluginCardSkeleton";
import { SimplePlugin } from "@/pages/api/getPlugins";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import debounce from "@/lib/debounce";
import DevloperPluginCard from "@/components/ui/DeveloperPluginCard";
import { SimpleOSPlugin } from "@/pages/api/getOSPlugins";

export default function HomePage() {
  const [data, setData] = useState<SimplePlugin[]>();
  const [oSPlugins, setOSPlugins] = useState<SimpleOSPlugin[]>([]);
  const [loading, setLoading] = useState(false);

  const [searchResults, setSearchResults] = useState<
    SimplePlugin[] | SimpleOSPlugin[]
  >([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [tabs, setTabs] = useState([
    {
      name: "Published Plugins",
      href: "#",
      current: true,
      id: 0,
    },
    { name: "Open Source Plugins", href: "#", current: false, id: 1 },
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

  const fetchSearchResults = async (query: string) => {
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }
    setSearchLoading(true);
    const response = await fetch(
      `/api/search?q=${query}&type=${activeTab == 0 ? "hosted" : "open"}`
    );
    const data = await response.json();
    setSearchResults(data);
    setSearchLoading(false);
  };

  const handleInputChange = debounce((e) => {
    setSearchQuery(e.target.value);
    setSearchLoading(true);
    fetchSearchResults(e.target.value);
  }, 300);

  useEffect(() => {
    if (!data) {
      setLoading(true);
      fetch("/api/getPlugins").then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setData(data);
          });
        } else {
          toast.error("Something went wrong");
        }
      });

      fetch("/api/getOSPlugins").then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setOSPlugins(data);
          });
        } else {
          toast.error("Something went wrong");
        }
        setLoading(false);
      });
    }
  }, [data]);

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-6 lg:px-8 w-full">
        <form className="relative flex flex-1" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <MagnifyingGlassIcon
            className="pointer-events-none absolute inset-y-0 left-4 h-full w-5 text-gray-400"
            aria-hidden="true"
          />
          <div className="flex items-center w-full gap-6">
            <input
              onChange={handleInputChange}
              id="search-field"
              className="block bg-slate-100  h-full w-full border-0 py-4 rounded-md pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
              placeholder={
                !data
                  ? ""
                  : `Search ${
                      activeTab == 0 ? data?.length : oSPlugins.length
                    } plugins`
              }
              disabled={!data}
              type="search"
              name="search"
            />
            {/* {searchLoading && (
              <div
                className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            )} */}
          </div>
        </form>

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
            {activeTab === 0 ? (
              <div className="mt-10 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-center">
                {loading ? (
                  <>
                    <PluginCardSkeleton />
                    <PluginCardSkeleton />
                    <PluginCardSkeleton />
                  </>
                ) : searchQuery.length > 0 ? (
                  searchResults?.map((plugin) => (
                    <PluginCard
                      key={plugin.id}
                      name={plugin.name}
                      description={plugin.description}
                      //@ts-expect-error
                      logo={plugin?.logo}
                    />
                  ))
                ) : (
                  data?.map((plugin) => (
                    <PluginCard
                      key={plugin.id}
                      name={plugin.name}
                      description={plugin.description}
                      logo={plugin.logo}
                    />
                  ))
                )}
              </div>
            ) : (
              <div className="mt-10 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-center">
                {loading ? (
                  <>
                    <PluginCardSkeleton />
                    <PluginCardSkeleton />
                    <PluginCardSkeleton />
                  </>
                ) : searchQuery.length > 0 ? (
                  searchResults?.map((plugin) => (
                    <DevloperPluginCard
                      key={plugin.id}
                      name={plugin.name}
                      description={plugin.description}
                      //@ts-expect-error
                      githubUrl={plugin.githubURL}
                      //@ts-expect-error
                      authorGithubUsername={plugin.githubURL.split("/")[3]}
                    />
                  ))
                ) : (
                  oSPlugins?.map((plugin) => (
                    <DevloperPluginCard
                      key={plugin.id}
                      name={plugin.name}
                      description={plugin.description}
                      githubUrl={plugin.githubURL}
                      authorGithubUsername={plugin.githubURL.split("/")[3]}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </main>
      <Toaster />
      <Footer />
    </>
  );
}
