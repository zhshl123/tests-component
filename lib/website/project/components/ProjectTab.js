"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectTab = exports.ProjectTabs = void 0;
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../../common/abstract");
class ProjectTabs extends abstract_1.PageTabs {
    constructor(entityMap) {
        super(entityMap);
        /**
         * 左侧tab的面板
         * @param entityName entity name
         * @returns
         */
        this.tabPanel = () => web_1.PageElement.located(web_1.By.id('ctl00_cipTabs_LocationTab_tabWrapper'))
            .describedAs('tab panel');
    }
}
exports.ProjectTabs = ProjectTabs;
exports.projectTab = new ProjectTabs(new Map());
//# sourceMappingURL=ProjectTab.js.map