"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageSaveLodingLayer = exports.gridLoadingLayer = exports.pageLoadingLayer = exports.messagePopupContentLink = exports.solicitationMessagePopupButton = exports.messagePopupButton = exports.messagePopupContent = exports.solicitationMessagePopupBox = exports.messagePopupBox = exports.waitPageSaveLodingLayerInvisible = exports.checkGridLoadingLayer = exports.checkMessagePopupContent = exports.clickMessagePopupContentLink = exports.clickSolicitationMessagePopupButton = exports.clickMessagePopupButton = exports.waitMessagePopupBoxInvisible = exports.waitMessagePopupBoxVisible = exports.checkMessagePopupBox = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const ClickButton_1 = require("./ClickButton");
/**
 * check message popup is show or not
 * @returns
 */
const checkMessagePopupBox = () => core_1.Task.where(`#actor check message popup box`, assertions_1.Ensure.eventually((0, exports.messagePopupBox)(), (0, assertions_1.isPresent)()));
exports.checkMessagePopupBox = checkMessagePopupBox;
/**
 * check message popup is visible
 * @returns
 */
const waitMessagePopupBoxVisible = () => core_1.Task.where(`#actor check message popup box`, core_1.Wait.until((0, exports.messagePopupBox)(), (0, web_1.isVisible)()), core_1.Check.whether(web_1.Text.of((0, exports.messagePopupContent)()), (0, assertions_1.includes)('Duplicate')).andIfSo(exports.clickMessagePopupButton.using(DefaultStaticParams_1.OK), ClickButton_1.clickActionButton.using(DefaultStaticParams_1.CANCEL)).otherwise(core_1.Check.whether(web_1.Text.of((0, exports.messagePopupContent)()), (0, assertions_1.includes)('already')).andIfSo(exports.clickMessagePopupButton.using(DefaultStaticParams_1.OK), ClickButton_1.clickActionButton.using(DefaultStaticParams_1.CANCEL))));
exports.waitMessagePopupBoxVisible = waitMessagePopupBoxVisible;
/**
 * wait message popup invisible
 * @returns
 */
const waitMessagePopupBoxInvisible = () => core_1.Task.where(`#actor wait message popup invisible`, core_1.Wait.until((0, exports.messagePopupBox)(), (0, assertions_1.not)((0, web_1.isVisible)())));
exports.waitMessagePopupBoxInvisible = waitMessagePopupBoxInvisible;
/**
 * click message popup button
 * @returns
 */
exports.clickMessagePopupButton = {
    using: (buttonName) => core_1.Task.where(`#actor click message popup button: ${buttonName}`, web_1.Click.on((0, exports.messagePopupButton)(buttonName)))
};
/**
 * click solicitation message popup button
 * @returns
 */
exports.clickSolicitationMessagePopupButton = {
    using: (buttonName) => core_1.Task.where(`#actor click message popup button`, web_1.Click.on((0, exports.solicitationMessagePopupButton)(buttonName)))
};
/**
 * click message popup content link
 * @returns
 */
const clickMessagePopupContentLink = () => core_1.Task.where(`#actor click message popup content link`, web_1.Click.on((0, exports.messagePopupContentLink)()));
exports.clickMessagePopupContentLink = clickMessagePopupContentLink;
/**
 * 检查信息提示框内容
 * @Param 预期的文字
 * @param 期望结果 SUCCEEDED与预期一致， FAILED 与预期不一致
 * @returns
 */
exports.checkMessagePopupContent = {
    using: (content, expectedResult) => {
        return expectedResult == DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check message popup content`, assertions_1.Ensure.eventually((0, exports.messagePopupBox)(), (0, web_1.isVisible)()), assertions_1.Ensure.eventually(web_1.Text.of((0, exports.messagePopupContent)()), (0, assertions_1.includes)(content))) : core_1.Task.where(`#actor check message popup content`, assertions_1.Ensure.eventually((0, exports.messagePopupBox)(), (0, web_1.isVisible)()), assertions_1.Ensure.eventually(web_1.Text.of((0, exports.messagePopupContent)()), (0, assertions_1.not)((0, assertions_1.includes)(content))));
    }
};
const checkGridLoadingLayer = () => core_1.Task.where(`#actor wait grid load complete`, core_1.Wait.until((0, exports.gridLoadingLayer)(), (0, assertions_1.not)((0, web_1.isVisible)())));
exports.checkGridLoadingLayer = checkGridLoadingLayer;
const waitPageSaveLodingLayerInvisible = () => core_1.Task.where(`#actor wait page save load complete`, core_1.Wait.until((0, exports.pageSaveLodingLayer)(), (0, assertions_1.not)((0, web_1.isVisible)())));
exports.waitPageSaveLodingLayerInvisible = waitPageSaveLodingLayerInvisible;
const messagePopupBox = () => web_1.PageElement.located(web_1.By.id('ctl00_popupForModalPopup'))
    .describedAs('message popup box');
exports.messagePopupBox = messagePopupBox;
const solicitationMessagePopupBox = () => web_1.PageElement.located(web_1.By.id('ctl00_body_cbDelete_Dialog_DialogPanel'))
    .describedAs('solicitation message popup box');
exports.solicitationMessagePopupBox = solicitationMessagePopupBox;
const messagePopupContent = () => web_1.PageElement.located(web_1.By.id('ctl00_dvConfirmBoxContent'))
    .of((0, exports.messagePopupBox)())
    .describedAs('message popup content');
exports.messagePopupContent = messagePopupContent;
const messagePopupButton = (buttonName) => web_1.PageElement.located(web_1.By.css(`[value="${buttonName}"]`))
    .of((0, exports.messagePopupBox)())
    .describedAs('message popup button:' + buttonName);
exports.messagePopupButton = messagePopupButton;
const solicitationMessagePopupButton = (buttonName) => web_1.PageElement.located(web_1.By.css(`[value="${buttonName}"]`))
    .of((0, exports.solicitationMessagePopupBox)())
    .describedAs('solicitation message popup button:' + buttonName);
exports.solicitationMessagePopupButton = solicitationMessagePopupButton;
const messagePopupContentLink = () => web_1.PageElement.located(web_1.By.css('a'))
    .of((0, exports.messagePopupBox)())
    .describedAs('message popup conternt link');
exports.messagePopupContentLink = messagePopupContentLink;
const pageLoadingLayer = () => web_1.PageElement.located(web_1.By.id('promptBox'))
    .describedAs('page loading layer');
exports.pageLoadingLayer = pageLoadingLayer;
const gridLoadingLayer = () => web_1.PageElement.located(web_1.By.css(`[data-name="divWaitingLoading"]`))
    .describedAs('grid loading layer');
exports.gridLoadingLayer = gridLoadingLayer;
const pageSaveLodingLayer = () => web_1.PageElement.located(web_1.By.id('ajaxMask'))
    .describedAs('page Save Loding Layer');
exports.pageSaveLodingLayer = pageSaveLodingLayer;
//# sourceMappingURL=messagePopup.js.map