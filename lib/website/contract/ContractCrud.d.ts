export declare class ContractCrud {
    contractType: string;
    /**
     * 添加contract
     */
    addByAllFields: (contractInfo: DataTable) => any;
    addByRequiredFields: (contractType: string, contractNo: string, contractName: string, primeContractor: string) => any;
    fillNotRequiredFields: (contractInfo: DataTable, parentContract: string) => any;
    addDefaultLineItemSplitting: {
        using: (contractDefaultLineItems: DataTable) => any;
    };
    changeContractStatus: (targetStatus: string) => any;
    checkContractReadOnlyContract: () => any;
    updateGeneralInfo: (contractInfo: DataTable, updatedContractNo: string, updatedContractName: string, parentContract: string) => any;
    checkGeneralInfo: (contractInfo: DataTable, parentContract: string) => any;
    delete: () => any;
}
export declare const contractCrud: ContractCrud;
