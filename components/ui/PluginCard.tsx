import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export default function PluginCard({
  name,
  description,
  logo,
}: {
  name: string;
  description: string;
  logo: string;
}) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const fallbackImageUrl = "/fallback.svg"; // Replace with your fallback image URL
    e.currentTarget.src = fallbackImageUrl;
  };

  return (
    <div className="flex flex-col h-full justify-top hover:ring-gray-300 cursor-pointer ring ring-gray-100 ring-offset-4 bg-gray-50 px-6 py-6 rounded-md">
      <Link
        href={`/plugin/${name}`}
        shallow
      >
        <img
          onError={handleImageError}
          src={logo}
          alt={`${name}-logo`}
          width={50}
          className="rounded-sm"
        />
        <div>
          <h1 className="text-2xl mt-4 font-semibold text-slate-800">{name}</h1>
          <p className="text-slate-900 text-md mt-2 max-w-sm">{description}</p>
        </div>
      </Link>
    </div>
  );
}
