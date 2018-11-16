#!/usr/bin/env node

const cmds = `
  cross-env NODE_ENV=development npm run copy;
  find src -type f -name '*.css' -exec cat {} ';' > dist/style.css &&
  live-server --open=dist .
`;

require("shelljs").exec(cmds.replace(/\n*\s+/g, " ").trim());
