"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionLineItem = exports.QuestionLineItemFields = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
const abstract_1 = require("../../common/abstract");
const SolicitationAttributes_1 = require("./SolicitationAttributes");
class QuestionLineItemFields extends abstract_1.LineItemFields {
    constructor(entityMap) {
        super(entityMap);
        this.QuestionlineItemsSectionPanel = () => web_1.PageElement.located(web_1.By.id('ctl00_body_MainPanel'))
            .describedAs('question line item section');
        /**
         * 填写edit line item popup页面
         * @param buttonName
         * @returns
         */
        this.fillEditLineItemDetailPopup = (rowNumber, fieldName, itemName) => {
            return core_1.Task.where(`#actor fill row ${rowNumber} line item: ${fieldName} with ${itemName}`, web_1.Click.on(this.textareaTableCell(rowNumber, fieldName)), web_1.Click.on(this.textareaTableCell(rowNumber, fieldName)), core_1.Wait.until(this.textareaPopup('textareaPopup'), (0, web_1.isVisible)()), web_1.Switch.to(this.textareaPopup('textareaPopup')).and(web_1.Enter.theValue(itemName).into(this.textInputFieldInPopup('textareaPopup')), this.clickPopupButton.using('textareaPopup', DefaultStaticParams_1.OK)));
        };
        this.textareaTableCell = (rowNumber, fieldName) => {
            const row = Number(rowNumber) - 1;
            return web_1.PageElements.located(web_1.By.css(`[data-field="ItemName"]`)).nth(row)
                .describedAs(`row ${rowNumber}: ${fieldName} table cell`);
        };
        this.textInputFieldInPopup = (fieldName) => {
            return web_1.PageElement.located(web_1.By.css(`[name="ItemName"]`))
                .of(this.textareaPopup(fieldName));
        };
        this.popupButton = (fieldName, buttonName) => web_1.PageElement.located(web_1.By.id('ctl00_body_ucTreeView_ucGridView_btn' + buttonName))
            .of(this.textareaPopup(fieldName))
            .describedAs(`popup button ${buttonName}`);
        /**
         * click popup button (一般为popup页面顶部的操作按钮)
         * @returns
         */
        this.clickPopupButton = {
            using: (fieldName, buttonName) => core_1.Task.where(`#actor click action button: ${buttonName}`, web_1.Click.on(this.popupButton(fieldName, buttonName)))
        };
        this.emtpyDataTable = () => web_1.PageElement.located(web_1.By.css('.k-grid-norecords'))
            .describedAs('empty data table');
    }
}
exports.QuestionLineItemFields = QuestionLineItemFields;
exports.questionLineItem = new QuestionLineItemFields(SolicitationAttributes_1.solicitationAttributesMap);
//# sourceMappingURL=QuestionsLineItemField.js.map