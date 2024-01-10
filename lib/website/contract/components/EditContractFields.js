"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contract = exports.EditContractFields = void 0;
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../../common/abstract");
const ContractAttributes_1 = require("./ContractAttributes");
class EditContractFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        /**
         * edit contract的Invoices页面
         * @returns
         */
        this.invoiceTabFrame = () => web_1.PageElement.located(web_1.By.id('ctl00_body_iFrame'))
            .describedAs('Invoice Tab Frame');
    }
}
exports.EditContractFields = EditContractFields;
exports.contract = new EditContractFields(ContractAttributes_1.contractAttributesMap);
//# sourceMappingURL=EditContractFields.js.map