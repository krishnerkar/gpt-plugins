import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { SimplePlugin } from "./getPlugins";

export type Result = {
  data?: SimplePlugin | null;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  if (!req.query.name) {
    return res.status(400).json({ error: "name parameter is required" });
  }

  const plugin = await prisma.plugin.findUnique({
    where: { name: req.query.name as string },
  });

  if (!plugin) return res.status(404).json({ error: "Plugin not found" });

  res.status(200).json({ data: plugin });
}
