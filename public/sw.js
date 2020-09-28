/* global clients */

const { externals } = JSON.parse(
  (decodeURIComponent(self.location.search) || "?{}").substr(1)
);

// this is needed to activate the worker immediately without reload
// @see https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#clientsclaim
self.addEventListener("activate", (evt) => evt.waitUntil(clients.claim()));

const removeSpaces = (str) => str.split(/^ +/m).join("").trim();

let imports;
let urls = [];

const headers = new Headers({
  "Content-Type": "application/javascript",
});

self.addEventListener("fetch", async (evt) => {
  const { url } = evt.request;

  if (imports && !urls.length) {
    urls = Object.keys(externals).reduce(
      (res, key) => [...res, imports[key]],
      []
    );
  }

  if (url.includes("imports.json")) {
    try {
      const res = await (await fetch(url)).json();
      imports = res.imports;
    } catch (err) {}
  } else if (urls.includes(url)) {
    const key = Object.keys(imports).find((k) => imports[k] === url);

    evt.respondWith(
      fetch(url)
        .then((res) => res.text())
        .then((body) => {
          const data = JSON.stringify(body);
          const content = removeSpaces(`
            const head = document.querySelector('head');
            const script = document.createElement('script');
            script.setAttribute('type', 'text/javascript');
            script.appendChild(document.createTextNode(${data}));
            head.appendChild(script);
            export default window.${externals[key]};
          `);

          return new Response(content, { headers });
        })
    );
  } else if (url.match(/.*\/(src\/.*.css)$/g)) {
    const { $1: filepath } = RegExp;

    evt.respondWith(
      fetch(url)
        .then((res) => res.text())
        .then((body) => {
          const data = JSON.stringify(body);
          const content = removeSpaces(`
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
  } else if (url.includes("src") && !url.match(/.*\.js$/g)) {
    evt.respondWith(fetch(`${url}.js`));
  }
});
