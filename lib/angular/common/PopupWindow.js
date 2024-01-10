"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAndClosePopupWindow = exports.checkAndCloseAlertMessageBox = exports.iconInAlertMessageBox = exports.buttonInAlertMessageBox = exports.alertMssageBox = exports.targetPopupWindow = exports.allPopupWindows = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const ClikButton_1 = require("./ClikButton");
/**
 * 弹窗集合
 * @returns
 */
const allPopupWindows = () => web_1.PageElements.located(web_1.By.css('.c-popup-container'))
    .describedAs('popup windows');
exports.allPopupWindows = allPopupWindows;
/**
 * 目标弹窗
 * @param nthWindow 第几个弹窗，按点击顺序，从最底层往上数， 第一个弹窗为0，以此类推
 * @returns
 */
const targetPopupWindow = (nthWindow) => (0, exports.allPopupWindows)()
    .nth(nthWindow)
    .describedAs(nthWindow + ' popup window');
exports.targetPopupWindow = targetPopupWindow;
/**
 * 提示信息弹窗
 * @returns
 */
const alertMssageBox = () => web_1.PageElement.located(web_1.By.css(`[cdkdragboundary=".drop"]`))
    .describedAs('alert message box');
exports.alertMssageBox = alertMssageBox;
/**
 * 提示信息弹窗的按钮
 * @param buttonName
 * @returns
 */
const buttonInAlertMessageBox = (buttonName) => web_1.PageElement.located(web_1.By.cssContainingText('button', buttonName))
    .of((0, exports.alertMssageBox)())
    .describedAs(buttonName + ' in alert message box');
exports.buttonInAlertMessageBox = buttonInAlertMessageBox;
/**
 * 提示信息框的标题图标
 * @returns
 */
const iconInAlertMessageBox = () => web_1.PageElement.located(web_1.By.css('.c-popup__titleicon'))
    .of((0, exports.alertMssageBox)())
    .describedAs('icon in alert message box');
exports.iconInAlertMessageBox = iconInAlertMessageBox;
/**
 * 检查提示信息弹窗，并关闭
 * @returns
 */
const checkAndCloseAlertMessageBox = () => core_1.Task.where(`#actor check alert message box and close it`, core_1.Check.whether((0, exports.iconInAlertMessageBox)(), (0, web_1.isVisible)()).andIfSo(assertions_1.Ensure.eventually((0, exports.alertMssageBox)(), (0, web_1.isVisible)()), web_1.Click.on((0, exports.buttonInAlertMessageBox)(DefaultStaticParams_1.OK))));
exports.checkAndCloseAlertMessageBox = checkAndCloseAlertMessageBox;
/**
 * 检查提示信息弹窗，并关闭弹窗
 * @returns
 */
const checkAndClosePopupWindow = () => core_1.Task.where(`#actor check alert message box and close popup`, core_1.Check.whether((0, exports.iconInAlertMessageBox)(), (0, web_1.isVisible)()).andIfSo(assertions_1.Ensure.eventually((0, exports.iconInAlertMessageBox)(), (0, web_1.isVisible)()), web_1.Click.on((0, exports.buttonInAlertMessageBox)(DefaultStaticParams_1.OK)), ClikButton_1.clickIconButton.using('Close')));
exports.checkAndClosePopupWindow = checkAndClosePopupWindow;
//# sourceMappingURL=PopupWindow.js.map