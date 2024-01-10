"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fund = exports.EditFund = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../common/abstract");
const FundAttributes_1 = require("./FundAttributes");
class EditFund extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.EditIcon = () => web_1.PageElements.located(web_1.By.css(`[class="clinktext"]`)).last()
            .describedAs('Edit icon');
        this.ClickEditIcon = () => {
            return core_1.Task.where(`#actor click the Edit icon `, core_1.Check.whether(this.EditIcon(), (0, assertions_1.isPresent)()).andIfSo(web_1.Click.on(this.EditIcon())).otherwise(core_1.Log.the(`no data`)));
        };
        this.fillFundBalanceTableCell = (rowNumber, colNumber, value) => {
            return core_1.Task.where(`#actor fill fund balance table cell row ${rowNumber} column ${colNumber} with ${value}`, web_1.Click.on(this.beginningbalanceTableCell(rowNumber, colNumber)), web_1.Enter.theValue(value).into(this.beginningbalanceTableCell(rowNumber, colNumber)));
        };
        /**********************add fund ******** */
        this.fundBalanceTable = () => web_1.PageElement.located(web_1.By.id('ctl00_body_FundInfo_Tablu'))
            .describedAs('fund balance table');
        /**
         * fund balance 表体
         * @param rowNumber 行号，表头开始算，第一行为0，以此类推
         * @returns
         */
        this.fundBalanceTableBodyRow = (rowNumber) => web_1.PageElements.located(web_1.By.css('.cstdgrid__bodyrow'))
            .nth(rowNumber)
            .of(this.fundBalanceTable());
        /**
         * fund balance 表体单元格
         * @param rowNumber 行号，表头开始算，第一行为0，以此类推
         * @param colNumber 列序号， 第一列为0， 以此类推
         * @returns
         */
        this.beginningbalanceTableCell = (rowNumber, colNumber) => web_1.PageElement.located(web_1.By.id(`ctl00_body_FundInfo_tbx_${rowNumber}_${colNumber}`));
    }
}
exports.EditFund = EditFund;
exports.fund = new EditFund(FundAttributes_1.fundAttributesMap);
//# sourceMappingURL=EditFund.js.map