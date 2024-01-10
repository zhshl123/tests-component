import { EditFromFields, SearchFromFields } from "../../common/abstract";
export declare class EditCSOFields extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
}
export declare const cso: EditCSOFields;
export declare const browseCso: SearchFromFields;
