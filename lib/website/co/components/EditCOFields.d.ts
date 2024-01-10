import { EditFromFields, SearchFromFields } from '../../common/abstract';
export declare class EditCOFields extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
}
export declare const CO: EditCOFields;
export declare const browseCO: SearchFromFields;
