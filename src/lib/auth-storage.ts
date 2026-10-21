const TOKEN_KEY = 'legal_sys_access_token';

// Temporary: localStorage survives a reload, which we need until /refresh exists.
// Stage 6 moves the session to an httpOnly cookie and keeps the access token in memory.
export function getToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  window.localStorage.removeItem(TOKEN_KEY);
}
