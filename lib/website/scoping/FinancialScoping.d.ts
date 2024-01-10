import { EditFromFields } from '../common/abstract';
export declare class EditFinancialTab extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    /********************************** scoping Summary table **************************************** */
    /**
     * 给scoping数据表填值
     * @param rowNumber 行号，包含表头， 第一行为0，以此类推
     * @param colNumber 列序号，不含首列， 第一列为0， 以此类推
     * @param value 要填的值
     * @returns
     */
    fillScopingSummaryTableCell: (rowNumber: number, colNumber: number, value: string) => any;
    checkScopingSummaryTableCellValue: (rowNumber: number, colNumber: number, value: string) => any;
    checkScopingSummaryTableCellIsReadOnly: (rowNumber: number, colNumber: number) => any;
    /**
     * 选择scoping status选项
     * @param itemName 选项的值
     * @returns
     */
    selectScopingStatus: (itemName: string) => any;
    /**
     * 检查scoping status选项
     * @param itemName 选项的值
     * @returns
     */
    checkScopingStatus: (itemName: string) => any;
    /**
     * scoping 数据表的行
     * @param rowNumber 行号，包含表头， 第一行为0，以此类推
     * @returns
     */
    scopingSummaryTableRow: (rowNumber: number) => any;
    /**
     * scoping 数据表的单元格
     * @param rowNumber 行号，包含表头， 第一行为0，以此类推
     * @param colNumber 列序号，不含首列， 第一列为0， 以此类推
     * @returns
     */
    scopingSummaryTableCell: (rowNumber: number, colNumber: number) => any;
    scopingStatusDropdownInputField: () => any;
    scopingStatusDropdownBox: () => any;
    scopingStatusDropdownItem: (itemName: string) => any;
    scopingTypeDropdownInputfield: () => any;
    scopingTypeDropdownBox: () => any;
    scopingTypeDropdownItem: (itemName: string) => any;
    /**
     * scoping 的类型
     * @param value 要选的值
     * @returns
     */
    selectScopingType: (value: string) => any;
}
export declare const financial: EditFinancialTab;
