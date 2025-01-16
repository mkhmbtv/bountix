import { Placeholder } from "@/components/placeholder";
import { getComments } from "../queries/get-comments";
import { Comment } from "./comment";

type CommentListProps = {
  ticketId: string;
};

const CommentList = async ({ ticketId }: CommentListProps) => {
  const comments = await getComments(ticketId);

  return (
    <div className="w-full max-w-[580px] space-y-5">
      <h1 className="text-xl font-semibold">Comments ({comments.length})</h1>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
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
