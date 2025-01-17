import { Placeholder } from "@/components/placeholder";
import { getCurrentSession } from "@/features/auth/actions/get-current-session";
import { isOwner } from "@/features/auth/utils/user";
import { getComments } from "../queries/get-comments";
import { Comment } from "./comment";
import { DeleteCommentButton } from "./delete-comment-button";

type CommentListProps = {
  ticketId: string;
};

const CommentList = async ({ ticketId }: CommentListProps) => {
  const comments = await getComments(ticketId);

  const { user } = await getCurrentSession();

  return (
    <div className="w-full max-w-[580px] space-y-5">
      <h1 className="text-xl font-semibold">Comments ({comments.length})</h1>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment}>
            {isOwner(user, comment) ? (
              <DeleteCommentButton id={comment.id} />
            ) : null}
          </Comment>
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
