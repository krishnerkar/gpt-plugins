/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const name = searchParams.get("name");
  const logo = searchParams.get("logo");
  const description = searchParams.get("description");

  if (!name || !logo || !description) {
    return new ImageResponse(<>Invalid Plugin</>, {
      width: 1200,
      height: 630,
    });
  }

  return new ImageResponse(
    (
      <div tw="h-[630px] w-[1200px] bg-white flex justify-between p-24">
        <div tw="flex flex-col justify-center">
          <img
            width={10}
            height={10}
            tw="h-10 w-10 mb-8"
            src={`${process.env.VERCEL_URL}/logo.png`}
          />
          <h1 tw="text-xl text-indigo-600 font-bold">gptplugins.app</h1>
          <h1 tw="mt-8 text-7xl font-black">{name}</h1>
          <h2 tw="max-w-lg mt-8 text-2xl">{description}</h2>
        </div>

        <div tw="flex items-center">
          <img
            width={96}
            height={96}
            tw="w-96 h-96"
            style={{ objectFit: "cover" }}
            src={logo}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
