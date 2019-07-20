(function() {
  window.createElement = (name, attrs) => {
    const el = document.createElement(name);

    Object.keys(attrs).forEach(key => (el[key] = attrs[key]));

    document.querySelector("head").appendChild(el);
  };

  window.addStyleSheet = href => {
    window.createElement("link", { href, rel: "stylesheet" });
  };

  // make __dirname, __filename work in the browser
  if (window && !window["__dirname"]) {
    const stackTrace = function() {
      const lines = new Error().stack.split("\n");

      return lines.slice(2).map(function(line) {
        if (line.indexOf("(native)") != -1) {
          return {
            file: "[browser core]",
            directory: "-",
            domain: line
              .replace(" at ", "")
              .replace("(native)")
              .trim(),
          };
        }

        const regex = RegExp(" (?:at(?: .*?)? |\\()(.*):([0-9]+):([0-9]+)", "g");
        const parts = regex.exec(line) || [];
        const sep = parts[1].lastIndexOf("/");
        const directory = parts[1].substring(0, sep);
        const urlTest = /([a-zA-Z]+:\/\/.*?)\/(.*)/g.exec(directory) || [];

        return {
          file: parts[1].substring(sep + 1),
          directory: urlTest[2],
          line: parts[1],
          column: parts[2],
          domain: urlTest[1],
        };
      });
    };

    Object.defineProperty(window, "__filename", {
      __proto__: null, // no inherited properties
      get() {
        const stack = stackTrace();
        stack.shift();
        return stack[0].file
          .split(".")
          .slice(0, -1)
          .join(".");
      },
    });

    Object.defineProperty(window, "__dirname", {
      __proto__: null, // no inherited properties
      get() {
        const stack = stackTrace();
        stack.shift();
        return `/${stack[0].directory}`;
      },
    });

    Object.defineProperty(window, "__stacktrace", {
      __proto__: null, // no inherited properties
      get() {
        const stack = stackTrace();
        stack.shift();
        return stack;
      },
    });
  }
})();
