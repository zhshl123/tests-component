"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solicitation = exports.EditSolicitationFields = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
const abstract_1 = require("../../common/abstract");
const SolicitationAttributes_1 = require("./SolicitationAttributes");
class EditSolicitationFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.checkReadOnlyLabelValue = (fieldName, itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check read only label field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Text.of(this.readOnlyLabelField(fieldName)), (0, assertions_1.includes)(itemName))) : core_1.Task.where(`#actor check read only label field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Text.of(this.readOnlyLabelField(fieldName)), (0, assertions_1.not)((0, assertions_1.includes)(itemName))));
        };
        this.lookupInputFieldClearIcon = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_btnClear'))
            .describedAs(fieldName + ' looukup input field clear icon');
        this.departmentLookupInputFieldValue = (fieldName, itemName) => web_1.PageElement.located(web_1.By.css(`[title="${itemName}"]`))
            .of(this.lookupInputFieldUl(fieldName))
            .describedAs('department lookup input field value');
    }
}
exports.EditSolicitationFields = EditSolicitationFields;
exports.solicitation = new EditSolicitationFields(SolicitationAttributes_1.solicitationAttributesMap);
//# sourceMappingURL=EditSolicitationFields.js.map