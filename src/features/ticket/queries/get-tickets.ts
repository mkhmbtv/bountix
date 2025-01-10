import { prisma } from "@/lib/prisma";

export const getTickets = async (
  userId?: string,
  query?: string,
  sort?: string,
) => {
  return await prisma.ticket.findMany({
    where: {
      userId,
      title: {
        contains: query,
        mode: "insensitive",
      },
    },
    orderBy: {
      ...(sort === "" && { createdAt: "desc" }),
      ...(sort === "bounty" && { bounty: "desc" }),
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
};
