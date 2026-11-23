/** The slice of the Chrome extension API this extension uses. The repo takes no npm dependencies,
 *  so this stands in for `@types/chrome`; add a member here before using a new API. */
declare namespace chrome {
  namespace runtime {
    interface MessageSender {
      tab?: { id?: number; url?: string };
    }
    interface Port {
      name: string;
      postMessage(message: unknown): void;
      onMessage: { addListener(cb: (message: unknown) => void): void };
      onDisconnect: { addListener(cb: () => void): void };
    }
    function sendMessage(message: unknown): Promise<unknown>;
    function connect(info: { name: string }): Port;
    function getManifest(): { version: string };
    const onMessage: { addListener(cb: (message: unknown, sender: MessageSender, sendResponse: (r?: unknown) => void) => boolean | void): void };
    const onConnect: { addListener(cb: (port: Port) => void): void };
    const onInstalled: { addListener(cb: () => void): void };
    const onStartup: { addListener(cb: () => void): void };
    let lastError: { message?: string } | undefined;
  }
  namespace tabs {
    interface Tab {
      id?: number;
      url?: string;
      active: boolean;
    }
    function sendMessage(tabId: number, message: unknown): Promise<unknown>;
    function query(q: { active?: boolean; currentWindow?: boolean; lastFocusedWindow?: boolean }): Promise<Tab[]>;
    const onRemoved: { addListener(cb: (tabId: number) => void): void };
    const onActivated: { addListener(cb: (info: { tabId: number }) => void): void };
  }
  namespace action {
    function setBadgeText(d: { text: string; tabId?: number }): Promise<void>;
    function setBadgeBackgroundColor(d: { color: string; tabId?: number }): Promise<void>;
    function setTitle(d: { title: string; tabId?: number }): Promise<void>;
  }
  namespace sidePanel {
    function setPanelBehavior(b: { openPanelOnActionClick: boolean }): Promise<void>;
  }
  namespace storage {
    const local: {
      get(keys: string[]): Promise<Record<string, unknown>>;
      set(items: Record<string, unknown>): Promise<void>;
    };
  }
  namespace permissions {
    /** Must be called from a user gesture (a click handler, before any await). */
    function request(p: { origins: string[] }): Promise<boolean>;
  }
  namespace alarms {
    function create(name: string, info: { periodInMinutes: number }): void;
    const onAlarm: { addListener(cb: (alarm: { name: string }) => void): void };
  }
}
