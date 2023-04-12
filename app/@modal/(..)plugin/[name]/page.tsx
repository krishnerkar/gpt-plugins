"use client";

import {
  PluginDialog,
  PluginDialogCancel,
  PluginDialogContent,
  PluginDialogDescription,
  PluginDialogHeader,
} from "@/components/ui/PluginDialog";
import { useCallback, useEffect, useState } from "react";
import { SimplePlugin } from "@/pages/api/getPlugins";
import { Result } from "@/pages/api/getByName";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { useRouter } from "next/navigation";
import { Clipboard, Maximize2 } from "lucide-react";

import copy from "clipboard-copy";
import { Toaster, toast } from "sonner";

export default function PhotoModal({ params }: { params: { name: string } }) {
  const [data, setData] = useState<SimplePlugin>();
  const [loading, setLoading] = useState(false);
  const [activeContent, setActiveContent] = useState("");

  const router = useRouter();

  const name = params.name;

  const closeModal = useCallback(() => {
    router.back();
  }, [router]);

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
              return;
            }
            if (!data.data) return;
            setData(data.data);
          });
        } else {
          res.json().then((data: Result) => {
            if (data.error) {
              return;
            }
          });
        }
        setLoading(false);
      });
    }
  }, [data, name]);

  return (
    <>
      <PluginDialog open={true}>
        <PluginDialogContent className="sm:px-10 sm:py-8">
          <PluginDialogHeader>
            <PluginDialogDescription className="flex items-center justify-center flex-col">
              <div className="w-full ">
                <div>
                  {loading ? (
                    <div className="w-16 h-16 bg-gray-200 rounded-sm animate-pulse"></div>
                  ) : (
                    <img
                      onError={handleImageError}
                      src={data?.logo}
                      width={80}
                      alt=""
                      className="rounded-sm"
                    />
                  )}
                  <div className="min-w-0 mt-6 flex-1">
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
                  <div className="mt-4 flex sm:flex items-center ">
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
                <div className="mt-8 w-full hidden sm:block">
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
                  <div className="overflow-x-auto">
                    <ScrollArea className="bg-gray-50 h-[300px] border rounded-md mt-6 p-4">
                      {!loadingJSON && !loading ? (
                        <pre className="text-gray-500 whitespace-pre-wrap">
                          {JSON.stringify(activeContent, null, 2)}
                        </pre>
                      ) : (
                        <div className="h-24 w-full bg-gray-200 animate-pulse"></div>
                      )}
                    </ScrollArea>
                  </div>
                </div>
              )}
            </PluginDialogDescription>

            <button
              onClick={() => {
                window.location.reload();
              }}
              className="bg-indigo-600 p-3 rounded-full hover:bg-indigo-800 absolute right-6 top-4"
            >
              <Maximize2 color="#fff" size={20} />
            </button>
          </PluginDialogHeader>
          <PluginDialogCancel className="mt-0" onClick={closeModal}>
            Close
          </PluginDialogCancel>
        </PluginDialogContent>
      </PluginDialog>
      <Toaster />
    </>
  );
}
