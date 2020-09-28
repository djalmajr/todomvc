if ("serviceWorker" in navigator) {
  (async () => {
    try {
      const config = JSON.stringify({
        externals: {
          // classnames: "classNames",
        },
      });

      const launch = async () => await import("./src/index.js");

      await navigator.serviceWorker.register(`sw.js?${config}`);

      await navigator.serviceWorker.ready;

      // this launches the React app if the SW has been installed before or immediately after registration
      // https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#clientsclaim
      if (navigator.serviceWorker.controller) {
        await launch();
      } else {
        navigator.serviceWorker.addEventListener("controllerchange", launch);
      }
    } catch (error) {
      console.error("Service worker registration failed", error.stack);
    }
  })();
} else {
  alert("Service Worker is not supported");
}
