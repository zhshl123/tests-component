"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseIssue = exports.issue = exports.EditIssueFields = void 0;
const abstract_1 = require("../../common/abstract");
const IssueAttributes_1 = require("./IssueAttributes");
class EditIssueFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.EditIssueFields = EditIssueFields;
exports.issue = new EditIssueFields(IssueAttributes_1.issueAttributeMap);
exports.browseIssue = new abstract_1.SearchFromFields(IssueAttributes_1.issueAttributeMap);
//# sourceMappingURL=EditIsuueFields.js.map