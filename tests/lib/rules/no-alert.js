/**
 * @fileoverview Tests for no-alert rule.
 * @author Nicholas C. Zakas
 * @copyright 2015 Mathias Schreck
 * @copyright 2013 Nicholas C. Zakas
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require("../../../lib/eslint"),
    ESLintTester = require("eslint-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest("lib/rules/no-alert", {
    valid: [
        "a[o.k](1)",
        "foo.alert(foo)",
        "foo.confirm(foo)",
        "foo.prompt(foo)",
        "function alert() {} alert();",
        "var alert = function () {}; alert();",
        "function foo() { var alert = bar; alert(); }",
        "function foo(alert) { alert(); }",
        "var alert = function() {}; function test() { alert(); }",
        "function foo() { var alert = function() {}; function test() { alert(); } }",
        "function confirm() {} confirm();",
        "function prompt() {} prompt();",
        "window[alert]();",
        "function foo() { this.alert(); }",
        "function foo() { var window = bar; window.alert(); }"
    ],
    invalid: [
        {
            code: "alert(foo)",
            errors: [{ message: "Unexpected alert.", type: "CallExpression", line: 1, column: 1 }]
        },
        {
            code: "window.alert(foo)",
            errors: [{ message: "Unexpected alert.", type: "CallExpression", line: 1, column: 1 }]
        },
        {
            code: "window['alert'](foo)",
            errors: [{ message: "Unexpected alert.", type: "CallExpression", line: 1, column: 1 }]
        },
        {
            code: "confirm(foo)",
            errors: [{ message: "Unexpected confirm.", type: "CallExpression", line: 1, column: 1 }]
        },
        {
            code: "window.confirm(foo)",
            errors: [{ message: "Unexpected confirm.", type: "CallExpression", line: 1, column: 1 }]
        },
        {
            code: "window['confirm'](foo)",
            errors: [{ message: "Unexpected confirm.", type: "CallExpression", line: 1, column: 1 }]
        },
        {
            code: "prompt(foo)",
            errors: [{ message: "Unexpected prompt.", type: "CallExpression", line: 1, column: 1 }]
        },
        {
            code: "window.prompt(foo)",
            errors: [{ message: "Unexpected prompt.", type: "CallExpression", line: 1, column: 1 }]
        },
        {
            code: "window['prompt'](foo)",
            errors: [{ message: "Unexpected prompt.", type: "CallExpression", line: 1, column: 1 }]
        },
        {
            code: "function alert() {} window.alert(foo)",
            errors: [{ message: "Unexpected alert.", type: "CallExpression", line: 1, column: 21 }]
        },
        {
            code: "var alert = function () {};\nwindow.alert(foo)",
            errors: [{ message: "Unexpected alert.", type: "CallExpression", line: 2, column: 1 }]
        },
        {
            code: "function foo(alert) { window.alert(); }",
            errors: [{ message: "Unexpected alert.", type: "CallExpression", line: 1, column: 23 }]
        },
        {
            code: "function foo() { alert(); }",
            errors: [{ message: "Unexpected alert.", type: "CallExpression", line: 1, column: 18 }]
        },
        {
            code: "function foo() { var alert = function() {}; }\nalert();",
            errors: [{ message: "Unexpected alert.", type: "CallExpression", line: 2, column: 1 }]
        },
        {
            code: "this.alert(foo)",
            errors: [{ message: "Unexpected alert.", type: "CallExpression", line: 1, column: 1 }]
        },
        {
            code: "this['alert'](foo)",
            errors: [{ message: "Unexpected alert.", type: "CallExpression", line: 1, column: 1 }]
        },
        {
            code: "function foo() { var window = bar; window.alert(); }\nwindow.alert();",
            errors: [{ message: "Unexpected alert.", type: "CallExpression", line: 2, column: 1 }]
        }
    ]
});
