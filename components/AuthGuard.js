"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

export default function AuthGuard({ children }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return <>{children}</>;
  }

  return null;
}
