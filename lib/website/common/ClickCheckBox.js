"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gridAllCheckBox = exports.resultGridBox = exports.gridHeadRowCheckBox = exports.gridHeadRow = exports.multiCheckBoxInGrid = exports.singleCheckBoxInGrid = exports.clickAllCheckBox = exports.clickFirstSingleCheckBox = exports.clickFirstMultiCheckBox = exports.clickAllMultiCheckBox = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
/**
 * 点击列表中的多选框（全选）
 */
const clickAllMultiCheckBox = () => core_1.Task.where(`#actor click all the multi checkbox in grid`, web_1.Click.on((0, exports.gridHeadRowCheckBox)()));
exports.clickAllMultiCheckBox = clickAllMultiCheckBox;
/**
 * 点击列表中的多选框（首行）
 */
const clickFirstMultiCheckBox = () => core_1.Task.where(`#actor click first multi checkbox in grid`, web_1.Click.on((0, exports.multiCheckBoxInGrid)().nth(1)));
exports.clickFirstMultiCheckBox = clickFirstMultiCheckBox;
/**
 * 点击列表中的单选框（首行）
 */
const clickFirstSingleCheckBox = () => core_1.Task.where(`#actor click first single checkbox in grid`, web_1.Click.on((0, exports.singleCheckBoxInGrid)().first()));
exports.clickFirstSingleCheckBox = clickFirstSingleCheckBox;
/**
 * 点击列表中的全选框
 */
const clickAllCheckBox = () => core_1.Task.where(`#actor click all checkbox in grid`, web_1.Click.on((0, exports.gridAllCheckBox)()));
exports.clickAllCheckBox = clickAllCheckBox;
/**
 * 列表中的单选框集合
 */
const singleCheckBoxInGrid = () => web_1.PageElements.located(web_1.By.css(`[type="radio"]`))
    .of((0, exports.resultGridBox)())
    .describedAs('single checkbox');
exports.singleCheckBoxInGrid = singleCheckBoxInGrid;
/**
 * 多选框按钮集合
 * @returns
 */
const multiCheckBoxInGrid = () => web_1.PageElements.located(web_1.By.css(`[type="checkbox"]`))
    .of((0, exports.resultGridBox)())
    .describedAs('multi checkbox in grid');
exports.multiCheckBoxInGrid = multiCheckBoxInGrid;
// grid首行
const gridHeadRow = () => web_1.PageElement.located(web_1.By.css('.cstdgrid__headrow'))
    .describedAs('grid head row');
exports.gridHeadRow = gridHeadRow;
// 首行的勾选框
const gridHeadRowCheckBox = () => web_1.PageElement.located(web_1.By.css(`[type="checkbox"]`))
    .of((0, exports.gridHeadRow)())
    .describedAs('grid head row check box');
exports.gridHeadRowCheckBox = gridHeadRowCheckBox;
/**
 * 结果列表面板
 * @returns
 */
const resultGridBox = () => web_1.PageElement.located(web_1.By.id('resultGrid'))
    .describedAs('result grid box');
exports.resultGridBox = resultGridBox;
/**
 * Grid全选CheckBox
 * @returns
 */
const gridAllCheckBox = () => web_1.PageElement.located(web_1.By.id('check-all'))
    .describedAs('grid select all checkbox');
exports.gridAllCheckBox = gridAllCheckBox;
//# sourceMappingURL=ClickCheckBox.js.map