const fs = require("fs");
const swc = require("@swc/core");

const output = swc.transformSync(`<div className="omg_className">text</div>`, {
  jsc: {
    parser: {
      jsx: true,
    },
    transform: {
      react: {
        runtime: "automatic", // 默认 classic
      },
    },
  },
});

fs.writeFileSync("./dist/react-from-swc.js", output.code);
