import { EditFromFields } from '../common/abstract';
export declare class EditPermit extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    dropdownField: (fieldName: string) => any;
}
export declare const permit: EditPermit;
