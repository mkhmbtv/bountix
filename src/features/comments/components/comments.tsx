"use client";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Placeholder } from "@/components/placeholder";
import { Skeleton } from "@/components/ui/skeleton";
import { getComments } from "../queries/get-comments";
import { CommentWithUsername } from "../types";
import { Comment } from "./comment";
import { CommentCreateForm } from "./comment-create-form";
import { DeleteCommentButton } from "./delete-comment-button";

type CommentsProps = {
  ticketId: string;
  initialComments: CommentWithUsername[];
  nextCursor?: string;
};

const Comments = ({
  ticketId,
  initialComments,
  nextCursor: initialNextCursor,
}: CommentsProps) => {
  const { ref, inView } = useInView();
  const queryKey = ["comments", ticketId];
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }: { pageParam?: string }) =>
        getComments(ticketId, pageParam),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialData: {
        pages: [
          {
            data: initialComments,
            nextCursor: initialNextCursor,
          },
        ],
        pageParams: [undefined],
      },
    });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, inView]);

  const comments = data.pages.flatMap((page) => page.data);

  const handleCreateComment = () => queryClient.invalidateQueries({ queryKey });
  const handleDeleteComment = () => queryClient.invalidateQueries({ queryKey });

  return (
    <>
      <CommentCreateForm ticketId={ticketId} onCreate={handleCreateComment} />
      <div className="w-full max-w-[580px] space-y-5">
        <h1 className="text-xl font-semibold">Comments</h1>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Comment key={comment.id} comment={comment}>
              {comment.isOwner ? (
                <DeleteCommentButton
                  id={comment.id}
                  onClick={handleDeleteComment}
                />
              ) : null}
            </Comment>
          ))
        ) : (
          <div className="pt-20">
            <Placeholder label="No comments yet" />
          </div>
        )}
        {isFetchingNextPage && (
          <>
            <Skeleton className="h-[124px] w-full" />
            <Skeleton className="h-[124px] w-full" />
          </>
        )}
        <div ref={ref}>
          {comments.length > 0 && !hasNextPage && (
            <p className="text-right text-xs italic">No more comments.</p>
          )}
        </div>
      </div>
    </>
  );
};

export { Comments };
