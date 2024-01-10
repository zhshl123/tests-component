"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.popupButton = exports.gridButton = exports.selectAllCheckBox = exports.targetGridButton = exports.actionButton = exports.sectionButtonOfTargetElement = exports.sectionButton = exports.commonButton = exports.targetButton = exports.buttonInList = exports.checkButtonEnable = exports.checkSectionButtonVisible = exports.checkButtonVisible = exports.clickPopupButton = exports.clickGridCellButton = exports.clickActionButton = exports.clickSelectAllCheckBox = exports.clickGridButton = exports.clickSectionButtonOfTargetElement = exports.clickSectionButton = exports.clickButtonInList = exports.clickButton = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const GridList_1 = require("./GridList");
/**
 * 点击目标按钮（主要为page顶部的按钮）
 * @param targetButtonName 目标按钮名称 具体参看文件DefaultStaticParams.ts文件中的常量
 */
exports.clickButton = {
    using: (targetButtonName) => core_1.Task.where(`#actor click the button ${targetButtonName}`, web_1.Click.on((0, exports.targetButton)(targetButtonName)))
};
/**
 * 点击列表中首行的的按钮
 * @param buttonName 按钮名称 具体参看文件DefaultStaticParams.ts文件中的常量
 */
exports.clickButtonInList = {
    using: (buttonName) => core_1.Task.where(`#actor click the grid button ${buttonName}`, web_1.Click.on((0, exports.buttonInList)(buttonName)))
};
/**
 * 点击Section的按钮（页面中只有一个bulk edit section时可用）
 * @param buttonName 按钮名称 具体参看文件DefaultStaticParams.ts文件中的常量
 */
exports.clickSectionButton = {
    using: (buttonName) => core_1.Task.where(`#actor click the section button ${buttonName}`, web_1.Click.on((0, exports.sectionButton)(buttonName)))
};
/**
 * 点击指定Section的按钮（页面中有多个bulk edit section时使用）
 * @param buttonName 按钮名称 具体参看文件DefaultStaticParams.ts文件中的常量
 * @param parentElement section的元素名称
 */
exports.clickSectionButtonOfTargetElement = {
    using: (buttonName, parentElement) => core_1.Task.where(`#actor click the section button ${buttonName}`, web_1.Click.on((0, exports.sectionButtonOfTargetElement)(buttonName, parentElement)))
};
/**
 * 点击Tab页面中Grid Section顶部的按钮
 * @param tabPage 目标Tab页面
 * @param GridButton 目标按钮名称
 */
exports.clickGridButton = {
    using: (tabPage, GridButton) => core_1.Task.where(`#actor click the button ${GridButton}`, web_1.Click.on((0, exports.targetGridButton)(tabPage, GridButton)))
};
/**
 * 点击Tab页面中Grid Section全选CheckBox
 * @param tabPage 目标Tab页面
 * @param GridButton 目标按钮名称
 */
exports.clickSelectAllCheckBox = {
    using: (tabPage, GridButton) => core_1.Task.where(`#actor click the button ${GridButton}`, web_1.Click.on((0, exports.selectAllCheckBox)(tabPage, GridButton)))
};
/**
 * click action button (一般为页面顶部的操作按钮)
 * @returns
 */
exports.clickActionButton = {
    using: (buttonName) => core_1.Task.where(`#actor click action button: ${buttonName}`, web_1.Click.on((0, exports.actionButton)(buttonName)))
};
/**
 * click grid内部的button (一般为Grid行内的操作按钮)
 * @returns
 */
exports.clickGridCellButton = {
    using: (buttonName) => core_1.Task.where(`#actor click action button: ${buttonName}`, web_1.Click.on((0, exports.gridButton)(buttonName)))
};
/**
 * click Popup Window的button
 * @returns
 */
exports.clickPopupButton = {
    using: (buttonName) => core_1.Task.where(`#actor click action button: ${buttonName}`, web_1.Click.on((0, exports.popupButton)(buttonName)))
};
/**
 * 检查按钮是否可见（页面顶部的按钮）
 * @param 按钮名称
 * @param 预期结果 SUCCEEDED 按钮可见 FAILED 按钮不可见
 */
exports.checkButtonVisible = {
    using: (buttonName, expectedResult) => {
        return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check button: ${buttonName} visible ${expectedResult}`, assertions_1.Ensure.eventually((0, exports.targetButton)(buttonName), (0, web_1.isVisible)())) : core_1.Task.where(`#actor check bulk edit section button: ${buttonName} visible ${expectedResult}`, assertions_1.Ensure.eventually((0, exports.targetButton)(buttonName), (0, assertions_1.not)((0, web_1.isVisible)())));
    }
};
/**
 * 检查Section 按钮是否可见（页面顶部的按钮）
 * @param 按钮名称
 * @param 预期结果 SUCCEEDED 按钮可见 FAILED 按钮不可见
 */
