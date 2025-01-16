import { Prisma } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type CommentProps = {
  comment: Prisma.CommentGetPayload<{
    include: {
      user: {
        select: {
          username: true;
        };
      };
    };
  }>;
};

const Comment = ({ comment }: CommentProps) => {
  const { user, content, createdAt } = comment;
  const username = user?.username;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar>
          {username ? (
            <>
              <AvatarImage
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${username}`}
                alt={username}
              />
              <AvatarFallback>
                {username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </>
          ) : (
            <AvatarFallback>?</AvatarFallback>
          )}
        </Avatar>
        <div className="flex flex-col">
          <p className="text-sm font-semibold">
            {username ? (
              username
            ) : (
              <span className="italic text-muted-foreground">Deleted User</span>
            )}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(createdAt, { addSuffix: true })}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-line text-sm">{content}</p>
      </CardContent>
    </Card>
  );
};

export { Comment };
