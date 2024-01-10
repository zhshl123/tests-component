"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iconButton = exports.targetButton = exports.clickIconButton = exports.clickButton = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
/**
 * 点击目标按钮
 * @param targetButtonName 按钮名称
 * @param nthButton 第几个按钮 默认0
 */
exports.clickButton = {
    using: (targetButtonName, nthButton = 0) => core_1.Task.where(`#actor click the button ${targetButtonName}`, assertions_1.Ensure.eventually(exports.targetButton.getButton(targetButtonName, nthButton), (0, assertions_1.isPresent)()), web_1.Click.on(exports.targetButton.getButton(targetButtonName, nthButton)))
};
/**
 * 点击目标按钮
 */
exports.clickIconButton = {
    using: (targetButtonName, nthButton = 0) => core_1.Task.where(`#actor click the icon button ${targetButtonName}`, web_1.Click.on((0, exports.iconButton)(targetButtonName, nthButton)))
};
/**
 * 通用的按钮组件 （Advanced Search、Add、Save、Cancel、）
 * @param targetButton
 * @returns
 */
exports.targetButton = {
    getButton: (targetButtonName, nthButton = 0) => web_1.PageElements.located(web_1.By.cssContainingText('.c-icontext__text', targetButtonName))
        .nth(nthButton)
        .describedAs('button: ' + targetButtonName)
};
/**
 * 通用图形的按钮组件,主要为页面顶部的图形按钮，例如open in a tab，弹窗的关闭按钮等
 * @param buttonName
 * @returns
 */
const iconButton = (buttonName, nthButton = 0) => web_1.PageElements.located(web_1.By.css(`[title="${buttonName}"]`))
    .nth(nthButton)
    .describedAs('icon button ' + buttonName);
exports.iconButton = iconButton;
//# sourceMappingURL=ClikButton.js.map