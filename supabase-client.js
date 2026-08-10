/* Punto Smart OS: anonymous usage telemetry. No personal data is collected. */
(function () {
  const SUPABASE_URL = "https://xajborbklhxbxvqwntbw.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_J18ycsWTGLrd4qTYkShcMw_nn9ipYa_";
  const SESSION_KEY = "ps_usage_session_v1";
  const STARTED_KEY = "ps_usage_started_v1";

  function createUuid() {
    if (globalThis.crypto && crypto.randomUUID) return crypto.randomUUID();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
      const random = Math.floor(Math.random() * 16);
      return (char === "x" ? random : (random & 0x3) | 0x8).toString(16);
    });
  }

  function sessionId() {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = createUuid();
      sessionStorage.setItem(SESSION_KEY, id);
      sessionStorage.setItem(STARTED_KEY, String(Date.now()));
    }
    return id;
  }

  function country() {
    const selected = new URLSearchParams(location.search).get("country")?.toUpperCase();
    if (["AR", "BR", "ES", "FR", "MX", "US"].includes(selected)) return selected;
    const path = location.pathname.toLowerCase();
    if (path.includes("/br") || path.includes("/brasil")) return "BR";
    if (path.includes("/fr") || path.includes("/france")) return "FR";
    if (path.includes("/mx") || path.includes("/mexico")) return "MX";
    if (path.includes("/us") || path.includes("/usa")) return "US";
    if (path.includes("/es") || path.includes("/spain")) return "ES";
    return "AR";
  }

  function plan() {
    return location.pathname.includes("/plus") || location.pathname.includes("global-plus") ? "plus" : "free";
  }

  function send(event) {
    const startedAt = Number(sessionStorage.getItem(STARTED_KEY) || Date.now());
    const body = {
      session_id: sessionId(),
      event,
      page: location.pathname,
      entry_page: location.pathname,
      last_page: location.pathname,
      country: country(),
      plan: plan(),
      elapsed_seconds: Math.max(0, Math.round((Date.now() - startedAt) / 1000)),
      screen: `${screen.width}x${screen.height}`
    };

    fetch(`${SUPABASE_URL}/functions/v1/track-usage`, {
      method: "POST",
      keepalive: true,
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_PUBLISHABLE_KEY
      },
      body: JSON.stringify(body)
    }).catch(() => {});
  }

  send("session_started");
  window.addEventListener("pagehide", () => send("session_ended"));
  window.PS_USAGE = { track: send };
})();
