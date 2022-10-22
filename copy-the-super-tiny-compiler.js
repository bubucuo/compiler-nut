// 词法分析
function tokenizer(input) {
  const tokens = [];
  let current = 0;
  while (current < input.length) {
    let char = input[current];

    // 左右括号
    if (char === "(") {
      tokens.push({
        type: "paren",
        value: "(",
      });
      current++;
      continue;
    }
    if (char === ")") {
      tokens.push({
        type: "paren",
        value: ")",
      });
      current++;
      continue;
    }

    // 空白符
    let whitespace = /\s/;
    if (whitespace.test(char)) {
      current++;
      continue;
    }
    // 数字
    // 1、100、200
    let number = /[0-9]/;
    if (number.test(char)) {
      let value = "";
      while (number.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({
        type: "number",
        value,
      });
      continue;
    }

    // 字母
    let letter = /[a-z]/;
    if (letter.test(char)) {
      let value = "";
      while (letter.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({
        type: "name",
        value,
      });
      continue;
    }
  }

  return tokens;
}

// 语法分析
// 生成以表达式为节点的树
function parser(tokens) {
  const ast = {
    type: "Program",
    body: [],
  };

  let current = 0;

  function walk() {
    let token = tokens[current];

    if (token.type === "number") {
      current++;
      return {
        type: "NumberLiteral",
        value: token.value,
      };
    }

    if (token.type === "paren" && token.value === "(") {
      token = tokens[++current];
      let node = {
        type: "CallExpression",
        name: token.value,
        params: [],
      };

      token = tokens[++current];

      while (
        token.type !== "paren" ||
        (token.type === "paren" && token.value !== ")")
      ) {
        node.params.push(walk());
        token = tokens[current];
      }

      current++;
      return node;
    }
  }

  while (current < tokens.length) {
    ast.body.push(walk());
  }

  return ast;
}

// 一个编译器
// function compiler(input) {
//   // 词法分析
//   let tokens = tokenizer(input);
//   let ast = parser(tokens);
//   let newAst = transformer(ast);
//   let output = codeGenerator(newAst);

//   // and simply return the output!
//   return output;
// }

module.exports = {
  tokenizer,
  parser,
  // traverser,
  // transformer,
  // codeGenerator,
  // compiler,
};
