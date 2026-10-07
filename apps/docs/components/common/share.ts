// Programs are shared as base64url encoded UTF-8 in the `code` query param

export function encodeCode(code: string): string {
  const bytes = new TextEncoder().encode(code);
  let binary = "";
  bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeCode(encoded: string): string | null {
  try {
    const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const binary = atob(base64);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

export function getShareUrl(code: string): string {
  const url = new URL(window.location.href);
  url.search = "";
  url.searchParams.set("code", encodeCode(code));
  url.hash = "";
  return url.toString();
}

export function readSharedCode(): string | null {
  const encoded = new URLSearchParams(window.location.search).get("code");
  return encoded ? decodeCode(encoded) : null;
}

export const storage = {
  get(key: string): string | null {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // storage can be unavailable (private mode), not critical
    }
  },
};
