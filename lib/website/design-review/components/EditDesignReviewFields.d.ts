import { EditFromFields, SearchFromFields } from "../../common/abstract";
export declare class EditCSPFields extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
}
export declare const designReview: EditCSPFields;
export declare const browseDesignReview: SearchFromFields;
