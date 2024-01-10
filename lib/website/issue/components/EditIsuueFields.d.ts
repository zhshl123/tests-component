import { EditFromFields, SearchFromFields } from "../../common/abstract";
export declare class EditIssueFields extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
}
export declare const issue: EditIssueFields;
export declare const browseIssue: SearchFromFields;
