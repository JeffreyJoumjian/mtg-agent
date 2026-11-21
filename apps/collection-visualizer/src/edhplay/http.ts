// Server only. Shared guard for the extension's endpoints. They take no credentials, so they
// refuse anything a web page could send on its own. A cross-site form or `fetch` can't set a custom
// header or a JSON content type without a CORS preflight, and Vite's dev server answers preflights
// from other localhost origins, so the Origin header is checked too: the extension's service worker
// sends `chrome-extension://…`, and a request with no Origin (curl, the CLI) is let through.
export function refuseUnlessExtension(request: Request): Response | null {
  const origin = request.headers.get("origin");
  if (origin && !origin.startsWith("chrome-extension://")) {
    return new Response("only the EDHPlay Lens extension may call this", { status: 403 });
  }
  const type = request.headers.get("content-type") ?? "";
  if (request.method !== "GET" && !type.includes("application/json")) {
    return new Response("expected application/json", { status: 415 });
  }
  if (request.headers.get("x-edhplay-lens") !== "1") {
    return new Response("missing x-edhplay-lens header", { status: 403 });
  }
  return null;
}

export function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}
