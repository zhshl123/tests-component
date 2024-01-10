"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectAllocation = exports.ProjectAllocationFields = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../common/abstract");
const ProjectTab_1 = require("../project/components/ProjectTab");
class ProjectAllocationFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        /**
         * 给fund allocation表格填值
         * @param rowNumber 行号，第一行为0， 以此类推
         * @param colNumber 列序号， 不含首列，第一列为0， 以此类推
         * @param value 要填的值
         * @returns
         */
        this.fillFundAllocationTableCellValue = (rowNumber, colNumber, value) => {
            return core_1.Task.where(`#actor fill fund allotion table cell value with ${value}`, web_1.Click.on(this.fundAllocationDetailTableCell(rowNumber, colNumber)), web_1.Enter.theValue(value).into(this.fundAllocationDetailTableCell(rowNumber, colNumber)));
        };
        /**
         * 检查Fund Ending Balance 表格中的数据
         * @param colNumber 列序号 第一列为0， 以此类推
         * @param value 要检查的值
         * @returns
         */
        this.checkFundEndingBalanceCellValue = (colNumber, value) => {
            return core_1.Task.where(`#actor check Fund Ending Balance table cell value with ${value}`, assertions_1.Ensure.eventually(web_1.Attribute.called('initialvalue').of(this.fundEndingBalanceTableCell(colNumber)), (0, assertions_1.equals)(value)));
        };
        /**
         * 检查Fund Ending Balance 表格中的数据的颜色
         * @param colNumber 列序号 第一列为0， 以此类推
         * @param value 要检查的值
         * @returns
         */
        this.checkFundEndingBalanceCellColor = (colNumber, value) => {
            return value === 'white' ? core_1.Task.where(`#actor check Fund Ending Balance table cell color with ${value}`) : core_1.Task.where(`#actor check Fund Ending Balance table cell color with ${value}`);
        };
        /**
         * 检查Fund allocation 表格中的数据
         * @param rowNumber 行号，第一行为0，以此类推
         * @param colNumber 列序号 不含首列，第一列为0， 以此类推
         * @param value 要检查的值
         * @returns
         */
        this.checkFundAllocationDetailTableCellValue = (rowNumber, colNumber, value) => {
            return core_1.Task.where(`#actor check fund allocation detail table cell value with ${value}`, assertions_1.Ensure.eventually(web_1.Attribute.called('initialvalue').of(this.fundAllocationDetailTableCell(rowNumber, colNumber)), (0, assertions_1.equals)(value)));
        };
        /**
         * 检查Fund allocation 表格中的数据的颜色
         * @param rowNumber 行号，第一行为0，以此类推
         * @param colNumber 列序号 不含首列，第一列为0， 以此类推
         * @param value 要检查的值
         * @returns
         */
        this.checkFundAllocationDetailTableCellColor = (rowNumber, colNumber, value) => {
            return value === 'white' ? core_1.Task.where(`#actor check fund allocation detail table cell color with ${value}`) : core_1.Task.where(`#actor check fund allocation detail table cell color with ${value}`);
        };
        /**
         * 鼠标悬停在fund上面
         * @returns
         */
        this.hoverOverFund = () => {
            return core_1.Task.where(`#actor hover over fund`, core_1.Check.whether(this.fundAllocationDetailTable(), (0, assertions_1.not)((0, web_1.isVisible)())).andIfSo(ProjectTab_1.projectTab.clickTab('Allocation'), core_1.Wait.for(core_1.Duration.ofSeconds(3))), assertions_1.Ensure.eventually(this.fundAllocationDetailTable(), (0, web_1.isVisible)()), web_1.Switch.to(this.fundAllocationDetailTable()), web_1.Hover.over(this.fundAllocationRDetailTableRowHeadColumn(1)));
        };
        /**********************鼠标悬停fund后出来的数据表********************* */
        this.fundEndingBalancePanel = () => web_1.PageElement.located(web_1.By.id('ctl00_body_PNFunds'))
            .describedAs('Fund Ending Balance panel');
        this.fundEndingBalanceTableBodyRow = () => web_1.PageElement.located(web_1.By.css('.cstdgrid__bodyrow'))
            .of(this.fundEndingBalancePanel())
            .describedAs('Fund Ending Balance table body row');
        /**
         * Fund Ending Balance的单元格
         * @param colNumber 列序号，不含首列，第一列为0 ，以此类推
         * @returns
         */
        this.fundEndingBalanceTableCell = (colNumber) => web_1.PageElements.located(web_1.By.css('td input')).nth(colNumber)
            .of(this.fundEndingBalanceTableBodyRow())
            .describedAs(`column ${colNumber} Fund Ending Balance table cell`);
        /****************** fund Allocation Detail ***************** */
        this.fundAllocationDetailTable = () => web_1.PageElement.located(web_1.By.id('tblProjectFundingTital'))
            .describedAs('fund allocation detail table');
        /**
         * fund alloaction数据表的行
         * @param rowNumber 行号，第一行为0， 以此类推
         * @returns
         */
        this.fundAllocationRDetailTableRow = (rowNumber) => web_1.PageElements.located(web_1.By.css('.cstdgrid__bodyrow'))
            .nth(rowNumber)
            .describedAs('fund allocation detail table row ' + rowNumber);
        /**
         * fund alloaction数据表的行首列
         * @param rowNumber 行号，第一行为0， 以此类推
         * @returns
         */
        this.fundAllocationRDetailTableRowHeadColumn = (rowNumber) => web_1.PageElements.located(web_1.By.css('td span'))
            .first()
            .of(this.fundAllocationRDetailTableRow(rowNumber))
            .describedAs('fund allocation detail table row ' + rowNumber);
        /**
         * fund alloaction数据表的单元格
         * @param rowNumber 行号，第一行为0， 以此类推
         * @param colNumber 列序号， 不含首列，第一列为0， 以此类推
         * @returns
         */
        this.fundAllocationDetailTableCell = (rowNumber, colNumber) => web_1.PageElements.located(web_1.By.css('input'))
            .nth(colNumber)
            .of(this.fundAllocationRDetailTableRow(rowNumber))
            .describedAs(`fund allocation detail table cell row:${rowNumber}, column:${colNumber}`);
    }
}
exports.ProjectAllocationFields = ProjectAllocationFields;
exports.projectAllocation = new ProjectAllocationFields(new Map());
//# sourceMappingURL=ProjectAllocationFields.js.map