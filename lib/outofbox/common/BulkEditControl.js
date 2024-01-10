"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkEditSectionButton = exports.bulkEditDropdownItem = exports.bulkEditDropdownList = exports.bulkEditDropdownListBox = exports.bulkEditDropdownIcon = exports.bulkEditDropdownContainer = exports.bulkEditControlPopupPanel = exports.checkBulkEditSetionButtonVisible = exports.clickBulkEditSetionButton = exports.clickBulkEditDropdownItem = exports.clickBulkEditDropdownIcon = exports.checkBulkEditControlPanel = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
/**
 * 检查bulk edit按钮点出的弹窗页面
 * @returns
 */
const checkBulkEditControlPanel = () => core_1.Task.where(`#actor check bulk edit control popup panel`, assertions_1.Ensure.eventually((0, exports.bulkEditControlPopupPanel)(), (0, web_1.isVisible)()));
exports.checkBulkEditControlPanel = checkBulkEditControlPanel;
/**
 * 点击BUlk Edit 表格里的下拉框的按钮
 * @param 父级html元素
 * @returns
 */
exports.clickBulkEditDropdownIcon = {
    using: (parentElement) => core_1.Task.where(`#actor click bulk edit field drop button`, web_1.Click.on((0, exports.bulkEditDropdownIcon)(parentElement)), assertions_1.Ensure.eventually((0, exports.bulkEditDropdownList)(), (0, assertions_1.isPresent)()))
};
/**
 * 点击下拉框的某个值
 * @param 要选择的值
 * @returns
 */
exports.clickBulkEditDropdownItem = {
    using: (itemName) => core_1.Task.where(`#actor click bulk edit dropdown item: ${itemName}`, web_1.Click.on((0, exports.bulkEditDropdownItem)(itemName)))
};
/**
 * 点击Bulik edit Section顶部的按钮
 * @param 按钮名称
 */
exports.clickBulkEditSetionButton = {
    using: (buttonName) => core_1.Task.where(`#actor click bulk edit section button: ${buttonName}`, web_1.Click.on((0, exports.bulkEditSectionButton)(buttonName)))
};
/**
 * 检查Bulik edit Section顶部的按钮是否可见
 * @param 按钮名称
 * @param 预期结果 SUCCEEDED 按钮可见 FAILED 按钮不可见
 */
exports.checkBulkEditSetionButtonVisible = {
    using: (buttonName, expectedResult) => {
        return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check bulk edit section button: ${buttonName} visible ${expectedResult}`, assertions_1.Ensure.eventually((0, exports.bulkEditSectionButton)(buttonName), (0, web_1.isVisible)())) : core_1.Task.where(`#actor check bulk edit section button: ${buttonName} visible ${expectedResult}`, assertions_1.Ensure.eventually((0, exports.bulkEditSectionButton)(buttonName), (0, assertions_1.not)((0, web_1.isVisible)())));
    }
};
// BUlk edit 点击lokkup后的 popup
const bulkEditControlPopupPanel = () => web_1.PageElement.located(web_1.By.id('ctl00_body_bulkEditControl1_ctl02_gridifmPopup'))
    .describedAs('bulk edit control popup panel');
exports.bulkEditControlPopupPanel = bulkEditControlPopupPanel;
// 下拉框
const bulkEditDropdownContainer = () => web_1.PageElement.located(web_1.By.css('.k-animation-container'))
    .describedAs('bulk edit control dropdown list');
exports.bulkEditDropdownContainer = bulkEditDropdownContainer;
// 下拉框图标
const bulkEditDropdownIcon = (parentElement) => web_1.PageElement.located(web_1.By.css('.k-select'))
    .of(parentElement)
    .describedAs('bulk edit control dropdown icon');
exports.bulkEditDropdownIcon = bulkEditDropdownIcon;
const bulkEditDropdownListBox = () => web_1.PageElement.located(web_1.By.css('.k-animation-container'))
    .describedAs('bulk edit control dropdown list box');
exports.bulkEditDropdownListBox = bulkEditDropdownListBox;
const bulkEditDropdownList = () => web_1.PageElements.located(web_1.By.css('li'))
    .of((0, exports.bulkEditDropdownListBox)())
    .describedAs('bulk edit control dropdown list');
exports.bulkEditDropdownList = bulkEditDropdownList;
// 具体下拉框的值
const bulkEditDropdownItem = (itemName) => web_1.PageElements.located(web_1.By.cssContainingText('li', itemName))
    .of((0, exports.bulkEditDropdownListBox)())
    .first()
    .describedAs('bulk edit control dropdown item:' + itemName);
exports.bulkEditDropdownItem = bulkEditDropdownItem;
const bulkEditSectionButton = (buttonName) => {
    buttonName = bulkEditButtonNameMap.get(buttonName);
    return web_1.PageElement.located(web_1.By.css(`[data-name="n_${buttonName}"]`))
        .describedAs('Bulk edit control section button:' + buttonName);
};
exports.bulkEditSectionButton = bulkEditSectionButton;
const bulkEditButtonNameMap = new Map();
bulkEditButtonNameMap.set(DefaultStaticParams_1.INSERT, 'addRow');
bulkEditButtonNameMap.set(DefaultStaticParams_1.LOAD_FROM, 'showLoadLineItem');
bulkEditButtonNameMap.set(DefaultStaticParams_1.BATCH_DELETE, 'batchDelete');
bulkEditButtonNameMap.set(DefaultStaticParams_1.DATA_EXPORT, 'dataExport');
bulkEditButtonNameMap.set(DefaultStaticParams_1.GENERIC_EXPORT, 'dataGenericExport');
bulkEditButtonNameMap.set(DefaultStaticParams_1.RESET, 'Refresh');
//# sourceMappingURL=BulkEditControl.js.map