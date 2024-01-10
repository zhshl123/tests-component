import { EditFromFields, SearchFromFields } from '../common/abstract';
export declare class EditFilteringFields extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    dropdownListBox: (fieldName: string) => any;
    NewScopingAreaEditIcon: () => any;
    clickNewEditIcon: () => any;
    projectPopup: () => any;
    selectAllCheckboxInGrid: () => any;
    projectRankingNote: () => any;
    /************************ filtering result ***************************** */
    filterResultTable: () => any;
    /**
     * filtering result表的行
     * @param rowNumber 含表头，第一行为0， 以此类推
     * @returns
     */
    filterResultTableRow: (rowNumber: number) => any;
    /**
     * filtering result表的单元格
     * @param rowNumber 含表头，第一行为0， 以此类推
     * @param colNumber 第一列为0， 以此类推
     * @returns
     */
    filterResultTableCell: (rowNumber: number, colNumber: number) => any;
    viewSnapshotIcon: (rowNumber: number, colNumber: number) => any;
    /**
     * 加成filtering result表的单元格的值
     * @param rowNumber 含表头，第一行为0， 以此类推
     * @param colNumber 第一列为0， 以此类推
     * @param value 期望值
     * @returns
     */
    checkFilteringResultTableCellValue: (rowNumber: number, colNumber: number, value: string) => any;
    /********************************* snapshot ********************************* */
    snapshotTable: () => any;
    /**
     * snapshot 表的单元格
     * @param rowNumber 含表头，第一行为0， 以此类推
     * @returns
     */
    snapshotTableRow: (rowNumber: number) => any;
    /**
     * snapshot 表的单元格
     * @param rowNumber 含表头，第一行为0， 以此类推
     * @param colNumber 第一列为0， 以此类推
     * @returns
     */
    snapshotTableCell: (rowNumber: number, colNumber: number) => any;
    /**
     * 检查snapshot 表的单元格的值
     * @param rowNumber 含表头，第一行为0， 以此类推
     * @param colNumber 第一列为0， 以此类推
     * @param value 期望值
     * @returns
     */
    checkFilteringSnapshotTableCellValue: (rowNumber: number, colNumber: number, value: string) => any;
}
export declare const filteringPhase: EditFilteringFields;
export declare const browseFiltering: SearchFromFields;
