import { EditFromFields } from '../common/abstract';
export declare class EditFund extends EditFromFields {
    entityMap: Map<string, string>;
    fundId: string;
    constructor(entityMap: any);
    EditIcon: () => any;
    ClickEditIcon: () => any;
    fillFundBalanceTableCell: (rowNumber: number, colNumber: number, value: string) => any;
    /**********************add fund ******** */
    fundBalanceTable: () => any;
    /**
     * fund balance 表体
     * @param rowNumber 行号，表头开始算，第一行为0，以此类推
     * @returns
     */
    fundBalanceTableBodyRow: (rowNumber: number) => any;
    /**
     * fund balance 表体单元格
     * @param rowNumber 行号，表头开始算，第一行为0，以此类推
     * @param colNumber 列序号， 第一列为0， 以此类推
     * @returns
     */
    beginningbalanceTableCell: (rowNumber: number, colNumber: number) => any;
}
export declare const fund: EditFund;
