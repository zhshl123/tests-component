/**
 * 添加solicitation
//  */
export declare const addSolicitationByRequiredFields: {
    using: (solicitaitonInfo: DataTable) => any;
};
export declare const addSolicitationByAllFields: {
    using: (solicitaitonInfo: DataTable) => any;
};
export declare const fillSolicitationRequiredFields: {
    using: (type: string, SolicitationID: string, SolicitationName: string, PublicationDate: string, BidDueDate: string) => any;
};
export declare const checkAddSolicitationResult: {
    using: (result: string) => any;
};
export declare const fillSolicitationNotRequiredFields: {
    using: (solicitationInfo: DataTable) => any;
};
