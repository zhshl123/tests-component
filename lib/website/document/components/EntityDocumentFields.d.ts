import { EditFromFields } from '../../common/abstract';
export declare class EntityDocumentFields extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    selectAllCheckBox: () => any;
    gridButton: (buttonName: string) => any;
}
export declare const entityDocument: EntityDocumentFields;
