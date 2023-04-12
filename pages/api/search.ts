import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { SimplePlugin } from "./getPlugins";
import { SimpleOSPlugin } from "./getOSPlugins";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SimplePlugin[] | SimpleOSPlugin[]>
) {
  if (req.query.type == "open") {
    const oSplugins = await prisma.oSPlugin.findMany({
      where: {
        OR: [
          {
            name: {
              contains: req.query.q as string,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: req.query.q as string,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    res.status(200).json(oSplugins);
  } else {
    const plugins = await prisma.plugin.findMany({
      where: {
        OR: [
          {
            name: {
              contains: req.query.q as string,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: req.query.q as string,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    res.status(200).json(plugins);
  }
}
