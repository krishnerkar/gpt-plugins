import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export type SimplePlugin = {
  id: number;
  name: string;
  description: string;
  logo: string;
  url: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SimplePlugin[]>
) {
  const plugins = await prisma.plugin.findMany({
    orderBy: { id: "desc" },
  });
  res.status(200).json(plugins);
}
