import { LineItemFields } from '../../common/abstract';
export declare class BidderFields extends LineItemFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    biddersTable: () => any;
    /**
     *
     * @param rowNumber 含表头，第一行为0
     * @returns
     */
    biddersTableTr: (rowNumber: number) => any;
    /**
     *
     * @param rowNumber 含表头，第一行为0
     * @param colNumber 别序号，第一列为0
     * @returns
     */
    biddersTableCell: (rowNumber: number, colNumber: number) => any;
    checkBidderTableCellValue: (rowNumber: number, colNumber: number, value: string) => any;
}
export declare const bidderFields: BidderFields;
