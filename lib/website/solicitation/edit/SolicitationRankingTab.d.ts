export declare const addRankingPhase: {
    using: (lineItemsInfo: DataTable) => any;
};
export declare const addLineAndfillFields: {
    using: (items: List<any>) => any;
};
/**
 * 检查多行line item
 */
export declare const checkRankingPhase: {
    using: (lineItemsInfo: DataTable, expectedResult: string) => any;
};
export declare const checkRankingPhasesTask: {
    using: (items: List<any>, expectedResult: string) => any;
};
export declare const deleteRankingPhase: {
    using: () => any;
};
