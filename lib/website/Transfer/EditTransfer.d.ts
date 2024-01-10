import { EditFromFields } from '../common/abstract';
export declare class EditTransfer extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    NewScopingAreaEditIcon: () => any;
    clickNewEditIcon: () => any;
}
export declare const transfer: EditTransfer;
