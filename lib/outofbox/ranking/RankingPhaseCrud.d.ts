import { Question } from '@serenity-js/core';
export declare const updateRankingPhaseInfo: {
    using: (rankingPhaseInfo: DataTable) => any;
};
export declare const checkRankingPhaseInfo: {
    using: (rankingPhaseInfo: DataTable) => any;
};
export declare const checkProjectInRankingPhase: {
    using: (projectName: string | Question<any>) => any;
};
export declare const updateFirstRankingPhaseCriteriaInfo: {
    using: (criteriaInfo: DataTable) => any;
};
export declare const checkFirstRankingPhaseCriteriaInfo: {
    using: (criteriaInfo: DataTable) => any;
};
export declare const selectProjectCriteriaScore: {
    using: (score: string, reason: string) => any;
};
export declare const checkProjectCriteriaScore: {
    using: (projectScoreInfo: DataTable) => any;
};
export declare const updateProjectAdjustScore: {
    using: (score: string) => any;
};
export declare const checkProjectRankingResult: {
    using: (projectRankingInfo: DataTable) => any;
};
export declare const checkCriteriaScoreDetails: {
    using: (criteriaScoreInfo: DataTable) => any;
};
