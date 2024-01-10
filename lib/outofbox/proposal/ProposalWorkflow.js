"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proposalWorkflow = exports.ProposalWorkflow = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const abstract_1 = require("../common/abstract");
const EditProposalFields_1 = require("./EditProposalFields");
const ProposalAttributes_1 = require("./ProposalAttributes");
class ProposalWorkflow extends abstract_1.Workflow {
    constructor(entityMap) {
        super(entityMap);
        this.checkWorkflowParticipant = (username) => {
            return username === '(no participant)' ? core_1.Task.where(`#actor check workflow participant with ${username}`, assertions_1.Ensure.eventually(this.participantsTable(), (0, assertions_1.isPresent)()), core_1.Check.whether(EditProposalFields_1.proposal.lookupInputFieldUl('Project Manager'), (0, assertions_1.isPresent)()).andIfSo(core_1.Log.the('proposal project manager already assigned')).otherwise(assertions_1.Ensure.eventually(this.participantsTableCell('(no participant)'), (0, assertions_1.isPresent)()))) : core_1.Task.where(`#actor check workflow participant with ${username}`, assertions_1.Ensure.eventually(this.participantsTable(), (0, assertions_1.isPresent)()), core_1.Check.whether(EditProposalFields_1.proposal.lookupInputFieldUl('Project Manager'), (0, assertions_1.isPresent)()).andIfSo(assertions_1.Ensure.eventually(this.participantsTableCell(username), (0, assertions_1.isPresent)())).otherwise(assertions_1.Ensure.eventually(this.participantsTableCell('(no participant)'), (0, assertions_1.isPresent)())));
        };
    }
}
exports.ProposalWorkflow = ProposalWorkflow;
exports.proposalWorkflow = new ProposalWorkflow(ProposalAttributes_1.proposalAttributeMap);
//# sourceMappingURL=ProposalWorkflow.js.map