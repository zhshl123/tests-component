"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectProjectForFund = exports.SelectProjectsForFundFields = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../common/abstract");
const FundAttributes_1 = require("./FundAttributes");
class SelectProjectsForFundFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.searchProject = (projectName) => {
            return core_1.Task.where(`#actor search project with ${projectName}`, web_1.Enter.theValue(projectName).into(this.searchProjectInputfield()), web_1.Click.on(this.searchProjectIcon()), core_1.Wait.for(core_1.Duration.ofSeconds(3)));
        };
        this.addProjectToSelectedList = (projectName) => {
            return core_1.Task.where(`#actor add project ${projectName} to selected list`, core_1.Check.whether(this.selectedProjectList(projectName).first(), (0, web_1.isVisible)()).andIfSo(core_1.Log.the(`${projectName} already in selected list`)).otherwise(web_1.Click.on(this.unselectedProjectList(projectName).first()), web_1.Click.on(this.addProjectIcon()), core_1.Wait.for(core_1.Duration.ofSeconds(3))));
        };
        this.searchProjectInputfield = () => web_1.PageElement.located(web_1.By.id('ctl00_body_txtSearchUnSelectedProjects'))
            .describedAs('search project input field');
        this.searchProjectIcon = () => web_1.PageElement.located(web_1.By.id('ctl00_body_btnSearchUnSelectedProject'))
            .describedAs('search project icon');
        this.unselectedProjectList = (projectName) => web_1.PageElements.located(web_1.By.cssContainingText('#ctl00_body_sltUnSelectedProjects option', projectName))
            .describedAs(`${projectName} unselected project list`);
        this.selectedProjectList = (projectName) => web_1.PageElements.located(web_1.By.cssContainingText('#ctl00_body_sltSelectedProjects option', projectName))
            .describedAs(`${projectName} selected project list`);
        this.addProjectIcon = () => web_1.PageElement.located(web_1.By.id('ctl00_body_imgbtnAdd'))
            .describedAs('add project icon');
        /**
         * 检查project fund数据表单元格的值
         * @param rowNumber 表体第一行为0， 以此类推
         * @param colNumber 不含首列， 第一列为0，以此类推
         * @param value 预期值
         * @returns
         */
        this.checkProjectFundAllocationTableCellValue = (rowNumber, colNumber, value) => {
            return core_1.Task.where(`#actor check project allocation fund table cell row:${rowNumber} clolumn:${colNumber} with ${value}`, assertions_1.Ensure.eventually(web_1.Attribute.called('value').of(this.projectFundAllocationTableCell(rowNumber, colNumber)), (0, assertions_1.equals)(value)));
        };
        this.projectFundAllocationTable = () => web_1.PageElement.located(web_1.By.id('SelectProjectForFund'))
            .describedAs('project fund allocation table');
        /**
         * project fund数据表的行
         * @param rowNumber 表体第一行为0， 以此类推
         * @returns
         */
        this.projectFundAllocationTableRow = (rowNumber) => web_1.PageElements.located(web_1.By.css('.cstdgrid__bodyrow')).nth(rowNumber)
            .of(this.projectFundAllocationTable())
            .describedAs(`project fund allocation table row: ${rowNumber}`);
        /**
         * project fund数据表的行
         * @param rowNumber 表体第一行为0， 以此类推
         * @param colNumber 不含首列， 第一列为0，以此类推
         * @returns
         */
        this.projectFundAllocationTableCell = (rowNumber, colNumber) => web_1.PageElements.located(web_1.By.css('input')).nth(colNumber)
            .of(this.projectFundAllocationTableRow(rowNumber))
            .describedAs(`project fund allocation table cell row: ${rowNumber} column: ${colNumber}`);
    }
}
exports.SelectProjectsForFundFields = SelectProjectsForFundFields;
exports.selectProjectForFund = new SelectProjectsForFundFields(FundAttributes_1.fundAttributesMap);
//# sourceMappingURL=SelectProjectsForFundFields.js.map