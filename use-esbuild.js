const esbuild = require("esbuild");
const fs = require("fs");

esbuild
  .build({
    // entryPoints: ["input.jsx"],
    stdin: {
      contents: `<div className="omg_className">text</div>`,
      loader: "jsx",
      resolveDir: process.cwd(), //resolveDir 指定了当前模块从哪里解析 import 的起始目录，process.cwd()返回当前工作目录
    },
    outfile: "./dist/react-from-build.js",
    jsx: "automatic", // 默认值是 transform - 编译为 React.createElement
  })
  .then(() => {
    console.log("✅ 编译成功，输出写入 dist/react.js");
  })
  .catch((err) => {
    console.error("❌ 编译失败:", err);
  });
