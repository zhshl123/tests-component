"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scopingTemplateTab = exports.ScopingTab = void 0;
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../common/abstract");
class ScopingTab extends abstract_1.PageTabs {
    constructor(entityMap) {
        super(entityMap);
        /**
         * 左侧tab的面板(子类可重写此方法)
         * @param entityName entity name
         * @returns
         */
        this.tabPanel = () => web_1.PageElement.located(web_1.By.id('ctl00_cipTabs_divTab'))
            .describedAs('tab panel');
    }
}
exports.ScopingTab = ScopingTab;
exports.scopingTemplateTab = new ScopingTab(new Map());
//# sourceMappingURL=ScopingTab.js.map