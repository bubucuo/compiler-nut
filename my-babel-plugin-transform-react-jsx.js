const jsx = require("@babel/plugin-syntax-jsx").default;
const types = require("@babel/types");
const {types: t} = require("@babel/core");

module.exports = function () {
  return {
    name: "my-babel-plugin-transform-react-jsx",
    inherits: jsx,
    visitor: {
      JSXElement: {
        exit(path, file) {
          let callExpr = buildJSXElementCall(path, file);
          path.replaceWith(t.inherits(callExpr, path.node));
        },
      },
    },
  };
};

function buildJSXElementCall(path, file) {
  const openingPath = path.get("openingElement");

  const {name} = openingPath.node.name; // div

  const tag = types.stringLiteral(name);

  const args = [tag];

  const attributes = [];
  for (const attr of openingPath.get("attributes")) {
    attributes.push(attr.node);
  }

  const children = t.react.buildChildren(path.node);
  const props = attributes.map(convertAttribute);

  if (children?.length > 0) {
    props.push(buildChildrenProperty(children));
  }

  const propsObject = types.objectExpression(props);

  args.push(propsObject);

  return call(path, "jsx", args);
}

function call(path, name, args) {
  const importSource = "react/jsx-runtime";

  const callee = addImport(path, name, importSource);
  const callExpression = types.callExpression(callee, args);
  console.log(
    "%c [ callExpression ]-53",
    "font-size:13px; background:pink; color:#bf2c9f;",
    callExpression
  );

  return callExpression;
}

function convertAttribute(node) {
  node.name.type = "Identifier";
  let objectProperty = types.objectProperty(node.name, node.value);
  return objectProperty;
}

// todo
function buildChildrenProperty(children) {
  let childrenNode;

  if (children.length === 1) {
    childrenNode = children[0];
  } else if (children.length > 1) {
    childrenNode = types.arrayExpression(children);
  }

  return types.objectProperty(types.identifier("children"), childrenNode);
}

function addImport(path, importName, importSource) {
  const programPath = path.find((p) => p.isProgram());
  const programScope = programPath.scope;
  const localName = programScope.generateUidIdentifier(importName); //jsx=>_jsx

  const importSpecifier = types.importSpecifier(
    localName,
    types.identifier(importName)
  );
  const specifiers = [importSpecifier];
  const importDeclaration = types.importDeclaration(
    specifiers,
    types.stringLiteral(importSource)
  );
  programPath.unshiftContainer("body", [importDeclaration]);
  return localName;
}
