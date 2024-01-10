import { LineItemFields } from '../../common/abstract';
export declare class ContractLineItemFields extends LineItemFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    lineItemsSectionPanel: () => any;
    paidExpenseSectionPanel: () => any;
    editLineItemDetailPopupPanel: () => any;
}
export declare const contractLineItem: ContractLineItemFields;
