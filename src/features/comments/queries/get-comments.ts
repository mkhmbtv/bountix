"use server";

import { getCurrentSession } from "@/features/auth/actions/get-current-session";
import { isOwner } from "@/features/auth/utils/user";
import { prisma } from "@/lib/prisma";

export const getComments = async (ticketId: string, cursor?: string) => {
  const { user } = await getCurrentSession();
  const where = {
    ticketId,
    id: {
      lt: cursor,
    },
  };

  const take = 2;

  const comments = await prisma.comment.findMany({
    where,
    take: take + 1,
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
    orderBy: [
      {
        createdAt: "desc",
      },
      { id: "desc" },
    ],
  });

  const hasNextPage = comments.length > take;
  const nextCursor = hasNextPage ? comments[comments.length - 2].id : undefined;
  const slicedComments = hasNextPage ? comments.slice(0, -1) : comments;

  return {
    data: slicedComments.map((comment) => ({
      ...comment,
      isOwner: isOwner(user, comment),
    })),
    nextCursor,
  };
};
