const cra = require("customize-cra");

module.exports = cra.override(
  cra.addWebpackExternals({
    react: "React",
    "react-dom": "ReactDOM",
  })
);
