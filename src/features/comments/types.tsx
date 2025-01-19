import { Prisma } from "@prisma/client";

export type CommentWithUsername = Prisma.CommentGetPayload<{
  include: {
    user: {
      select: {
        username: true;
      };
    };
  };
}>;
