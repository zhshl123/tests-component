import { EditFromFields } from '../../common/abstract';
export declare class EditContractFields extends EditFromFields {
    entityMap: Map<string, string>;
    contractType: string;
    constructor(entityMap: any);
    /**
     * edit contract的Invoices页面
     * @returns
     */
    invoiceTabFrame: () => any;
}
export declare const contract: EditContractFields;
