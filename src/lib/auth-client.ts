import { createAuthClient } from "better-auth/react";

function resolveAuthBaseURL(): string {
  const defaultPath = "/api/auth";

  const configured = import.meta.env.VITE_AUTH_BASE_URL?.trim();
  if (configured) {
    try {
      return new URL(configured).toString();
    } catch {
      if (typeof window !== "undefined" && configured.startsWith("/")) {
        return new URL(configured, window.location.origin).toString();
      }
    }
  }

  if (typeof window !== "undefined") {
    const { protocol, hostname, origin } = window.location;

    // In local dev, auth runs on the Cloudflare Worker dev server.
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return `${protocol}//${hostname}:8787${defaultPath}`;
    }

    return new URL(defaultPath, origin).toString();
  }

  return "http://localhost:8787/api/auth";
}

const authBaseURL = resolveAuthBaseURL();

export const authClient = createAuthClient({
  baseURL: authBaseURL,
  fetchOptions: {
    credentials: "include",
  },
});
