/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PluginCard from "@/components/ui/PluginCard";
import PluginCardSkeleton from "@/components/ui/PluginCardSkeleton";
import { Separator } from "@/components/ui/Separator";
import { SimplePlugin } from "@/pages/api/get";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import debounce from "@/lib/debounce";

export interface HomeLayoutProps {
  children: React.ReactNode;
  modal: string | null;
  isOpen: boolean;
  closeModal: () => void;
}

export default function HomePage() {
  const [previewModal, setPreviewModal] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [data, setData] = useState<SimplePlugin[]>();
  const [loading, setLoading] = useState(false);

  const [searchResults, setSearchResults] = useState<SimplePlugin[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  useEffect(() => {
    setPreviewModal(null);
    setModalOpen(false);
  }, []);

  const handlePreviewModal = (name: string) => {
    setPreviewModal(name);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    router.push("/home");
  };

  const fetchSearchResults = async (query: string) => {
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }
    setSearchLoading(true);
    const response = await fetch(`/api/search?q=${query}`);
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
      fetch("/api/get").then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setData(data);
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
              placeholder={!data ? "" : `Search ${data?.length} plugins`}
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
                handlePreviewModal={handlePreviewModal}
                key={plugin.id}
                name={plugin.name}
                description={plugin.description}
                logo={plugin.logo}
              />
            ))
          ) : (
            data?.map((plugin) => (
              <PluginCard
                handlePreviewModal={handlePreviewModal}
                key={plugin.id}
                name={plugin.name}
                description={plugin.description}
                logo={plugin.logo}
              />
            ))
          )}
        </div>
      </main>
      <Toaster />
      <Footer />
    </>
  );
}
