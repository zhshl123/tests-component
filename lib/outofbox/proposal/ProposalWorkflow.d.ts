import { Workflow } from '../common/abstract';
export declare class ProposalWorkflow extends Workflow {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    checkWorkflowParticipant: (username: string) => any;
}
export declare const proposalWorkflow: ProposalWorkflow;
