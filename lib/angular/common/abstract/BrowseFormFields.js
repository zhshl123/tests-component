"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowseFormFields = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
class BrowseFormFields {
    constructor(entityMap) {
        /**
         * 给text类型的field填值
         * @param fieldName 字段名
         * @param itemName 要填的值
         * @returns
         */
        this.fillTextInputField = (nthColumn, itemName) => {
            return core_1.Task.where(`#actor fill text input ${nthColumn}th field with ${itemName}`, web_1.Click.on(this.advancedSearchInputField(nthColumn)), web_1.Clear.theValueOf(this.advancedSearchInputField(nthColumn)), web_1.Enter.theValue(itemName).into(this.advancedSearchInputField(nthColumn)));
        };
        /**
         * 条件查询并检查结果
         * @param nthColumn 第几列， 第一列为0， 以此类推
         * @param itemName 字段的期望值
         * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
         * @returns
         */
        this.checkSearchResult = (nthColumn, itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check text ${nthColumn}th field's value with ${itemName} ${expectedResult}`, web_1.Clear.theValueOf(this.advancedSearchInputField(nthColumn)), web_1.Enter.theValue(itemName).into(this.advancedSearchInputField(nthColumn)), core_1.Wait.for(core_1.Duration.ofSeconds(2)), assertions_1.Ensure.eventually(this.textInGrid(itemName), (0, web_1.isVisible)())) : core_1.Task.where(`#actor check text ${nthColumn}th field's value with ${itemName} ${expectedResult}`, web_1.Clear.theValueOf(this.advancedSearchInputField(nthColumn)), web_1.Enter.theValue(itemName).into(this.advancedSearchInputField(nthColumn)), core_1.Wait.for(core_1.Duration.ofSeconds(2)), assertions_1.Ensure.eventually(this.noDataGrid(), (0, web_1.isVisible)()));
        };
        /**
         * 条件查询并检查结果(列表有父子层级)
         * @param nthColumn 第几列， 第一列为0， 以此类推
         * @param itemName 字段的期望值
         * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
         * @returns
         */
        this.checkSearchTreeResult = (nthColumn, itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check text ${nthColumn}th field's value with ${itemName} ${expectedResult}`, web_1.Clear.theValueOf(this.advancedSearchInputField(nthColumn)), web_1.Enter.theValue(itemName).into(this.advancedSearchInputField(nthColumn)), core_1.Wait.for(core_1.Duration.ofSeconds(2)), assertions_1.Ensure.eventually(this.textInGrid(itemName), (0, web_1.isVisible)())) : core_1.Task.where(`#actor check text ${nthColumn}th field's value with ${itemName} ${expectedResult}`, web_1.Clear.theValueOf(this.advancedSearchInputField(nthColumn)), web_1.Enter.theValue(itemName).into(this.advancedSearchInputField(nthColumn)), core_1.Wait.for(core_1.Duration.ofSeconds(2)), assertions_1.Ensure.eventually(this.noTreeDataGrid(), (0, web_1.isVisible)()));
        };
        /**
         * 点击列表中的按钮（首行）
         * @param 按钮名称
         * @returns
         */
        this.clickButtonInGrid = (buttonName) => core_1.Task.where(`#actor click button ${buttonName}`, web_1.Click.on(this.buttonInGrid(buttonName)), core_1.Wait.for(core_1.Duration.ofSeconds(3)));
        /******************************* html 元素组件******************************** */
        /**
         * 条件搜索的输入框
         * @param nthColumn 第几列 第一列为0，以此类推
         * @returns
         */
        this.advancedSearchInputField = (nthColumn) => web_1.PageElements.located(web_1.By.css('.dx-texteditor-input'))
            .nth(nthColumn)
            .describedAs(`${nthColumn} advenced search input field`);
        this.buttonInGrid = (buttonName) => {
            const mappedButtonName = buttonNameMap.get(buttonName);
            return web_1.PageElements.located(web_1.By.css(`[cid="${mappedButtonName}"]`)).first()
                .describedAs('button in grid ' + buttonName);
        };
        this.noDataGrid = () => web_1.PageElement.located(web_1.By.css('.dx-datagrid-nodata'))
            .describedAs('no data grid');
        this.noTreeDataGrid = () => web_1.PageElement.located(web_1.By.css('.dx-treelist-nodata'))
            .describedAs('no tree data grid');
        /**
         * 列表中的指定值
         * @param itemName
         * @returns
         */
        this.textInGrid = (itemName) => web_1.PageElements.located(web_1.By.cssContainingText('.c-cellcntr__text', itemName))
            .first()
            .describedAs(`text: ${itemName} in gird`);
        this.entityMap = entityMap;
    }
}
exports.BrowseFormFields = BrowseFormFields;
const buttonNameMap = new Map();
buttonNameMap.set(DefaultStaticParams_1.EDIT, 'iconbutton4');
buttonNameMap.set(DefaultStaticParams_1.DELETE, 'iconbutton6');
//# sourceMappingURL=BrowseFormFields.js.map