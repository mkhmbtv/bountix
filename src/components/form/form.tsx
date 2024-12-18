import { toast } from "sonner";
import { useActionFeedback } from "@/hooks/use-action-feedback";
import { ActionState } from "@/lib/action-state";
import { cn } from "@/lib/utils";

type FormProps = {
  action: (payload: FormData) => void;
  actionState: ActionState;
  onSuccess?: (actionState: ActionState) => void;
  onError?: (actionState: ActionState) => void;
  className?: string;
  children: React.ReactNode;
};

const Form = ({
  action,
  actionState,
  onSuccess,
  onError,
  className,
  children,
}: FormProps) => {
  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      if (actionState.message) {
        toast.success(actionState.message);
      }

      onSuccess?.(actionState);
    },
    onError: ({ actionState }) => {
      if (actionState.message) {
        toast.error(actionState.message);
      }

      onError?.(actionState);
    },
  });

  return (
    <form action={action} className={cn("flex flex-col gap-y-2", className)}>
      {children}
    </form>
  );
};

export { Form };
