"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scopingFinancial = exports.ScopingFinancialTabFields = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const abstract_1 = require("../common/abstract");
const BrowseFundFields_1 = require("../fund/BrowseFundFields");
const ScopingAttributes_1 = require("./ScopingAttributes");
class ScopingFinancialTabFields extends abstract_1.EditFromFields {
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
        /*********************************** Scoping Detail table************************************ */
        /**
         * scoping Detail Project Cost数据表填值
         * @param rowNumber 第一行为0，以此类推
         * @param colNumber 第一列为0，以此类推
         * @param value 要填的值
         * @returns
         */
        this.fillScopingDetailProjectCostTableCurrencyCell = (rowNumber, colNumber, value) => {
            return core_1.Task.where(`#actor fill scoping detail project cost table cell row:${rowNumber}, column:${colNumber} with value ${value}`, web_1.Click.on(this.scopingDetailProjectCostTableCurrencyCell(rowNumber, colNumber)), web_1.Enter.theValue(value).into(this.scopingDetailProjectCostTableCurrencyCell(rowNumber, colNumber)));
        };
        this.checkScopingDetailProjectCostTableCurrencyCellValue = (rowNumber, colNumber, value) => {
            return core_1.Task.where(`#actor check scoping allocation table cell row:${rowNumber}, column:${colNumber} with value ${value}`, assertions_1.Ensure.eventually(web_1.Attribute.called('initialvalue').of(this.scopingDetailProjectCostTableCurrencyCell(rowNumber, colNumber)), (0, assertions_1.equals)(value)));
        };
        this.checkScopingDetailProjectCostTableFootCurrencyCellValue = (colNumber, value) => {
            return core_1.Task.where(`#actor check scoping allocation table foot cell column:${colNumber} with value ${value}`, assertions_1.Ensure.eventually(web_1.Attribute.called('initialvalue').of(this.scopingDetailProjectCostTableFootCurrencyCell(colNumber)), (0, assertions_1.equals)(value)));
        };
        this.fillPhaseDropdownInputField = (rowNumber, colNumber, value) => {
            return core_1.Task.where(`#actor fill dropdown input row: ${rowNumber}, column:${colNumber} with ${value}`, web_1.Click.on(this.scopingDetailProjectCostTableAttributeCell(rowNumber, colNumber)), web_1.Enter.theValue(value).into(this.scopingDetailProjectCostTableAttributeCell(rowNumber, colNumber)), web_1.Click.on(this.scopingDetailProjectCostTableHeadRow()));
        };
        /**
         * 在scoping Detail Project Cost数据表的fund弹窗中搜索目标fund
         * @param rowNumber 第一行为0，以此类推
         * @param value 要填的值
         * @returns
         */
        this.searchScopingDetailProjectCostTableFundInPopup = (rowNumber, value) => {
            return core_1.Task.where(`#actor search fund:${value} in scoping detail project cost table fund row:${rowNumber} lookup popup`, web_1.Click.on(this.scopingDetailProjectCostTableFundLookupIcon(rowNumber)), assertions_1.Ensure.eventually(this.scopingDetailProjectCostTableFundLookupPopup(), (0, assertions_1.isPresent)()), core_1.Wait.for(core_1.Duration.ofSeconds(5)), web_1.Switch.to(this.scopingDetailProjectCostTableFundLookupPopup()).and(BrowseFundFields_1.browseFund.fillTextInputField('Fund Name', value), common_1.clickButton.using(DefaultStaticParams_1.SEARCH), core_1.Wait.for(core_1.Duration.ofSeconds(3)), BrowseFundFields_1.browseFund.checkSearchResult(value, DefaultStaticParams_1.SUCCEEDED), web_1.Click.on(web_1.PageElements.located(web_1.By.css(`td [type="radio"]`)).first()), common_1.clickButton.using(DefaultStaticParams_1.OK)));
        };
        this.SyncButton = () => web_1.PageElement.located(web_1.By.id('ctl00_body_fakePopupExtender_btnSync'))
            .describedAs('scoping page Sync button');
        this.scopingDetailProjectCostTable = () => web_1.PageElement.located(web_1.By.css('.cdatagrid.cdatagrid--auto'))
            .describedAs('scoping detail project cost table');
        /**
         * scoping Detail Project Cost表的表头所在行
         * @returns
         */
        this.scopingDetailProjectCostTableHeadRow = () => web_1.PageElement.located(web_1.By.css('thead'))
            .of(this.scopingDetailProjectCostTable())
            .describedAs(`scoping detail project cost table head row`);
        /**
         * scoping Detail Project Cost表的表体的行
         * @param rowNumber 第一行为0，以此类推
         * @returns
         */
        this.scopingDetailProjectCostTableRow = (rowNumber) => web_1.PageElements.located(web_1.By.css('tbody tr')).nth(rowNumber)
            .of(this.scopingDetailProjectCostTable())
            .describedAs(`scoping detail project cost table row:${rowNumber}`);
        /**
         * scoping Detail Project Cost表的表体的行
         * @param rowNumber 第一行为0，以此类推
         * @param colNumber 列序号，第一列为0，以此类推
         * @returns
         */
        this.scopingDetailProjectCostTableAttributeCell = (rowNumber, colNumber) => web_1.PageElements.located(web_1.By.css(`td[cellname="AttributeCell"] input`)).nth(colNumber)
            .of(this.scopingDetailProjectCostTableRow(rowNumber))
            .describedAs(`scoping detail project cost table row:${rowNumber}`);
        /**
         * scoping Detail Project Cost表的表体的填金额的列
         * @param rowNumber 第一行为0，以此类推
         * @param colNumber 第一列为0，以此类推
         * @returns
         */
        this.scopingDetailProjectCostTableCurrencyCell = (rowNumber, colNumber) => web_1.PageElements.located(web_1.By.css('td.currency input')).nth(colNumber)
            .of(this.scopingDetailProjectCostTableRow(rowNumber))
            .describedAs(`scoping detail project cost table row:${rowNumber}, column:${colNumber} cell`);
        this.scopingDetailProjectCostTableFootCurrencyCell = (colNumber) => web_1.PageElements.located(web_1.By.css('tfoot td.currency input')).nth(colNumber)
            .of(this.scopingDetailProjectCostTable())
            .describedAs(`scoping detail project cost table foot column:${colNumber} cell`);
        this.scopingDetailProjectCostTableFundLookupIcon = (rowNumber) => web_1.PageElement.located(web_1.By.css(`[popupdivid="divPopup_cstm_FundId"]`))
            .of(this.scopingDetailProjectCostTableRow(rowNumber))
            .describedAs(`scoping detail project cost table row:${rowNumber} fund lookup icon`);
        this.scopingDetailProjectCostTableFundLookupPopup = () => web_1.PageElement.located(web_1.By.css('#divPopup_cstm_FundId iframe'));
        this.syncButton = () => web_1.PageElement.located(web_1.By.css('#cipActionBarWrapper #ctl00_body_fakePopupExtender_btnSync'))
            .describedAs('scoping page Sync button');
        this.scopingDetailTab = (tabName) => web_1.PageElement.located(web_1.By.cssContainingText('#ctl00_body_financialEvaluation_tbWorkSheet li a', tabName))
            .describedAs('scoping detail tab:' + tabName);
        this.scopingDetailProjectCostTableOptionCell = (rowNumber) => web_1.PageElement.located(web_1.By.css(`[data-column-type="command"]`))
            .of(this.scopingDetailProjectCostTableRow(rowNumber))
            .describedAs('scoping detail Project cost table option cell');
        this.scopingDetailProjectCostTableOptionButton = (rowNumber, buttonName) => web_1.PageElement.located(web_1.By.css(`a[title="${buttonName}"]`))
            .of(this.scopingDetailProjectCostTableOptionCell(rowNumber))
            .describedAs('scoping detail Project Cost table option button:' + buttonName);
        this.scopingDetailProjectCostTableAdjustButton = (rowNumber) => web_1.PageElements.located(web_1.By.css('a')).nth(4)
            .of(this.scopingDetailProjectCostTableOptionCell(rowNumber))
            .describedAs('scoping detail Project Cost table adjust button');
        this.scopingDetailTableTopButton = (buttonName) => {
            buttonName = buttonName.replace(' ', '');
            return web_1.PageElement.located(web_1.By.css(`[name="ctl00$body$financialEvaluation$btn${buttonName}"]`))
                .describedAs('scoping detail table button');
        };
        /************************* Promote Scoping Data As Budget ********************** */
        this.scopingBudgetDate = (fieldName) => {
            const mappedFieldName = ScopingAttributes_1.scopingMap.get(fieldName);
            return web_1.PageElement.located(web_1.By.id('ctl00_body_divApproveDate_' + mappedFieldName));
        };
        this.fillScopingBudgetDate = (fieldName, value) => {
            const dateArray = value.split('');
            return core_1.Task.where(`#actor fill scoping budget date ${fieldName} with ${value}`, web_1.Click.on(this.scopingBudgetDate(fieldName)), web_1.Press.the(dateArray[0], dateArray[1], web_1.Key.ArrowRight, dateArray[3], dateArray[4], web_1.Key.ArrowRight, dateArray[6], dateArray[7], dateArray[8], dateArray[9])
                .in(this.scopingBudgetDate(fieldName)));
        };
        this.checkScopingBudgetDateValue = (fieldName, value) => {
            return core_1.Task.where(`#actor check scoping budget date ${fieldName} with ${value}`, assertions_1.Ensure.eventually(web_1.Attribute.called('value').of(this.scopingBudgetDate(fieldName)), (0, assertions_1.equals)(value)));
        };
    }
}
exports.ScopingFinancialTabFields = ScopingFinancialTabFields;
exports.scopingFinancial = new ScopingFinancialTabFields(ScopingAttributes_1.scopingMap);
//# sourceMappingURL=ScopingFinancialTabFields.js.map