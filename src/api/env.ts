// src/api/env.ts

export const SSL: boolean = true;
export const DEFAULT_HOST: string = "dev.goodgist.com";
export const DEFAULT_WS_HOST: string = "dev.goodgist.com";

export const REMOTE_HOST: string = getHost(DEFAULT_HOST);
export const REMOTE_URL: string = getHostUrl(REMOTE_HOST);

export const REMOTE_WS_HOST: string = getHost(DEFAULT_WS_HOST);
export const WS_REMOTE_HOST: string = getWSHost(REMOTE_WS_HOST);

// --- Utilities ---

function getHost(defaultHost: string): string {
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost") return defaultHost;
    return host;
  }
  return defaultHost; // SSR fallback
}

function getHostUrl(remoteHost: string): string {
  if (remoteHost === "www.goodgist.com") {
    return "api.goodgist.com";
  }
  return `${remoteHost}/api`;
}

function getWSHost(remoteHost: string): string {
  if (remoteHost === "web.researchfin.ai") {
    return "socket.researchfin.ai";
  }
  if (remoteHost === "web4.researchfin.ai") {
    return "socket4.researchfin.ai";
  }
  return `${remoteHost}/socket`;
}

// The final API base url for consumption in endpoints.ts
export const API_BASE_URL = `${SSL ? "https" : "http"}://${REMOTE_URL}`;

// The final WebSocket url, if needed elsewhere
export const API_WS_BASE_URL = `${SSL ? "wss" : "ws"}://${WS_REMOTE_HOST}`;
