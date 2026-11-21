/** The relay between the page script (which sees EDHPlay's own world) and the extension's
 *  service worker. It runs in Chrome's isolated world, so it can use chrome.runtime but not the
 *  page's variables; the page script is the opposite. It forwards and does nothing else. */
import { isPageEnvelope, type BackgroundEnvelope, type BackgroundToPage } from "./messages";

window.addEventListener("message", (e: MessageEvent) => {
  if (e.source !== window || !isPageEnvelope(e.data)) return;
  chrome.runtime.sendMessage(e.data.msg).catch(() => {
    // The service worker is restarting; the page replays on request once it's back.
  });
});

chrome.runtime.onMessage.addListener((message: unknown) => {
  if (typeof message === "object" && message !== null && "kind" in message && message.kind === "request_replay") {
    const msg: BackgroundToPage = { kind: "request_replay" };
    const envelope: BackgroundEnvelope = { __lens: "background", msg };
    window.postMessage(envelope, location.origin);
  }
});
