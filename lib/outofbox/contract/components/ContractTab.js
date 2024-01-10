"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractTab = exports.ContactTabs = void 0;
const abstract_1 = require("../../common/abstract");
class ContactTabs extends abstract_1.PageTabs {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.ContactTabs = ContactTabs;
const contractTabMap = new Map();
contractTabMap.set('Line Items', '2');
contractTabMap.set('Splitting Line Items', '3');
exports.contractTab = new ContactTabs(contractTabMap);
//# sourceMappingURL=ContractTab.js.map