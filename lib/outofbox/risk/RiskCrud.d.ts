export declare const addRisk: {
    using: (riskInfo: DataTable) => any;
};
export declare const editRisk: {
    using: (riskInfo: DataTable) => any;
};
export declare const checkRisk: {
    using: (riskInfo: DataTable) => any;
};
export declare const deleteRisk: {
    using: () => any;
};
export declare const addRiskFromProject: {
    using: (riskInfo: DataTable) => any;
};
export declare const checkWorkflowParticipant: {
    using: (username: string) => any;
};
export declare const assignRiskReviewer: {
    using: (reviewer: string) => any;
};
export declare const reviewWorkflowTask: {
    using: (reviewResult: string, comment: string) => any;
};
export declare const checkWorkflowStatusAndComment: {
    using: (comment: string) => any;
};
export declare const checkWorkflowComment: {
    using: (comment: string) => any;
};
