const fs = require("fs");
const {
  // baseCompile: compile
  baseParse,
  transform,
  generate,
  getBaseTransformPreset,
} = require("@vue/compiler-core");
const {extend} = require("@vue/shared");

function compile(template, options) {
  // 1. parse 生成ast
  const ast = baseParse(template);

  // 2. transform ，转化ast
  // node、指令
  const prefixIdentifiers = false;

  const [nodeTransforms, directiveTransforms] =
    getBaseTransformPreset(prefixIdentifiers);

  transform(
    ast,
    extend({}, options, {
      prefixIdentifiers,
      nodeTransforms: [
        ...nodeTransforms,
        ...(options.nodeTransforms || []), // user transforms
      ],
      directiveTransforms: extend(
        {},
        directiveTransforms,
        options.directiveTransforms || {} // user transforms
      ),
    })
  );

  // 3. generate ，生成目标代码
  return generate(
    ast,
    extend({}, options, {
      prefixIdentifiers,
    })
  );
}

const {code} = compile("<div>Hello World!</div>", {
  filename: "foo.vue",
  sourceMap: true,
});

fs.writeFileSync("../dist/vue.js", code);
