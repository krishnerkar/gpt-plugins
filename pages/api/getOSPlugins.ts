import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export type SimpleOSPlugin = {
  id: number;
  name: string;
  description: string;
  githubURL: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SimpleOSPlugin[]>
) {
  const oSplugins = await prisma.oSPlugin.findMany({
    orderBy: { id: "desc" },
  });
  res.status(200).json(oSplugins);
}
