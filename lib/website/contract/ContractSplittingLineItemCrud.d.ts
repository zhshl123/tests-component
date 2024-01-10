export declare class ContractSplittingLineItemCrud {
    addMultiLines: (splittingLineItemInfo: Record<string, string>[]) => any;
    openEditLineItemDetailPopup: () => any;
    fillFields: (item: Record<string, string>) => any;
    checkMultiLines: (splittingLineItemInfo: Record<string, string>[], expectedResult: any) => any;
    updateMultiLines: (splittingLineItemInfo: Record<string, string>[]) => any;
    deleteMultiLines: (splittingLineItemInfo: Record<string, string>[]) => any;
}
export declare const contractSplittingLineItemCrud: ContractSplittingLineItemCrud;
