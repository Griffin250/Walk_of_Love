// Auth is bypassed — this stub satisfies imports without requiring better-auth.
import { useState } from "react";

function useSession() {
  const [state] = useState({ data: null as null, isPending: false });
  return state;
}

export const authClient = {
  useSession,
  signIn: {
    email: async (_opts: unknown) => ({ error: { message: "Auth not available" }, data: null }),
  },
  signUp: {
    email: async (_opts: unknown) => ({ error: { message: "Auth not available" }, data: null }),
  },
  signOut: async () => {},
  updateUser: async (_opts: unknown) => ({ error: null, data: null }),
};
