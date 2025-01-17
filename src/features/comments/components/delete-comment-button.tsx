"use client";

import { LucideTrash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";
import { deleteComment } from "../actions/delete-comment";

type DeleteCommentButtonProps = {
  id: string;
};

const DeleteCommentButton = ({ id }: DeleteCommentButtonProps) => {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteComment,
    trigger: (
      <Button variant="ghost" size="icon">
        <LucideTrash className="h-4 w-4" />
        <span className="sr-only">Delete comment</span>
      </Button>
    ),
    formFields: <input type="hidden" name="id" value={id} />,
  });

  return (
    <>
      {deleteDialog}
      {deleteButton}
    </>
  );
};

export { DeleteCommentButton };
