"use client";

import { useEffect } from "react";
import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Placeholder
      label={error.message ?? "Something went wrong."}
      button={
        <Button variant="outline" onClick={() => reset()}>
          Try again
        </Button>
      }
    />
  );
}
