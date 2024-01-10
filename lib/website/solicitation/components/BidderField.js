"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bidderFields = exports.BidderFields = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../../common/abstract");
const SolicitationAttributes_1 = require("./SolicitationAttributes");
class BidderFields extends abstract_1.LineItemFields {
    constructor(entityMap) {
        super(entityMap);
        this.biddersTable = () => web_1.PageElement.located(web_1.By.id('ctl00_body_gvBidders'))
            .describedAs('bidders table');
        /**
         *
         * @param rowNumber 含表头，第一行为0
         * @returns
         */
        this.biddersTableTr = (rowNumber) => web_1.PageElements.located(web_1.By.css('tr')).nth(rowNumber)
            .of(this.biddersTable())
            .describedAs('bidders table row:' + rowNumber);
        /**
         *
         * @param rowNumber 含表头，第一行为0
         * @param colNumber 别序号，第一列为0
         * @returns
         */
        this.biddersTableCell = (rowNumber, colNumber) => web_1.PageElements.located(web_1.By.css('td')).nth(colNumber)
            .of(this.biddersTableTr(rowNumber))
            .describedAs(`bidders table row:${rowNumber}, column:${colNumber} cell`);
        this.checkBidderTableCellValue = (rowNumber, colNumber, value) => {
            return core_1.Task.where(`#actor check bidders table row:${rowNumber}, column:${colNumber} cell value with ${value}`, assertions_1.Ensure.eventually(web_1.Text.of(this.biddersTableCell(rowNumber, colNumber)), (0, assertions_1.equals)(value)));
        };
    }
}
exports.BidderFields = BidderFields;
exports.bidderFields = new BidderFields(SolicitationAttributes_1.solicitationAttributesMap);
//# sourceMappingURL=BidderField.js.map