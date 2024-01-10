import { EditFromFields, PageTabs, SearchFromFields } from '../common/abstract';
export declare class EditRankingPhaseFields extends EditFromFields {
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
    /********************** View Summary tab************************** */
    /**
     * 校验表体的单元格的值
     * @param rowNumber 表体第一行为0，以此类推
     * @param colNumber 表体第一列为0，以此类推
     * @returns
     */
    checkProjectRankingResultCell: (rowNumber: number, colNumber: number, value: string) => any;
    /**
     * 校验表体的max score行单元格的值
     * @param rowNumber 含表头，第一行为0，以此类推
     * @param colNumber 表体第一列为0，以此类推
     * @returns
     */
    checkCriteriaScoreDetailMaxScoreCellValue: (rowNumber: number, colNumber: number, value: string) => any;
    /**
     * 校验表体的project行的单元格的值
     * @param rowNumber 含表头，第一行为0，以此类推
     * @param colNumber 表体第一列为0，以此类推
     * @returns
     */
    checkCriteriaScoreDetailProjectCellValue: (rowNumber: number, colNumber: number, value: string) => any;
    projectRankingResultTable: () => any;
    /**
     * project ranking results 表体的行
     * @param rowNumber 含表头，表体第一行为0，以此类推
     * @returns
     */
    projectRankingResultTableBodyRow: (rowNumber: number) => any;
    /**
     * 表体的单元格
     * @param rowNumber 含表头，表体第一行为0，以此类推
     * @param colNumber 表体第一列为0，以此类推
     * @returns
     */
    projectRankingResultTableCell: (rowNumber: number, colNumber: number) => any;
    criteriaScoreDetailTable: () => any;
    /**
     * project ranking results 表体的行
     * @param rowNumber 含表头，第一行为0，以此类推
     * @returns
     */
    criteriaScoreDetailTableBodyRow: (rowNumber: number) => any;
    /**
     * 表体的max score行的单元格
     * @param rowNumber 含表头，第一行为0，以此类推
     * @param colNumber 第一列为0，以此类推
     * @returns
     */
    criteriaScoreDetailTableMaxScoreRowCell: (rowNumber: number, colNumber: number) => any;
    /**
     * 表体的project的单元格
     * @param rowNumber 含表头，第一行为0，以此类推
     * @param colNumber 第一列为0，以此类推
     * @returns
     */
    criteriaScoreDetailTableProjectRowCell: (rowNumber: number, colNumber: number) => any;
    lastCriteriaScoreDetailTableProjectRowCell: (rowNumber: number) => any;
}
export declare const rankingPhase: EditRankingPhaseFields;
export declare const browseRankingPhase: SearchFromFields;
export declare const rankingPhaseTab: PageTabs;
