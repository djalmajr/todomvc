const cra = require("customize-cra");

module.exports = cra.override(
  cra.addWebpackExternals({
    htm: "htm",
    preact: "preact",
    "preact/hooks": "preactHooks",
  })
);
