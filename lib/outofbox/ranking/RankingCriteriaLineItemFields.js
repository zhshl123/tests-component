"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rankingCriteriaLineItem = exports.RankingCriteriaLineItemFields = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../common/abstract");
const RankingAttributes_1 = require("./RankingAttributes");
class RankingCriteriaLineItemFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        /**
         * 给表单元格填值
         * @param rowNumber 表体，第一行为0，以此类推
         * @param colNumber 表体，第一列为0， 以此类推
         * @param value 要填的值
         * @returns
         */
        this.fillTableCell = (rowNumber, colNumber, value) => {
            return core_1.Task.where(`#actor fill ranking criteria line item row:${rowNumber}, column:${colNumber} field with ${value}`, web_1.Enter.theValue(value).into(this.tableBodyRowCell(rowNumber, colNumber)));
        };
        this.popupWindow = () => web_1.PageElement.located(web_1.By.id('ifrmEvaluate'))
            .describedAs('criteria line item popup window');
        this.table = () => web_1.PageElement.located(web_1.By.id('tblItemList'))
            .describedAs('criteria line item table');
        this.tableBodyrows = () => web_1.PageElements.located(web_1.By.css('.cstdgrid__bodyrow'))
            .describedAs('criteria line item table rows');
        /**
         * 表体的单元格
         * @param rowNumber 表体，第一行为0，以此类推
         * @param colNumber 表体操作按钮坐在列，第一列为0， 以此类推
         * @returns
         */
        this.tableBodyRowCell = (rowNumber, colNumber) => web_1.PageElements.located(web_1.By.css(`td input[type="text"]`))
            .nth(colNumber)
            .of(this.tableBodyrows().nth(rowNumber))
            .describedAs(`criteria line item table row:${rowNumber}, column: ${colNumber}`);
        // 首行的删除按钮
        this.deleteIcon = () => web_1.PageElement.located(web_1.By.css(`td [title="Remove"]`))
            .of(this.tableBodyrows().first())
            .describedAs('deleteIcon');
        this.addBelowIcon = () => web_1.PageElement.located(web_1.By.css(`[title="Add Below"]`))
            .describedAs('criteria line item table add below icon');
        this.OKButton = () => web_1.PageElement.located(web_1.By.id('btnOK'));
        this.cancelButton = () => web_1.PageElement.located(web_1.By.css(`[name="ctl02"]`));
    }
}
exports.RankingCriteriaLineItemFields = RankingCriteriaLineItemFields;
exports.rankingCriteriaLineItem = new RankingCriteriaLineItemFields(RankingAttributes_1.rankingMap);
//# sourceMappingURL=RankingCriteriaLineItemFields.js.map