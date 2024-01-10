"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPageTitle = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
// 检查page title（浏览器tab上显示的名字）
exports.checkPageTitle = {
    using: (expectedPageTitle) => core_1.Task.where(`#actor check the page title is ${expectedPageTitle} or not`, assertions_1.Ensure.eventually(web_1.Page.current().title(), (0, assertions_1.equals)(expectedPageTitle)))
};
//# sourceMappingURL=CheckPageTitle.js.map