exports.checkSectionButtonVisible = {
    using: (buttonName, expectedResult) => {
        return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check section button: ${buttonName} visible ${expectedResult}`, assertions_1.Ensure.eventually((0, exports.sectionButton)(buttonName), (0, web_1.isVisible)())) : core_1.Task.where(`#actor check section button: ${buttonName} visible ${expectedResult}`, assertions_1.Ensure.eventually((0, exports.sectionButton)(buttonName), (0, assertions_1.not)((0, web_1.isVisible)())));
    }
};
/**
 * 检查bulk edit section 按钮是否可点击（页面顶部的按钮）
 * @param 按钮名称
 * @param 预期结果 SUCCEEDED 按钮可点击 FAILED 按钮不可点击
 */
exports.checkButtonEnable = {
    using: (buttonName, expectedResult) => {
        return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check bulk edit section button: ${buttonName} visible ${expectedResult}`, assertions_1.Ensure.eventually((0, exports.targetButton)(buttonName), (0, web_1.isEnabled)())) : core_1.Task.where(`#actor check bulk edit section button: ${buttonName} visible ${expectedResult}`, assertions_1.Ensure.eventually((0, exports.targetButton)(buttonName), (0, assertions_1.not)((0, web_1.isEnabled)())));
    }
};
/**
 * 根据按钮名称获取列表首行的按钮
 * @param buttonName 按钮名称
 * @returns
 */
const buttonInList = (buttonName) => web_1.PageElement.located(web_1.By.css(`[title="${buttonName}"]`))
    .of((0, GridList_1.gridList)().first())
    .describedAs(buttonName + 'button');
exports.buttonInList = buttonInList;
/**
 * 通用的按钮组件 （Advanced Search、Add、Save、Cancel、OK）
 * @param targetButton
 * @returns
 */
const targetButton = (targetButtonName) => web_1.PageElement.located(web_1.By.css(`[value="${targetButtonName}"]`))
    .describedAs(targetButtonName + 'button');
exports.targetButton = targetButton;
const commonButton = (targetButtonName) => web_1.PageElement.located(web_1.By.id('ctl00_btn' + targetButtonName))
    .describedAs(targetButtonName + 'button');
exports.commonButton = commonButton;
const sectionButton = (buttonName) => web_1.PageElement.located(web_1.By.css(`[title="${buttonName}"]`))
    .describedAs(buttonName + 'button');
exports.sectionButton = sectionButton;
const sectionButtonOfTargetElement = (buttonName, parentElement) => web_1.PageElement.located(web_1.By.css(`[title="${buttonName}"]`))
    .of(parentElement)
    .describedAs(buttonName + 'button');
exports.sectionButtonOfTargetElement = sectionButtonOfTargetElement;
const actionButton = (buttonName) => web_1.PageElement.located(web_1.By.id('ctl00_cipActionBar_btn' + buttonName))
    .describedAs('action button:' + buttonName);
exports.actionButton = actionButton;
/**
 * Grid通用的按钮组件 （Add、Export、Load From、Batch Delete）
 * @param targetButton
 * @param tabName
 * @returns
 */
const targetGridButton = (tabName, targetGridButton) => web_1.PageElement.located(web_1.By.id('ctl00_body_gv' + tabName + '_ctl01_' + targetGridButton))
    .describedAs(tabName + targetGridButton + 'button');
exports.targetGridButton = targetGridButton;
/**
 * Grid全选CheckBox（例Solicitation Bidders Tab Grid）
 * @param targetButton
 * @param tabName
 * @returns
 */
const selectAllCheckBox = (tabName, targetGridButton) => web_1.PageElement.located(web_1.By.id('ctl00_body_gv' + tabName + '_ctl02_' + targetGridButton))
    .describedAs(tabName + targetGridButton + 'button');
exports.selectAllCheckBox = selectAllCheckBox;
/**
 * Grid内button（例Edit、Delete Button）
 * @param targetButton
 * @returns
 */
const gridButton = (targetGridButton) => web_1.PageElement.located(web_1.By.css(`[alt="${targetGridButton}"]`))
    .describedAs(targetGridButton + 'button');
exports.gridButton = gridButton;
/**
 * Popup button（例OK、Cancel Button）
 * @param targetButton
 * @returns
 */
const popupButton = (targetPopupButton) => web_1.PageElement.located(web_1.By.id('ctl00_btn' + targetPopupButton))
    .describedAs(targetPopupButton + 'button');
exports.popupButton = popupButton;
//# sourceMappingURL=ClickButton.js.map