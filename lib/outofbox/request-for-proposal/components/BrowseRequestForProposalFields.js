"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseRequestForProposal = exports.BrowseRequestForProposalFields = void 0;
const abstract_1 = require("../../common/abstract");
const RequestForProposalAttributes_1 = require("./RequestForProposalAttributes");
class BrowseRequestForProposalFields extends abstract_1.SearchFromFields {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.BrowseRequestForProposalFields = BrowseRequestForProposalFields;
exports.browseRequestForProposal = new BrowseRequestForProposalFields(RequestForProposalAttributes_1.requestForProposalAttributesMap);
//# sourceMappingURL=BrowseRequestForProposalFields.js.map