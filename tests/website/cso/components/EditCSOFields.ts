import { EditFromFields, SearchFromFields } from "../../common/abstract";
import { CSOAttributeMap } from "./CSOAttributes";

export class EditCSOFields extends EditFromFields{
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

}

export const cso = new EditCSOFields(CSOAttributeMap)
export const browseCso = new SearchFromFields(CSOAttributeMap)