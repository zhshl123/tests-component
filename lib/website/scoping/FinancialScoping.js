"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.financial = exports.EditFinancialTab = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../common/abstract");
const ScopingAttributes_1 = require("./ScopingAttributes");
class EditFinancialTab extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        /********************************** scoping Summary table **************************************** */
        /**
         * 给scoping数据表填值
         * @param rowNumber 行号，包含表头， 第一行为0，以此类推
         * @param colNumber 列序号，不含首列， 第一列为0， 以此类推
         * @param value 要填的值
         * @returns
         */
        this.fillScopingSummaryTableCell = (rowNumber, colNumber, value) => {
            return core_1.Task.where(`#actor fill scoping allocation table cell row:${rowNumber}, column:${colNumber} with value ${value}`, web_1.Click.on(this.scopingSummaryTableCell(rowNumber, colNumber)), web_1.Enter.theValue(value).into(this.scopingSummaryTableCell(rowNumber, colNumber)));
        };
        this.checkScopingSummaryTableCellValue = (rowNumber, colNumber, value) => {
            return core_1.Task.where(`#actor check scoping allocation table cell row:${rowNumber}, column:${colNumber} with value ${value}`, assertions_1.Ensure.eventually(web_1.Attribute.called('initialvalue').of(this.scopingSummaryTableCell(rowNumber, colNumber)), (0, assertions_1.equals)(value)));
        };
        this.checkScopingSummaryTableCellIsReadOnly = (rowNumber, colNumber) => {
            return core_1.Task.where(`#actor check scoping allocation table cell row:${rowNumber}, column:${colNumber} is read only`, assertions_1.Ensure.eventually(web_1.Attribute.called('disabled').of(this.scopingSummaryTableCell(rowNumber, colNumber)), (0, assertions_1.equals)('disabled')));
        };
        /**
         * 选择scoping status选项
         * @param itemName 选项的值
         * @returns
         */
        this.selectScopingStatus = (itemName) => {
            return core_1.Task.where(`#actor select scoping status with value ${itemName}`, web_1.Click.on(this.scopingStatusDropdownInputField()), assertions_1.Ensure.eventually(this.scopingStatusDropdownBox(), (0, web_1.isVisible)()), web_1.Click.on(this.scopingStatusDropdownItem(itemName)));
        };
        /**
         * 检查scoping status选项
         * @param itemName 选项的值
         * @returns
         */
        this.checkScopingStatus = (itemName) => {
            return core_1.Task.where(`#actor check scoping status with value ${itemName}`, assertions_1.Ensure.eventually(web_1.Attribute.called('initialvalue').of(this.scopingStatusDropdownInputField()), (0, assertions_1.equals)(itemName)));
        };
        /**
         * scoping 数据表的行
         * @param rowNumber 行号，包含表头， 第一行为0，以此类推
         * @returns
         */
        this.scopingSummaryTableRow = (rowNumber) => web_1.PageElements.located(web_1.By.css('#ctl00_body_financialEvaluation_dgFinancial tr'))
            .nth(rowNumber)
            .describedAs('scoping allocation table row:' + rowNumber);
        /**
         * scoping 数据表的单元格
         * @param rowNumber 行号，包含表头， 第一行为0，以此类推
         * @param colNumber 列序号，不含首列， 第一列为0， 以此类推
         * @returns
         */
        this.scopingSummaryTableCell = (rowNumber, colNumber) => web_1.PageElements.located(web_1.By.css('input'))
            .nth(colNumber)
            .of(this.scopingSummaryTableRow(rowNumber));
        this.scopingStatusDropdownInputField = () => web_1.PageElement.located(web_1.By.css(`[aria-owns="ctl00_body_financialEvaluation_ddlStatus_listbox"]`));
        this.scopingStatusDropdownBox = () => web_1.PageElement.located(web_1.By.id('ctl00_body_financialEvaluation_ddlStatus-list'));
        this.scopingStatusDropdownItem = (itemName) => web_1.PageElement.located(web_1.By.css(`[title="${itemName}"]`))
            .of(this.scopingStatusDropdownBox());
        this.scopingTypeDropdownInputfield = () => web_1.PageElement.located(web_1.By.css(`[aria-owns="ctl00_body_financialEvaluation_dgScopingPage_listbox"]`))
            .describedAs('scoping type dropdown input field');
        this.scopingTypeDropdownBox = () => web_1.PageElement.located(web_1.By.id('ctl00_body_financialEvaluation_dgScopingPage-list'));
        this.scopingTypeDropdownItem = (itemName) => web_1.PageElement.located(web_1.By.css(`[title="${itemName}"]`))
            .of(this.scopingTypeDropdownBox());
        /**
         * scoping 的类型
         * @param value 要选的值
         * @returns
         */
        this.selectScopingType = (value) => {
            return core_1.Task.where(`#actor select scoping type with value ${value}`, web_1.Click.on(this.scopingTypeDropdownInputfield()), assertions_1.Ensure.eventually(this.scopingTypeDropdownBox(), (0, web_1.isVisible)()), web_1.Click.on(this.scopingTypeDropdownItem(value)));
        };
    }
}
exports.EditFinancialTab = EditFinancialTab;
exports.financial = new EditFinancialTab(ScopingAttributes_1.scopingMap);
//# sourceMappingURL=FinancialScoping.js.map