export declare class ContractLineitemCrud {
    /**
     * 添加单条line item数据
     * @param lineItemsInfo line数据
     */
    addSingleLine: (lineItemsInfo: DataTable) => any;
    addMultiLines: (lineItemsInfo: DataTable) => any;
    checkPaidExpense: () => any;
    addLineAndFillFields: (items: List<any>, contractType: string) => any;
    fillAllFields: (item: Record<string, string>, contractType: string) => any;
    /**
     * 检查多行line item
     */
    checkMultiLines: (lineItemsInfo: DataTable, expectedResult: string) => any;
    /**
     * 检查单条line item
     */
    checkSingleLine: (lineItemsInfo: DataTable, expectedResult: string) => any;
    checkAllFieldsValue: (items: List<any>, contractType: string, expectedResult: string) => any;
    updateMultiContractLineItems: (lineItemsInfo: DataTable) => any;
    deleteMultLines: (lineItemsInfo: DataTable) => any;
}
export declare const contractLineItemCrud: ContractLineitemCrud;
