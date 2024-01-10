"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rfp = exports.EditRequestForProposalFields = void 0;
const abstract_1 = require("../../common/abstract");
const RequestForProposalAttributes_1 = require("./RequestForProposalAttributes");
class EditRequestForProposalFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.EditRequestForProposalFields = EditRequestForProposalFields;
exports.rfp = new EditRequestForProposalFields(RequestForProposalAttributes_1.requestForProposalAttributesMap);
//# sourceMappingURL=EditRequestForProposalFields.js.map