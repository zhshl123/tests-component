import { PageTabs } from '../../common/abstract';
export declare class ProjectTabs extends PageTabs {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    /**
     * 左侧tab的面板
     * @param entityName entity name
     * @returns
     */
    tabPanel: () => any;
}
export declare const projectTab: ProjectTabs;
