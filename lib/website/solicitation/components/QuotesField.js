"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quotesFields = exports.QuotesFields = void 0;
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../../common/abstract");
const SolicitationAttributes_1 = require("./SolicitationAttributes");
class QuotesFields extends abstract_1.LineItemFields {
    constructor(entityMap) {
        super(entityMap);
        this.textareaTableCell = (rowNumber, fieldName) => {
            const row = Number(rowNumber) - 1;
            return web_1.PageElements.located(web_1.By.css(`[data-field="ItemName"]`)).nth(row)
                .describedAs(`row ${rowNumber}: ${fieldName} table cell`);
        };
        this.emptyDataTable = () => web_1.PageElement.located(web_1.By.css('.k-grid-norecords'))
            .describedAs('empty data table');
    }
}
exports.QuotesFields = QuotesFields;
exports.quotesFields = new QuotesFields(SolicitationAttributes_1.solicitationAttributesMap);
//# sourceMappingURL=QuotesField.js.map