import { Question } from '@serenity-js/core';
export declare const updateSolicitationGeneralInfo: {
    using: (solicitationInfo: DataTable) => any;
};
export declare const checkUpdatedSolicitationGeneralInfo: {
    using: (solicitationInfo: DataTable) => any;
};
export declare const deleteSolicitation: {
    using: (solicitationID: string | Question<any>) => any;
};
