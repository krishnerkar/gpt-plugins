/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DevloperPluginCard({
  name,
  description,
  authorGithubUsername,
  githubUrl,
}: {
  name: string;
  description: string;
  authorGithubUsername: string;
  githubUrl: string;
}) {
  return (
    <div className="flex flex-col h-full justify-top hover:ring-gray-300 cursor-pointer ring ring-gray-100 ring-offset-4 bg-gray-50 px-6 py-6 rounded-md">
      <a href={githubUrl} className="flex flex-col justify-between h-full">
        <div>
          <h1 className="text-2xl  font-semibold text-slate-800">{name}</h1>
          <p className="text-slate-900 text-md mt-2 max-w-sm ">{description}</p>
        </div>
      </a>
      <div className="flex">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://github.com/${authorGithubUsername}`}
          className="flex items-center mt-4 gap-2 p-2 pr-4  w-auto bg-black hover:bg-gray-800 text-white rounded-full"
        >
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            width={20}
            className="rounded-full"
          />
          <p className="text-xs">{authorGithubUsername} </p>
          <ArrowRight size={15} />
        </a>
      </div>
    </div>
  );
}
