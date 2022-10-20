(function (graph) {
        function require(file) {
            function absRequire(relPath) {
                return require(graph[file].deps[relPath])
            }
            var exports = {};
            (function (require,exports,code) {
                eval(code)
            })(absRequire,exports,graph[file].code)
            return exports
        }
        require('./src/index.js')
    })({"./src/index.js":{"deps":{"./print.js":"./src/print.js"},"code":"\"use strict\";\n\nvar _print = _interopRequireDefault(require(\"./print.js\"));\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\nfunction component() {\n  var element = document.createElement(\"div\");\n  var btn = document.createElement(\"button\");\n  btn.innerHTML = \"Click me and check the console!\";\n  btn.onclick = _print[\"default\"];\n  element.appendChild(btn);\n  return element;\n}\ndocument.body.appendChild(component());"},"./src/print.js":{"deps":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = printMe;\nfunction printMe() {\n  console.log(\"I get called from print.js!\");\n}"}})