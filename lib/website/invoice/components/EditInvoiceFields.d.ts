import { EditFromFields } from '../../common/abstract';
export declare class EditInvoiceFields extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
}
export declare const invoice: EditInvoiceFields;
