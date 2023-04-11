/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import PluginContent from "@/components/PluginContent";
import { Result } from "@/pages/api/getByName";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { name: string };
};

export async function generateMetadata(
  { params }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  const name = params.name;
  let description;
  let logo;

  const plugin = await fetch(`https://www.gptplugins.app/api/getByName?name=${name}`).then((res) =>
    res.json()
  );

  console.log(plugin);

  return {
    title: plugin.data.name,
    description: plugin.data.description,
    twitter: {
      card: "summary_large_image",
      title: plugin.data.name,
      description: plugin.data.description,
      creator: "@krishnerkar",
      images: [
        `https://www.gptplugins.app/api/og?name=${plugin.data.name}&description=${plugin.data.description}&logo=${plugin.data.logo}`,
      ],
    },
    openGraph: {
      title: plugin.data.name,
      description: plugin.data.description,
      type: "website",
      url: "https://www.gptplugins.app/",
      images: [
        {
          url: `https://www.gptplugins.app/api/og?name=${plugin.data.name}&description=${plugin.data.description}&logo=${plugin.data.logo}`,
          width: 1200,
          height: 630,
          alt: "GPT Plugins",
        },
      ],
    },
  };
}

export default function Plugin({ params }: { params: { name: string } }) {
  return <PluginContent name={params.name} />;
}
