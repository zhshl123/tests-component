import { EditFromFields } from '../common/abstract';
export declare class RankingCriteriaLineItemFields extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    /**
     * 给表单元格填值
     * @param rowNumber 表体，第一行为0，以此类推
     * @param colNumber 表体，第一列为0， 以此类推
     * @param value 要填的值
     * @returns
     */
    fillTableCell: (rowNumber: number, colNumber: number, value: string) => any;
    popupWindow: () => any;
    table: () => any;
    tableBodyrows: () => any;
    /**
     * 表体的单元格
     * @param rowNumber 表体，第一行为0，以此类推
     * @param colNumber 表体操作按钮坐在列，第一列为0， 以此类推
     * @returns
     */
    tableBodyRowCell: (rowNumber: number, colNumber: number) => any;
    deleteIcon: () => any;
    addBelowIcon: () => any;
    OKButton: () => any;
    cancelButton: () => any;
}
export declare const rankingCriteriaLineItem: RankingCriteriaLineItemFields;
