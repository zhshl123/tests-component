import { EditFromFields, SearchFromFields } from "../../common/abstract";
import { CSPAttributeMap } from "./CSPAttributes";

export class EditCSPFields extends EditFromFields{

    entityMap: Map<string, string>
        constructor(entityMap) {
            super(entityMap);
        }
    
    }
    
    export const csp = new EditCSPFields(CSPAttributeMap)
    export const browseCsp = new SearchFromFields(CSPAttributeMap)