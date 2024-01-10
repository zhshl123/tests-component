"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseContract = exports.BrowseContractFields = void 0;
const abstract_1 = require("../../common/abstract");
const ContractAttributes_1 = require("./ContractAttributes");
class BrowseContractFields extends abstract_1.SearchFromFields {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.BrowseContractFields = BrowseContractFields;
exports.browseContract = new BrowseContractFields(ContractAttributes_1.contractAttributesMap);
//# sourceMappingURL=BrowseContractFields.js.map