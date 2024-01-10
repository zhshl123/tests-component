import { EditFromFields } from '../common/abstract';
export declare class EditFiltering extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    dropdownListBox: (fieldName: string) => any;
    NewScopingAreaEditIcon: () => any;
    clickNewEditIcon: () => any;
}
export declare const Filtering: EditFiltering;
