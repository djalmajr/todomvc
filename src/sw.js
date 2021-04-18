/* global clients */

// this is needed to activate the worker immediately without reload
// @see https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#clientsclaim
self.addEventListener("activate", (evt) => evt.waitUntil(clients.claim()));

const cleanSpaces = (str) => str.split(/^ +/m).join("").trim();

const headers = new Headers({
  "Content-Type": "application/javascript",
});

self.addEventListener("fetch", async (evt) => {
  const { url } = evt.request;

  if (url.match(/.*\/(app\/.*\.css)$/g)) {
    const { $1: filepath } = RegExp;

    evt.respondWith(
      fetch(url)
        .then((res) => res.text())
        .then((body) => {
          const data = JSON.stringify(body);
          const content = cleanSpaces(`
            if (!document.querySelector('style[data-file="${filepath}"]')) {
              const head = document.querySelector('head');
              const style = document.createElement('style');
              style.setAttribute('type', 'text/css');
              style.setAttribute('data-file', '${filepath}');
              style.appendChild(document.createTextNode(${data}));
              head.appendChild(style);
            }
            export default null;
          `);

          return new Response(content, { headers });
        })
    );
  } else if (url.includes("app") && !url.match(/.*\.js$/g)) {
    evt.respondWith(
      fetch(`${url}.js`).then((res) =>
        res.status === 200 ? res : fetch(`${url}/index.js`)
      )
    );
  }
});
