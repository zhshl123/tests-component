import { EditFromFields } from '../common/abstract';
export declare class EditScopingTemplateFIelds extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    /**
     * 普通文字输入框
     * @param fieldName 字段名称
     * @returns
     */
    textInputField: (fieldName: string) => any;
    /**
     * 下拉框输入框
     * @param fieldName 字段名称
     * @returns
     */
    dropdownField: (fieldName: string) => any;
    /**
     * 下拉框面板
     * @param fieldName 字段名称
     * @returns
     */
    dropdownListBox: (fieldName: string) => any;
    /**
     * 单选框
     * @param fieldName 字段名称
     * @param nthCheckbox 第一个选项为0，以此类推
     * @returns
     */
    checkbox: (fieldName: string, nthCheckbox: number) => any;
    /**
     * Cost Scoping Base Period的单选框
     * @param nthCheckbox 第一个选项为0，以此类推
     * @returns
     */
    costScopingBasePeriodCheckbox: (nthCheckbox: number) => any;
    availableAttribute: (itemName: string) => any;
    availableAttributeAddIcon: () => any;
    selectedAttributeTable: () => any;
    /**
     * selected Attribute表的行
     * @param rowNumber 行号，含表头，第一行为0
     * @returns
     */
    selectedAttributeTableRow: (rowNumber: number) => any;
    /**
     * selected Attribute表的attribute单元格
     * @param rowNumber 行号，含表头，第一行为0
     * @param fieldName 列名
     * @returns
     */
    selectedAttributeTableColumn: (rowNumber: number, columnName: string) => any;
    availableNodeRoot: () => any;
    availableNodeRootName: (itemName: string) => any;
    availableNodeRootCheckbox: () => any;
    availableNodeListBox: () => any;
    availableNodeList: () => any;
    /**
     * selected Available Node的node节点
     * @param nodeNumber 第几个节点， 第一个为1，以此类推
     * @returns
     */
    availableNode: (nodeNumber: string) => any;
    /**
     * selected Available Node表的node节点名称
     * @param nodeNumber 第几个节点， 第一个为1，以此类推
     * @param nodeName 节点名称
     * @returns
     */
    availableNodeName: (nodeNumber: string, nodeName: string) => any;
    /**
     * selected Available Node表的node节点名称
     * @param nodeNumber 第几个节点， 第一个为1，以此类推
     * @param nodeName 节点名称
     * @returns
     */
    availableNodeCheckbox: (nodeNumber: string) => any;
    selectedAvailableNodeTable: () => any;
    /**
     * selected Available Node表的行
     * @param rowNumber 包含首行，第一行为0，以此类推
     * @returns
     */
    selectedAvailableNodeTableRow: (rowNumber: number) => any;
    /**
     * selected Available Node表的单元格
     * @param rowNumber 包含首行，第一行为0，以此类推
     * @param columnName 列名
     */
    selectedAvailableNodeTableColumn: (rowNumber: number, columnName: string) => any;
    scopingTemplateDetailRow: () => any;
    scopingTemplateDetailInputField: () => any;
    scopingTempleteDetailLookupPopup: () => any;
    accountCodeItem: (itemName: string) => any;
    selectedAccountCodeItem: () => any;
    selectedAccountCodeItemCheckbox: () => any;
    /******************************** preview tab 页面******************************** */
    previewTable: () => any;
    /**
     * preview表的行，
     * @param rowNumber 含表头，第一行为0， 以此类推
     * @returns
     */
    previewTableRow: (rowNumber: number) => any;
    /**
     * preview表的单元格，含表头，第一行为0， 以此类推
     * @param rowNumber 含表头，第一行为0， 以此类推
     * @param colNumber 列序号，第一列为0，以此类推
     * @returns
     */
    previewTableCell: (rowNumber: number, colNumber: number) => any;
    /**
     * preview表的自定义attribute列
     * @returns
     */
    previewTableAttributeCell: () => any;
    /**
     * preview表的自定义attribute列的必填标记
     * @returns
     */
    previewTableAttributeCellIsRequiredIcon: () => any;
    /**
     * preview表的Total列
     * @returns
     */
    previewTableTotalCell: () => any;
}
export declare const scopingTemplate: EditScopingTemplateFIelds;
