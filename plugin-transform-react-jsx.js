const fs = require("fs");

const babel = require("@babel/core");

const { code } = require("@babel/core").transformSync(
  `<div className="omg_className">text</div>`,
  {
    plugins: [["@babel/plugin-transform-react-jsx"]], // 默认是classic
    // plugins: [
    //   ["./my-babel-plugin-transform-react-jsx.js", { runtime: "automatic" }],
    // ],
  }
);

fs.writeFileSync("./dist/react.js", code);
