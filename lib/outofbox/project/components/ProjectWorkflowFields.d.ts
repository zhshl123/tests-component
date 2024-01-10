import { Workflow } from '../../common/abstract';
export declare class ProjectWorkflow extends Workflow {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    checkWorkflowParticipant: (username: string) => any;
}
export declare const projectWorkflow: ProjectWorkflow;
