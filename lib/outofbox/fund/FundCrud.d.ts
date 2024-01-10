import { Question } from '@serenity-js/core';
export declare const addFundGroup: {
    using: (FundGroupInfo: DataTable) => any;
};
export declare const addFund: {
    using: (fundInfo: DataTable) => any;
};
export declare const addFundAndFundBalance: {
    using: (fundInfo: DataTable) => any;
};
export declare const assignProjectFund: {
    using: (fundName: string | Question<any>) => any;
};
export declare const checkSelectedFund: {
    using: (fundName: string | Question<any>, expectedResult: string) => any;
};
export declare const checkFundEndingBalanceInfo: {
    using: (color: string, fundBalanceInfo: DataTable) => any;
};
export declare const saveFundAllocation: {
    using: (fundAllocationInfo: DataTable) => any;
};
export declare const checkFundAllocationInfo: {
    using: (color: string, fundAllocationInfo: DataTable) => any;
};
export declare const assignProjectToFund: {
    using: (projectName: string | Question<any>) => any;
};
export declare const checkProjectFundAllocationInfo: {
    using: (fundAllocation: DataTable) => any;
};
export declare const selectFundToBatchAllocation: {
    using: (fundName: string | Question<any>) => any;
};
export declare const saveBatchProjectFundAllocation: {
    using: (fundAllocation: DataTable) => any;
};
export declare const checkBatchProjectFundAllocationInfo: {
    using: (color: string, fundAllocation: DataTable) => any;
};
export declare const checkAdditionalFundNeededInfo: {
    using: (fundNeeded: DataTable) => any;
};
