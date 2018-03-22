// Compiled using marko@4.9.2 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_component = {
        onCreate: function() {
          this.state = {
              count: 0
            };
        },
        increment: function() {
          console.log("increment");

          this.state.count++;
        },
        decrement: function() {
          console.log("decrement");

          this.state.count--;
        }
      },
    marko_componentType = "/electron-app$1.0.0/src/ui/components/marko/hello.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_attr = marko_helpers.a,
    marko_escapeXml = marko_helpers.x;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<style{\r\n  .marko-container{\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    grid-gap: 10px;\r\n  }\r\n}></style{\r\n  .marko-container{\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    grid-gap: 10px;\r\n  }\r\n}><div class=\"marko-container\"><button" +
    marko_attr("data-marko", {
      onclick: __component.d("increment", false)
    }, false) +
    ">increment</button><button" +
    marko_attr("data-marko", {
      onclick: __component.d("decrement", false)
    }, false) +
    ">decrement</button><span>" +
    marko_escapeXml(state.count) +
    "</span></div>");
}

marko_template._ = marko_renderer(render, {
    ___type: marko_componentType
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);

marko_template.meta = {
    id: "/electron-app$1.0.0/src/ui/components/marko/hello.marko",
    component: "./hello.marko"
  };
