"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splittingLineitem = exports.SplittingLineItemFields = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
class SplittingLineItemFields {
    constructor() {
        this.editSplittingLineItemDetailPopupButton = (buttonName) => web_1.PageElement.located(web_1.By.id('ctl00_body_ucSplit_popDialogBox_btn' + buttonName))
            .describedAs('splitting line item edit popup button:' + buttonName);
        this.splittingLineitemSectionPanel = () => web_1.PageElement.located(web_1.By.id('div_ctl00_body_ucSplit_gv'))
            .describedAs('splitting line item setion panel');
        this.editIconList = () => web_1.PageElements.located(web_1.By.css('.imgEditPointer'))
            .of(this.splittingLineitemSectionPanel())
            .describedAs('buttons in splitting line item grid');
        this.editSplittingLineItemDetailPopupPanel = () => web_1.PageElement.located(web_1.By.id('ctl00_body_ucSplit_popDialogBox_DialogPanel'))
            .describedAs('splitting line item edit popup panel');
        /**
         * 点击grid中首行的button
         * @returns
         */
        this.clickEditButtonInGrid = () => core_1.Task.where(`#actor click button in splitting Line item grid`, web_1.Click.on(this.editIconList().first()));
        /**
         * 检查edit splitting line item detail弹窗的按钮是否可用
         * @param buttonName
         * @param expectedResult
         * @returns
         */
        this.checkButtonEnableInEditSplittingDetailPopup = (buttonName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check ${buttonName} button in splitting line item edit popup ${expectedResult}`, assertions_1.Ensure.eventually(this.editSplittingLineItemDetailPopupPanel(), (0, web_1.isVisible)()), web_1.Switch.to(this.editSplittingLineItemDetailPopupPanel()), assertions_1.Ensure.eventually(this.editSplittingLineItemDetailPopupButton(buttonName), (0, web_1.isEnabled)()), web_1.Click.on(this.editSplittingLineItemDetailPopupButton(DefaultStaticParams_1.CANCEL))) : core_1.Task.where(`#actor check ${buttonName} button in splitting line item edit popup ${expectedResult}`, assertions_1.Ensure.eventually(this.editSplittingLineItemDetailPopupPanel(), (0, web_1.isVisible)()), web_1.Switch.to(this.editSplittingLineItemDetailPopupPanel()), assertions_1.Ensure.eventually(this.editSplittingLineItemDetailPopupButton(buttonName), (0, assertions_1.not)((0, web_1.isEnabled)())), web_1.Click.on(this.editSplittingLineItemDetailPopupButton(DefaultStaticParams_1.CANCEL)));
        };
    }
}
exports.SplittingLineItemFields = SplittingLineItemFields;
exports.splittingLineitem = new SplittingLineItemFields();
//# sourceMappingURL=SplittingLineItemFields.js.map