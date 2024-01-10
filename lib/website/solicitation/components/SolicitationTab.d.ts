import { PageTabs } from '../../common/abstract';
export declare class SolicitationTabs extends PageTabs {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    clickSolicitationTab: (tabName: string) => any;
    clickRankingPhaseTab: (tabName: string) => any;
    /**
     * 指定的tab
     * @param entityName entity name
     * @param tabName tab的名称
     * @returns
     */
    tab: (tabName: string) => any;
}
export declare const solicitationTab: SolicitationTabs;
