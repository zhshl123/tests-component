import { EditFromFields } from '../common/abstract';
export declare class EditProposal extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    dropdownField: (fieldName: string) => any;
    dropdownListBox: (fieldName: string) => any;
    NewScopingAreaEditIcon: () => any;
    clickNewEditIcon: () => any;
}
export declare const proposal: EditProposal;
