import { LineItemFields } from '../../common/abstract';
export declare class QuotesFields extends LineItemFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    textareaTableCell: (rowNumber: string, fieldName: string) => any;
    emptyDataTable: () => any;
}
export declare const quotesFields: QuotesFields;
