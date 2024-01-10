import { PageTabs } from '../../common/abstract';
export declare class COPageTabs extends PageTabs {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    /**
     * 点击tab
     * @param entityName entity名称
     * @param tabName tab名称
     * @returns
     */
    clickTabById: (tabName: string) => any;
}
export declare const COTab: COPageTabs;
