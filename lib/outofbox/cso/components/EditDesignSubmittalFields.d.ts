import { EditFromFields, SearchFromFields } from '../../common/abstract';
export declare class EditCSOFields extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
}
export declare const designSubmittal: EditCSOFields;
export declare const browseDesignSubmittal: SearchFromFields;
