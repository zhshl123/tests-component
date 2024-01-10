export declare class PageTabs {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    /**
     * 点击tab
     * @param entityName entity名称
     * @param tabName tab名称
     * @returns
     */
    clickTab: (tabName: string) => any;
    /**
     * 左侧tab的面板(子类可重写此方法)
     * @param entityName entity name
     * @returns
     */
    tabPanel: () => any;
    /**
     * 指定的tab
     * @param entityName entity name
     * @param tabName tab的名称
     * @returns
     */
    tab: (tabName: string) => any;
    /**
     * tab的id
     * @param entityName entity name
     * @param tabName tab名称
     * @returns
     */
    tabByTabId: (tabName: string) => any;
}
