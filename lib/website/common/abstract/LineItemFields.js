"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineItemFields = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
const BulkEditControl_1 = require("../BulkEditControl");
class LineItemFields {
    constructor(entityMap) {
        /**
         * section所在的panel，由于section panel的id暂时没有发现规律，所以子类需要重写此方法
         * @returns
         */
        this.lineItemsSectionPanel = () => web_1.PageElement.located(web_1.By.id(''))
            .describedAs('line item section panel');
        /**
         * edit line item detail 弹窗所在的panel， 此方法子类需要根据实际popup的id重写
         * @returns
         */
        this.editLineItemDetailPopupPanel = () => web_1.PageElement.located(web_1.By.id(''))
            .describedAs('edit line item detail popup panel');
        /********************************* interactions ******************************************** */
        /**
         * 在普通文本单元格填值
         * @param rowNumber 行号
         * @param fieldName 字段名称
         * @param itemName 要填的值
         * @returns
         */
        this.fillTextInputField = (rowNumber, fieldName, itemName) => {
            return core_1.Task.where(`#actor fill row ${rowNumber} line item: ${fieldName} with ${itemName}`, web_1.Click.on(this.tableCell(rowNumber, fieldName)), web_1.Clear.theValueOf(this.textInputField(rowNumber, fieldName)), web_1.Enter.theValue(itemName).into(this.textInputField(rowNumber, fieldName)));
        };
        /**
         * 在数字单元格填值
         * @param rowNumber 行号
         * @param fieldName 字段名称
         * @param itemName 要填的值
         * @returns
         */
        this.fillNumberInputField = (rowNumber, fieldName, itemName) => {
            return core_1.Task.where(`#actor fill row ${rowNumber} line item: ${fieldName} with ${itemName}`, web_1.Click.on(this.tableCell(rowNumber, fieldName)), web_1.Clear.theValueOf(this.numberInputField(rowNumber, fieldName)), web_1.Enter.theValue(itemName).into(this.numberInputField(rowNumber, fieldName)), web_1.Click.on(this.checkBox(rowNumber)));
        };
        /**
         * 选择下拉框的值
         * @param rowNumber 行号
         * @param fieldName 字段名称
         * @param itemName 下拉框的值
         * @returns
         */
        this.selectDropdownItem = (rowNumber, fieldName, itemName) => {
            return core_1.Task.where(`#actor row ${rowNumber} select line item dropdown: ${fieldName} with ${itemName}`, web_1.Click.on(this.tableCell(rowNumber, fieldName)), core_1.Wait.for(core_1.Duration.ofSeconds(2)), web_1.Click.on((0, BulkEditControl_1.bulkEditDropdownItem)(itemName)));
        };
        /**
       * 选择lookup下拉框的值
       * @param rowNumber 行号
       * @param fieldName 字段名称
       * @param itemName 下拉框的值
       * @returns
       */
        this.selectLookupDropdownItem = (rowNumber, fieldName, itemName) => {
            return core_1.Task.where(`#actor select row ${rowNumber} line item dropdown: ${fieldName} with ${itemName}`, web_1.Click.on(this.tableCell(rowNumber, fieldName)), web_1.Click.on(this.dropdownIcon(rowNumber, fieldName)), core_1.Wait.for(core_1.Duration.ofSeconds(2)), web_1.Click.on((0, BulkEditControl_1.bulkEditDropdownItem)(itemName)));
        };
        /**
         * 校验单元格的值
         * @param rowNumber 行号
         * @param fieldName 字段名
         * @param itemName 要检验的值
         * @param expectedResult 期望结果（单元格的值与要校验的值是否一致）
         * @returns
         */
        this.checkCellValue = (rowNumber, fieldName, itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check line item row ${rowNumber}, ${fieldName}'s cell value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Text.of(this.tableCell(rowNumber, fieldName)), (0, assertions_1.equals)(itemName))) : core_1.Task.where(`#actor check line item row ${rowNumber}, ${fieldName}'s cell value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Text.of(this.tableCell(rowNumber, fieldName)), (0, assertions_1.not)((0, assertions_1.equals)(itemName))));
        };
        /**
         * 点击行中的按钮
         * @param rowNumber 行号
         * @param buttonName 按钮名称
         * @returns
         */
        this.clickButtonInButtonGroup = (rowNumber, buttonName) => {
            const mappedButtonName = buttonNameMap.get(buttonName);
            return core_1.Task.where(`#actor click button ${mappedButtonName} in button group at line ${rowNumber}`, web_1.Click.on(this.buttonInButtonGroup(rowNumber, buttonName)));
        };
        /**
         * 点击edit line item detail弹窗页面顶部的按钮
         * @param buttonName
         * @returns
         */
        this.clickButtonInEditLineItemDetailPopup = (buttonName) => core_1.Task.where(`#actor click edit line item detail popup button: ${buttonName}`, web_1.Click.on(this.editLineItemDetailPopupButton(buttonName)));
        /**
         * 填写edit line item popup页面
         * @param buttonName
         * @returns
         */
        this.fillEditLineItemDetailPopup = (rowNumber, fieldName, itemName) => {
            return core_1.Task.where(`#actor fill row ${rowNumber} line item: ${fieldName} with ${itemName}`, web_1.Click.on(this.tableCell(rowNumber, fieldName)), web_1.Enter.theValue(itemName).into(this.textareaPopup(fieldName)));
        };
        /********************************* html 元素组件********************************************** */
        /**
         * section 名称
         * @param sectionName section 名称
         * @returns
         */
        this.lineItemsSectionTitle = (sectionName) => web_1.PageElement.located(web_1.By.cssContainingText(`[data-name="sectionName"]`, sectionName))
            .describedAs('line item section title: ' + sectionName);
        /**
         * section 表格的行
         * @returns
         */
        this.lineItemsTr = () => web_1.PageElements.located(web_1.By.css('tr'))
            .of(this.editableTableBox())
            .describedAs('line item tr lines');
        /**
         * 表头单元格
         * @param fieldName
         * @returns
         */
        this.lineItemHeadCell = (fieldName) => web_1.PageElement.located(web_1.By.cssContainingText(`[role="columnheader"]`, fieldName))
            .describedAs('line item head cell: ' + fieldName);
        /**
         * 可编辑的表格部分
         * @returns
         */
        this.editableTableBox = () => web_1.PageElement.located(web_1.By.css('.k-virtual-scrollable-wrap'))
            .describedAs('line item editable table box');
        /**
         * 不可编辑的表格
         * @returns
         */
        this.unEditableTableBox = (sectionName) => web_1.PageElement.located(web_1.By.id('ctl00_body_gv' + sectionName))
            .describedAs('line item uneditable table box');
        /**
         * 表格单元格
         * @param rowNumber 行号
         * @param fieldName 字段名称
         * @returns
         */
        this.tableCell = (rowNumber, fieldName) => {
            const mappedFieldName = this.entityMap.get(fieldName);
            return web_1.PageElements.located(web_1.By.css(`[data-field="${mappedFieldName}"]`))
                .nth(Number(rowNumber) - 1)
                .describedAs('line item table field: ' + fieldName);
        };
        /**
         * 文本输入框
         * @param rowNumber 行号
         * @param fieldName 字段名称
         * @returns
         */
        this.textInputField = (rowNumber, fieldName) => web_1.PageElement.located(web_1.By.css('input'))
            .of(this.tableCell(rowNumber, fieldName))
            .describedAs('line item text input field: ' + fieldName);
        /**
         * 数字输入框
         * @param rowNumber 行号
         * @param fieldName 字段名称
         * @returns
         */
        this.numberInputField = (rowNumber, fieldName) => web_1.PageElement.located(web_1.By.css(`[data-role="numerictextbox"]`))
            .of(this.tableCell(rowNumber, fieldName))
            .describedAs('line item string input field: ' + fieldName);
        /**
         * 下拉框图标
         * @param rowNumber 行号
         * @param fieldName 字段名称
         * @returns
         */
        this.dropdownIcon = (rowNumber, fieldName) => web_1.PageElement.located(web_1.By.css(`[aria-label="select"]`))
            .of(this.tableCell(rowNumber, fieldName))
            .describedAs('line item dropdown icon');
        /**
         * lookup图标
         * @param rowNumber 行号
         * @param fieldName 字段名称
         * @param nth 第几个按钮, 第一个为0，以此类推
         * @returns
         */
        this.lookupInputFieldOptionIcon = (rowNumber, fieldName, nth) => web_1.PageElements.located(web_1.By.css('#divbuttons button'))
            .nth(nth)
            .describedAs('line item lookup option icon');
        /**
         * 不可编辑的表格部分
         * @returns
         */
        this.lookedTableBox = () => web_1.PageElement.located(web_1.By.css(`[data-name="divButtons"]`))
            .describedAs('line item locked table box');
        /**
         * 按钮组的表格单元格
         * @param rowNumber 行号
         * @returns
         */
        this.buttonGroupCell = (rowNumber) => web_1.PageElements.located(web_1.By.css('.cbtnlist.cbtnlist--nobg'))
            .nth(Number(rowNumber) - 1)
            .describedAs('line item button group cell');
        /**
         * 按钮组的具体按钮
         * @param rowNumber 行号
         * @param buttonName 按钮名称
         * @returns
         */
        this.buttonInButtonGroup = (rowNumber, buttonName) => {
            const mappedButtonName = buttonNameMap.get(buttonName);
            return web_1.PageElement.located(web_1.By.css(`[title="${mappedButtonName}"]`))
                .of(this.buttonGroupCell(rowNumber))
                .describedAs('line item button:' + buttonName + 'in group button');
        };
        /**
         * 表格左侧的勾选框
         * @param rowNumber 行号
         */
        this.checkBox = (rowNumber) => web_1.PageElements.located(web_1.By.css(`[sign="kendoGVCheckBox"]`))
            .nth(Number(rowNumber) - 1)
            .describedAs(`row: ${rowNumber} check box`);
        /**
         * edit line item detail 弹窗Frame
         * @returns
         */
        this.editLineItemDetailPopupFrame = () => web_1.PageElement.located(web_1.By.css('iframe'))
            .of(this.editLineItemDetailPopupPanel())
            .describedAs('edit line item detail popup frame');
        /**
         * edit line item detail页面顶部按钮组
         * @returns
         */
        this.editLineItemDetailPopupButtonBox = () => web_1.PageElement.located(web_1.By.id('ctl00_phCustomButtons_UpdatePanel1'))
            .describedAs('edit line item detail popup button box');
        /**
         * edit line item detail页面顶部具体按钮
         * @param buttonName
         * @returns
         */
        this.editLineItemDetailPopupButton = (buttonName) => web_1.PageElement.located(web_1.By.css(`[value="${buttonName}"]`))
            .of(this.editLineItemDetailPopupButtonBox())
            .describedAs('edit line item detail popup button:' + buttonName);
        /**
         * edit line item popup页面
         * @returns
         */
        this.textareaPopup = (fieldName) => web_1.PageElement.located(web_1.By.css(`[name="${fieldName}"]`)
            .describedAs('Textarea Popup Element'));
        /**
         * edit line item 点击Add按钮跳转到其他实体的Add页面
         * @returns
         */
        this.editLineItemAddPage = () => web_1.PageElement.located(web_1.By.id('ctl00_body_up')
            .describedAs('Edit Line Item Jump To Add Page'));
        this.entityMap = entityMap;
    }
}
exports.LineItemFields = LineItemFields;
const buttonNameMap = new Map();
buttonNameMap.set(DefaultStaticParams_1.INSERT, 'Insert below');
buttonNameMap.set(DefaultStaticParams_1.DELETE, 'Remove');
buttonNameMap.set(DefaultStaticParams_1.DRAG, 'Drag to move');
buttonNameMap.set(DefaultStaticParams_1.POPUP, 'Popup to Edit');
//# sourceMappingURL=LineItemFields.js.map