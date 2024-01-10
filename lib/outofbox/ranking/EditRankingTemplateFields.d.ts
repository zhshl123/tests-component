import { EditFromFields, SearchFromFields } from '../common/abstract';
export declare class EditRankingTemplateFields extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    /**
     * 给表单元格填值
     * @param rowNumber 行号，不含表头，第一行为0，以此类推
     * @param fieldName 字段名称
     * @param value 要填的值
     * @returns
     */
    fillCriteriaTextField: (rowNumber: number, fieldName: string, value: string) => any;
    checkCriteriaFieldCell: (rowNumber: number, fieldName: string, value: string) => any;
    /**
     * 给表数字格式单元格填值
     * @param rowNumber 行号，不含表头，第一行为0，以此类推
     * @param fieldName 字段名称
     * @param value 要填的值
     * @returns
     */
    fillCriteriaNumberField: (rowNumber: number, fieldName: string, value: string) => any;
    criteriaTable: () => any;
    criteriaTableBodyRows: () => any;
    /**
     * 表的行
     * @param rowNumber 行号，不含表头，第一行为0，以此类推
     * @param fieldName 字段名称
     * @returns
     */
    criteriaTableCell: (rowNumber: number, fieldName: string) => any;
    criteriaTableCellValue: (rowNumber: number, fieldName: string) => any;
    criteriaTableTextInputField: (rowNumber: number, fieldName: string) => any;
    criteriaTableNumberInputField: (rowNumber: number, fieldName: string) => any;
    iconButton: (buttonName: string) => any;
    arrowIconRow: (rowNumber: number, fieldName: string) => any;
}
export declare const rankingTempalte: EditRankingTemplateFields;
export declare const browseRankingTempalte: SearchFromFields;
