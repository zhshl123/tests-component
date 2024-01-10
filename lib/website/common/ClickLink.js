"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.link = exports.clickLink = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
exports.clickLink = {
    using: (linkText) => core_1.Task.where(`#actor click the link ${linkText}`, web_1.Click.on((0, exports.link)(linkText)))
};
const link = (linkText) => web_1.PageElement.located(web_1.By.cssContainingText('a', linkText))
    .describedAs('grid link');
exports.link = link;
//# sourceMappingURL=ClickLink.js.map