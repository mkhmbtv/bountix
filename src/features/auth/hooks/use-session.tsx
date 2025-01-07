"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SessionValidationResult } from "@/lib/session";
import { getCurrentSession } from "../actions/get-current-session";

function useSession() {
  const [sessionData, setSessionData] = useState<SessionValidationResult>({
    session: null,
    user: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [updateSession, setUpdateSession] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    async function fetchSession() {
      setIsLoading(true);
      try {
        const result = await getCurrentSession();
        setSessionData(result);
      } catch (error) {
        console.error("Error fetching session:", error);
        setSessionData({ session: null, user: null });
      } finally {
        setIsLoading(false);
      }
    }

    fetchSession();
  }, [pathname, updateSession]);

  const triggerSessionUpdate = () => {
    setUpdateSession((prev) => !prev); // Toggle the trigger
  };

  return { ...sessionData, isLoading, triggerSessionUpdate };
}

export { useSession };
