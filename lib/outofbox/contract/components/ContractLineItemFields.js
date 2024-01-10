"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractLineItem = exports.ContractLineItemFields = void 0;
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../../common/abstract");
const ContractLineItemAttributes_1 = require("./ContractLineItemAttributes");
class ContractLineItemFields extends abstract_1.LineItemFields {
    constructor(entityMap) {
        super(entityMap);
        this.lineItemsSectionPanel = () => web_1.PageElement.located(web_1.By.id('ctl00_body_bulkEditControl1_ctl02Div'))
            .describedAs('contract line item section');
        this.paidExpenseSectionPanel = () => web_1.PageElement.located(web_1.By.id('ctl00_body_div1'))
            .describedAs('Contract Paid Expense Section Panel');
        this.editLineItemDetailPopupPanel = () => web_1.PageElement.located(web_1.By.id('ctl00_body_bulkEditControl1_ctl02_pnlShowSplit'))
            .describedAs('edit contract line item detail popup panel');
    }
}
exports.ContractLineItemFields = ContractLineItemFields;
exports.contractLineItem = new ContractLineItemFields(ContractLineItemAttributes_1.contractLineItemAttributesMap);
//# sourceMappingURL=ContractLineItemFields.js.map