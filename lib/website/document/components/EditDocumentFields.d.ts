import { EditFromFields } from '../../common/abstract';
export declare class EditDocumentFields extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
}
export declare const editDocument: EditDocumentFields;
