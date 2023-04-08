import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { AiPlugin } from "./submit";
import yaml from "js-yaml";
import axios from "axios";

type Data = {
  status: string;
  plugin: string;
  openapi: string;
};

type Body = {
  url: string;
};

function YAML2JSON(yamlString: string) {
  try {
    const jsonObj = yaml.load(yamlString);
    return jsonObj;
  } catch (error) {
    console.error("Something went wrong converting YAML to JSON:", error);
    return null;
  }
}

function isYAML(inputString: string) {
  const yamlPattern = /:\s|\n:/;
  return yamlPattern.test(inputString);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = req.body as Body;
  const url = body.url;

  const manifestRaw = await fetch(url);
  const manifest: AiPlugin = await manifestRaw.json();

  const openAPIUrl = manifest.api.url;
  let openAPI;

  try {
    const openAPIRaw = await axios.get(openAPIUrl);
    openAPI = isYAML(openAPIRaw.data)
      ? YAML2JSON(openAPIRaw.data)
      : openAPIRaw.data;
  } catch (error) {
    console.error("Something went wrong fetching OpenAPI:", error);
    openAPI = "";
  }

  res.status(200).json({
    status: "success",
    plugin: JSON.stringify(manifest),
    openapi: JSON.stringify(openAPI),
  });
}
