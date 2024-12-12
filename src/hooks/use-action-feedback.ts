import { useEffect, useRef } from "react";
import { ActionState } from "@/lib/action-state";

type FeedbackArgs = { actionState: ActionState };

type UseActionFeedbackOptions = {
  onSuccess?: (args: FeedbackArgs) => void;
  onError?: (args: FeedbackArgs) => void;
};

const useActionFeedback = (
  actionState: ActionState,
  options: UseActionFeedbackOptions,
) => {
  const prevTimestamp = useRef(actionState.timestamp);
  const isUpdated = prevTimestamp.current !== actionState.timestamp;

  useEffect(() => {
    if (!isUpdated) {
      return;
    }
    if (actionState.status === "SUCCESS") {
      options.onSuccess?.({ actionState });
    }

    if (actionState.status === "ERROR") {
      options.onError?.({ actionState });
    }

    prevTimestamp.current = actionState.timestamp;
  }, [actionState, options, isUpdated]);
};

export { useActionFeedback };
