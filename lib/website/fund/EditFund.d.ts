import { EditFromFields } from '../common/abstract';
export declare class EditFund extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    EditIcon: () => any;
    ClickEditIcon: () => any;
}
export declare const fund: EditFund;
