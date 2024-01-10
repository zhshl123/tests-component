import { SearchFromFields } from "../../common/abstract";
import { corAttributeMap } from "./corAttributes";

export class BrowseCORFields extends SearchFromFields { 
    entityMap: Map<string, string>
    constructor(entityMap) { 
        super(entityMap);
    };
}

export const browseCOR =new BrowseCORFields(corAttributeMap)