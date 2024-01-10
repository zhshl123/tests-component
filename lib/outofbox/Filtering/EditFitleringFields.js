"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseFiltering = exports.filteringPhase = exports.EditFilteringFields = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../common/abstract");
const FilteringAttributes_1 = require("./FilteringAttributes");
class EditFilteringFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.dropdownListBox = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_ddlPicklist_listbox'))
            .describedAs('dropdown list box: ' + fieldName);
        this.NewScopingAreaEditIcon = () => web_1.PageElements.located(web_1.By.css(`[title="Edit"]`)).last()
            .describedAs('Edit Icon of Ranking');
        this.clickNewEditIcon = () => {
            return core_1.Task.where(`#actor click New Edit Icon`, web_1.Click.on(this.NewScopingAreaEditIcon()));
        };
        this.projectPopup = () => web_1.PageElement.located(web_1.By.id('ctl00_body_ucFilteringRanking_ifmPopup'))
            .describedAs('project popup');
        this.selectAllCheckboxInGrid = () => web_1.PageElement.located(web_1.By.css('#grid #check-all'))
            .describedAs('select all cehckbox in grid');
        this.projectRankingNote = () => web_1.PageElement.located(web_1.By.cssContainingText('#ctl00_body_lblRankingNote b', 'Notes:'))
            .describedAs('project ranking notes');
        /************************ filtering result ***************************** */
        this.filterResultTable = () => web_1.PageElement.located(web_1.By.id('ctl00_body_gvFilteringPhases'))
            .describedAs('filter result table');
        /**
         * filtering result表的行
         * @param rowNumber 含表头，第一行为0， 以此类推
         * @returns
         */
        this.filterResultTableRow = (rowNumber) => web_1.PageElements.located(web_1.By.css('tr'))
            .nth(rowNumber)
            .of(this.filterResultTable())
            .describedAs(`filter result table row:${rowNumber}`);
        /**
         * filtering result表的单元格
         * @param rowNumber 含表头，第一行为0， 以此类推
         * @param colNumber 第一列为0， 以此类推
         * @returns
         */
        this.filterResultTableCell = (rowNumber, colNumber) => web_1.PageElements.located(web_1.By.css('td'))
            .nth(colNumber)
            .of(this.filterResultTableRow(rowNumber))
            .describedAs(`filter result table row:${rowNumber}, column:${colNumber} cell`);
        this.viewSnapshotIcon = (rowNumber, colNumber) => web_1.PageElement.located(web_1.By.css('img'))
            .of(this.filterResultTableCell(rowNumber, colNumber))
            .describedAs(`filter result table row:${rowNumber}, column:${colNumber} cell snapshot icon`);
        /**
         * 加成filtering result表的单元格的值
         * @param rowNumber 含表头，第一行为0， 以此类推
         * @param colNumber 第一列为0， 以此类推
         * @param value 期望值
         * @returns
         */
        this.checkFilteringResultTableCellValue = (rowNumber, colNumber, value) => {
            return core_1.Task.where(`#actor check filter result table row:${rowNumber}, column:${colNumber} cell value ${value}`, assertions_1.Ensure.eventually(web_1.Text.of(this.filterResultTableCell(rowNumber, colNumber)), (0, assertions_1.equals)(value)));
        };
        /********************************* snapshot ********************************* */
        this.snapshotTable = () => web_1.PageElement.located(web_1.By.id('ctl00_body_ctl07_table_0'))
            .describedAs('snapshot table');
        /**
         * snapshot 表的单元格
         * @param rowNumber 含表头，第一行为0， 以此类推
         * @returns
         */
        this.snapshotTableRow = (rowNumber) => web_1.PageElements.located(web_1.By.css('tr'))
            .nth(rowNumber)
            .of(this.snapshotTable())
            .describedAs(`snapshot table row:${rowNumber}`);
        /**
         * snapshot 表的单元格
         * @param rowNumber 含表头，第一行为0， 以此类推
         * @param colNumber 第一列为0， 以此类推
         * @returns
         */
        this.snapshotTableCell = (rowNumber, colNumber) => web_1.PageElements.located(web_1.By.css('td'))
            .nth(colNumber)
            .of(this.snapshotTableRow(rowNumber))
            .describedAs(`snapshot table row:${rowNumber}, column:${colNumber} cell`);
        /**
         * 检查snapshot 表的单元格的值
         * @param rowNumber 含表头，第一行为0， 以此类推
         * @param colNumber 第一列为0， 以此类推
         * @param value 期望值
         * @returns
         */
        this.checkFilteringSnapshotTableCellValue = (rowNumber, colNumber, value) => {
            return core_1.Task.where(`#actor check filter snapshot table row:${rowNumber}, column:${colNumber} cell value ${value}`, assertions_1.Ensure.eventually(web_1.Text.of(this.snapshotTableCell(rowNumber, colNumber)), (0, assertions_1.equals)(value)));
        };
    }
}
exports.EditFilteringFields = EditFilteringFields;
exports.filteringPhase = new EditFilteringFields(FilteringAttributes_1.FilteringMap);
exports.browseFiltering = new abstract_1.SearchFromFields(FilteringAttributes_1.FilteringMap);
//# sourceMappingURL=EditFitleringFields.js.map