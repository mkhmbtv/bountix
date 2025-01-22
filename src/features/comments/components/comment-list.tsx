import { Placeholder } from "@/components/placeholder";
import { getCurrentSession } from "@/features/auth/actions/get-current-session";
import { isOwner } from "@/features/auth/utils/user";
import { CommentWithUsername } from "../types";
import { Comment } from "./comment";

type CommentListProps = {
  comments: CommentWithUsername[];
};

const CommentList = async ({ comments }: CommentListProps) => {
  const { user } = await getCurrentSession();

  return (
    <div className="w-full max-w-[580px] space-y-5">
      <h1 className="text-xl font-semibold">Comments ({comments.length})</h1>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            isOwner={isOwner(user, comment)}
          />
        ))
      ) : (
        <div className="pt-20">
          <Placeholder label="No comments yet" />
        </div>
      )}
    </div>
  );
};

export { CommentList };
