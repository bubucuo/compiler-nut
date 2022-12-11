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
  const ast = baseParse(template);

  const prefixIdentifiers = false;

  const [nodeTransforms, directiveTransforms] =
    getBaseTransformPreset(prefixIdentifiers);

  transform(
    ast,
    extend({}, options, {
      prefixIdentifiers,
      nodeTransforms: [...nodeTransforms, ...(options.nodeTransforms || [])],
      directiveTransforms: extend(
        {},
        directiveTransforms,
        options.directiveTransforms || {} // user transforms
      ),
    })
  );

  return generate(
    ast,
    extend({}, options, {
      prefixIdentifiers,
    })
  );
}

const {code} = compile("<div>Hello World</div>", {
  sourceMap: true,
  filename: `foo.vue`,
});

fs.writeFileSync("../dist/vue.js", code);
