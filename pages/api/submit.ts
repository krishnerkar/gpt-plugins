import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

type Data = {
  status: string;
  id?: number;
};

type Body = {
  name: string;
  url: string;
  type: "hosted" | "open";
  description?: string;
};

type Auth = {
  type: string;
};

type Api = {
  type: string;
  url: string;
};

export type AiPlugin = {
  schema_version: string;
  name_for_model: string;
  name_for_human: string;
  description_for_human: string;
  description_for_model: string;
  api: Api;
  auth: Auth;
  logo_url: string;
  contact_email: string;
  legal_info_url: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = req.body as Body;
  const url = body.url;
  const name = body.name;
  const type = body.type;

  if (type === "hosted") {
    try {
      const result = await fetch(url);
      const data: AiPlugin = await result.json();

      const description = data.description_for_human;
      const logo = data.logo_url;
      const plugin = await prisma.plugin.create({
        data: {
          name: name,
          description: description,
          logo: logo,
          url: url,
          approved: false,
        },
      });
      res.status(200).json({ status: "success", id: plugin.id });
    } catch (e) {
      console.log(e);
      res.status(500).json({ status: "error" });
      return;
    }
  } else {
    try {
      const description = body?.description || "";
      const plugin = await prisma.oSPlugin.create({
        data: {
          name: name,
          description: description,
          githubURL: url,
          approved: false,
        },
      });
      res.status(200).json({ status: "success", id: plugin.id });
    } catch (e) {
      console.log(e);
      res.status(500).json({ status: "error" });
      return;
    }
  }
}
