const fs = require("fs");
const ts = require("typescript");

const result = ts.transpileModule(`<div className="omg_className">text</div>`, {
  compilerOptions: {
    // jsx: "react", // 或者 ts.JsxEmit.React, 对应 React.createElement
    jsx: "react-jsx", // 或者 ts.JsxEmit.ReactJSX, 对应 automatic runtime
    module: ts.ModuleKind.ESNext,
  },
});

fs.writeFileSync("./dist/react-from-tsc.js", result.outputText);
