"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proposal = exports.EditProposal = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../common/abstract");
const ProposalAttributes_1 = require("./ProposalAttributes");
class EditProposal extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.dropdownField = (fieldName) => {
            const mappedFieldName = this.entityMap.get(fieldName);
            return web_1.PageElement.located(web_1.By.css(`[aria-owns="ctl00_body_${mappedFieldName}_listbox"]`))
                .describedAs('dropdown field: ' + fieldName);
        };
        this.dropdownListBox = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_listbox'))
            .describedAs('dropdown list box: ' + fieldName);
        this.NewScopingAreaEditIcon = () => web_1.PageElements.located(web_1.By.css(`[title="Edit"]`)).last()
            .describedAs('Edit Icon of New Public Proposal');
        this.clickNewEditIcon = () => {
            return core_1.Task.where(`#actor click New Edit Icon`, web_1.Click.on(this.NewScopingAreaEditIcon()));
        };
    }
}
exports.EditProposal = EditProposal;
exports.proposal = new EditProposal(ProposalAttributes_1.proposalMap);
//# sourceMappingURL=EditProposal.js.map