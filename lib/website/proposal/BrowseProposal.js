"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseProposal = exports.BrowseProposalField = void 0;
const core_1 = require("@serenity-js/core");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const abstract_1 = require(".././common/abstract");
const common_1 = require("../common");
const GridList_1 = require("../common/GridList");
const ProposalAttributes_1 = require("./ProposalAttributes");
class BrowseProposalField extends abstract_1.SearchFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.searchItemInBrowsePage = (fieldName, itemName) => {
            return core_1.Task.where(`#actor search item: ${itemName} with ${fieldName}`, this.fillTextInputField(fieldName, itemName), common_1.clickButton.using(DefaultStaticParams_1.SEARCH), core_1.Wait.for(core_1.Duration.ofSeconds(3)), (0, GridList_1.checkGridList)());
        };
    }
}
exports.BrowseProposalField = BrowseProposalField;
exports.browseProposal = new BrowseProposalField(ProposalAttributes_1.proposalMap);
//# sourceMappingURL=BrowseProposal.js.map