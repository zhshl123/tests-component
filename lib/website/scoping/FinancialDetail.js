"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.financialDetail = exports.EditFinancialDetail = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const abstract_1 = require("../common/abstract");
const BrowseFundFields_1 = require("../fund/BrowseFundFields");
const ScopingAttributes_1 = require("./ScopingAttributes");
class EditFinancialDetail extends abstract_1.LineItemFields {
    constructor(entityMap) {
        super(entityMap);
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
        this.scopingDetailProjectCostTableFundLookupInputField = (rowNumber) => web_1.PageElement.located(web_1.By.css(`input[columnname="cstm_FundId"]`))
            .of(this.scopingDetailProjectCostTableRow(rowNumber));
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
    }
}
exports.EditFinancialDetail = EditFinancialDetail;
exports.financialDetail = new EditFinancialDetail(ScopingAttributes_1.scopingMap);
//# sourceMappingURL=FinancialDetail.js.map