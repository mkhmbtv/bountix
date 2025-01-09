import { prisma } from "@/lib/prisma";

export const getTickets = async (userId?: string, query?: string) => {
  return await prisma.ticket.findMany({
    where: {
      userId,
      title: {
        contains: query,
        mode: "insensitive",
      },
    },
    orderBy: {
      createdAt: "desc",
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
