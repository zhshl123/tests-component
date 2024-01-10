/**
 * 添加contract
 */
export declare const addContractWithRequiredFields: {
    using: (contractInfo: DataTable) => any;
};
export declare const fillContractRequiredFields: {
    using: (contractType: string, contractName: string, primeContractor: string, parentContract: string) => any;
};
export declare const fillContractNotRequiredFields: {
    using: (contractInfo: DataTable) => any;
};
