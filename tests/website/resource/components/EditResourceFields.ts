import { By, PageElement } from "@serenity-js/web";
import { EditFromFields } from "../../common/abstract";
import { resourceAttributeMap } from "./ResourceAttributes";

export class EditResourceFieldds extends EditFromFields{
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

}

export const  resource = new EditResourceFieldds(resourceAttributeMap)