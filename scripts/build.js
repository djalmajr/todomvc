#!/usr/bin/env node

const cmds = `
  npm run copy;
  babel src --out-dir es2015 --presets=es2015;

  find src -type f -name '*.css' -exec cat {} ';' > dist/style.css &&
  uglifycss dist/style.css > dist/style.min.css &&
  rm dist/style.css;
  mv dist/style.min.css dist/style.css;

  echo '/* eslint-disable */' > dist/bundle.js &&
  browserify ./es2015/**.js | uglifyjs -mc warnings=false >> dist/bundle.js;

  rm -rf es2015
`;

require("shelljs").exec(cmds.replace(/\n*\s+/g, " ").trim());
