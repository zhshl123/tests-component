import { EditFromFields, SearchFromFields } from "../../common/abstract";
import { issueAttributeMap } from "./IssueAttributes";

export class EditIssueFields extends EditFromFields{
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

}

export const issue = new EditIssueFields(issueAttributeMap)
export const browseIssue = new SearchFromFields(issueAttributeMap)