"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rankingPhaseTab = exports.browseRankingPhase = exports.rankingPhase = exports.EditRankingPhaseFields = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../common/abstract");
const RankingAttributes_1 = require("./RankingAttributes");
class EditRankingPhaseFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        /**
         * 给表单元格填值
         * @param rowNumber 行号，不含表头，第一行为0，以此类推
         * @param fieldName 字段名称
         * @param value 要填的值
         * @returns
         */
        this.fillCriteriaTextField = (rowNumber, fieldName, value) => {
            return core_1.Task.where(`#actor fill ranking criteria row:${rowNumber} text field ${fieldName} with ${value}`, web_1.Click.on(this.criteriaTableCell(rowNumber, fieldName)), web_1.Enter.theValue(value).into(this.criteriaTableTextInputField(rowNumber, fieldName)));
        };
        this.checkCriteriaFieldCell = (rowNumber, fieldName, value) => {
            return core_1.Task.where(`#actor check ranking criteria row:${rowNumber} text field value ${fieldName} with ${value}`, assertions_1.Ensure.eventually(web_1.Text.of(this.criteriaTableCell(rowNumber, fieldName)), (0, assertions_1.equals)(value)));
        };
        /**
         * 给表数字格式单元格填值
         * @param rowNumber 行号，不含表头，第一行为0，以此类推
         * @param fieldName 字段名称
         * @param value 要填的值
         * @returns
         */
        this.fillCriteriaNumberField = (rowNumber, fieldName, value) => {
            return core_1.Task.where(`#actor fill ranking criteria row:${rowNumber} number field ${fieldName} with ${value}`, web_1.Click.on(this.criteriaTableCell(rowNumber, fieldName)), web_1.Enter.theValue(value).into(this.criteriaTableNumberInputField(rowNumber, fieldName)));
        };
        this.criteriaTable = () => web_1.PageElement.located(web_1.By.css('.k-evaluation'))
            .describedAs('criteria table');
        this.criteriaTableBodyRows = () => web_1.PageElements.located(web_1.By.css('.cip-grid-body__rownumber'))
            .describedAs('criteria table body rows');
        /**
         * 表的行
         * @param rowNumber 行号，不含表头，第一行为0，以此类推
         * @param fieldName 字段名称
         * @returns
         */
        this.criteriaTableCell = (rowNumber, fieldName) => {
            const mappedFieldName = this.entityMap.get(fieldName);
            return web_1.PageElements.located(web_1.By.css(`[data-field="${mappedFieldName}"]`))
                .nth(rowNumber)
                .describedAs(`criteria table row:${rowNumber} ${fieldName}`);
        };
        this.criteriaTableCellValue = (rowNumber, fieldName) => {
            return web_1.PageElement.located(web_1.By.css(`span`))
                .of(this.criteriaTableCell(rowNumber, fieldName))
                .describedAs(`criteria table row:${rowNumber} value`);
        };
        this.criteriaTableTextInputField = (rowNumber, fieldName) => {
            return web_1.PageElement.located(web_1.By.css('input'))
                .of(this.criteriaTableCell(rowNumber, fieldName))
                .describedAs(`criteria table row:${rowNumber} ${fieldName} text input field`);
        };
        this.criteriaTableNumberInputField = (rowNumber, fieldName) => {
            return web_1.PageElement.located(web_1.By.css(`[data-role="numerictextbox"]`))
                .of(this.criteriaTableCell(rowNumber, fieldName))
                .describedAs(`criteria table row:${rowNumber} ${fieldName} number input field`);
        };
        this.iconButton = (buttonName) => web_1.PageElement.located(web_1.By.css(`[data-name="img${buttonName}"]`))
            .describedAs(`criteria table icon button:${buttonName}`);
        this.arrowIconRow = (rowNumber, fieldName) => web_1.PageElement.located(web_1.By.css('.cip-arrow.cip-arrow-expand'))
            .of(this.criteriaTableCell(rowNumber, fieldName))
            .describedAs(`row:${rowNumber} criteria table arrow row`);
        /********************** View Summary tab************************** */
        /**
         * 校验表体的单元格的值
         * @param rowNumber 表体第一行为0，以此类推
         * @param colNumber 表体第一列为0，以此类推
         * @returns
         */
        this.checkProjectRankingResultCell = (rowNumber, colNumber, value) => {
            return core_1.Task.where(`#actor check Project Ranking Result row:${rowNumber}, column:${colNumber} cell value with ${value}`, assertions_1.Ensure.eventually(web_1.Text.of(this.projectRankingResultTableCell(rowNumber, colNumber)), (0, assertions_1.equals)(value)));
        };
        /**
         * 校验表体的max score行单元格的值
         * @param rowNumber 含表头，第一行为0，以此类推
         * @param colNumber 表体第一列为0，以此类推
         * @returns
         */
        this.checkCriteriaScoreDetailMaxScoreCellValue = (rowNumber, colNumber, value) => {
            return value === '' ? core_1.Task.where(`#actor check Criteria Score Detail Max Score row:${rowNumber}, column:${colNumber} cell value with ${value}`, core_1.Log.the('check value is empty, ship this task')) : core_1.Task.where(`#actor check Criteria Score Detail Max Score row:${rowNumber}, column:${colNumber} cell value with ${value}`, assertions_1.Ensure.eventually(web_1.Text.of(this.criteriaScoreDetailTableMaxScoreRowCell(rowNumber, colNumber)), (0, assertions_1.equals)(value)));
        };
        /**
         * 校验表体的project行的单元格的值
         * @param rowNumber 含表头，第一行为0，以此类推
         * @param colNumber 表体第一列为0，以此类推
         * @returns
         */
        this.checkCriteriaScoreDetailProjectCellValue = (rowNumber, colNumber, value) => {
            return value === '' ? core_1.Task.where(`#actor check Criteria Score Detail project row:${rowNumber}, column:${colNumber} cell value with ${value}`, core_1.Log.the('check value is empty, ship this task')) : core_1.Task.where(`#actor check Criteria Score Detail project row:${rowNumber}, column:${colNumber} cell value with ${value}`, assertions_1.Ensure.eventually(web_1.Text.of(this.criteriaScoreDetailTableProjectRowCell(rowNumber, colNumber)), (0, assertions_1.equals)(value)));
        };
        this.projectRankingResultTable = () => web_1.PageElement.located(web_1.By.id('ctl00_body_gvAmountRank'))
            .describedAs('project ranking results table');
        /**
         * project ranking results 表体的行
         * @param rowNumber 含表头，表体第一行为0，以此类推
         * @returns
         */
        this.projectRankingResultTableBodyRow = (rowNumber) => web_1.PageElements.located(web_1.By.css('tr')).nth(rowNumber)
            .of(this.projectRankingResultTable())
            .describedAs('project ranking results table row:' + rowNumber);
        /**
         * 表体的单元格
         * @param rowNumber 含表头，表体第一行为0，以此类推
         * @param colNumber 表体第一列为0，以此类推
         * @returns
         */
        this.projectRankingResultTableCell = (rowNumber, colNumber) => web_1.PageElements.located(web_1.By.css('td')).nth(colNumber)
            .of(this.projectRankingResultTableBodyRow(rowNumber))
            .describedAs(`project ranking results row:${rowNumber}, column:${colNumber} table cell`);
        this.criteriaScoreDetailTable = () => web_1.PageElement.located(web_1.By.id('ctl00_body_gvCriteriaRank'))
            .describedAs('Criteria Score Details table');
        /**
         * project ranking results 表体的行
         * @param rowNumber 含表头，第一行为0，以此类推
         * @returns
         */
        this.criteriaScoreDetailTableBodyRow = (rowNumber) => web_1.PageElements.located(web_1.By.css('tr')).nth(rowNumber)
            .of(this.criteriaScoreDetailTable())
            .describedAs('Criteria Score Details table row:' + rowNumber);
        /**
         * 表体的max score行的单元格
         * @param rowNumber 含表头，第一行为0，以此类推
         * @param colNumber 第一列为0，以此类推
         * @returns
         */
        this.criteriaScoreDetailTableMaxScoreRowCell = (rowNumber, colNumber) => web_1.PageElements.located(web_1.By.css('td b')).nth(colNumber)
            .of(this.criteriaScoreDetailTableBodyRow(rowNumber))
            .describedAs(`Criteria Score Details table Max Score row:${rowNumber}, column:${colNumber} table cell`);
        /**
         * 表体的project的单元格
         * @param rowNumber 含表头，第一行为0，以此类推
         * @param colNumber 第一列为0，以此类推
         * @returns
         */
        this.criteriaScoreDetailTableProjectRowCell = (rowNumber, colNumber) => web_1.PageElements.located(web_1.By.css('td')).nth(colNumber)
            .of(this.criteriaScoreDetailTableBodyRow(rowNumber))
            .describedAs(`Criteria Score Details table project row:${rowNumber}, column:${colNumber} table cell`);
        this.lastCriteriaScoreDetailTableProjectRowCell = (rowNumber) => web_1.PageElements.located(web_1.By.css('td')).last()
            .of(this.criteriaScoreDetailTableBodyRow(rowNumber))
            .describedAs(`Criteria Score Details table Project row:${rowNumber}, last column table cell`);
    }
}
exports.EditRankingPhaseFields = EditRankingPhaseFields;
exports.rankingPhase = new EditRankingPhaseFields(RankingAttributes_1.rankingMap);
exports.browseRankingPhase = new abstract_1.SearchFromFields(RankingAttributes_1.rankingMap);
exports.rankingPhaseTab = new abstract_1.PageTabs(new Map());
//# sourceMappingURL=EditRankingPhaseFields.js.map