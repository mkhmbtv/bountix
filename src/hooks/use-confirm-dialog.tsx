"use client";

import { LucideLoaderCircle } from "lucide-react";
import { cloneElement, useActionState, useState } from "react";
import { Form } from "@/components/form/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ActionState, EMPTY_ACTION_STATE } from "@/lib/action-state";

type UseConfirmDialogProps = {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
  trigger: React.ReactElement;
  title?: string;
  description?: string;
  formFields?: React.ReactNode;
};

const useConfirmDialog = ({
  action,
  trigger,
  title = "Are you sure?",
  description = "This action cannot be undone. Please confirm to proceed.",
  formFields,
}: UseConfirmDialogProps) => {
  const [actionState, formAction, isPending] = useActionState(
    action,
    EMPTY_ACTION_STATE,
  );
  const [isOpen, setIsOpen] = useState(false);

  const dialogTrigger = cloneElement(trigger, {
    onClick: () => setIsOpen((state) => !state),
  });

  const handleSuccess = () => {
    setIsOpen(false);
  };

  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Form
              action={formAction}
              actionState={actionState}
              onSuccess={handleSuccess}
            >
              <Button type="submit">
                {formFields}
                {isPending && (
                  <LucideLoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                )}
                Confirm
              </Button>
            </Form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [dialogTrigger, dialog];
};

export { useConfirmDialog };
