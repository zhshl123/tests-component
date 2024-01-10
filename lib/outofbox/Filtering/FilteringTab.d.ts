import { PageTabs } from '../common/abstract';
export declare class FilteringTab extends PageTabs {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    /**
     * 左侧tab的面板(子类可重写此方法)
     * @param entityName entity name
     * @returns
     */
    tabPanel: () => any;
}
export declare const filteringPhaseTab: FilteringTab;
