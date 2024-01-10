"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filteringPhaseTab = exports.FilteringTab = void 0;
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../common/abstract");
class FilteringTab extends abstract_1.PageTabs {
    constructor(entityMap) {
        super(entityMap);
        /**
         * 左侧tab的面板(子类可重写此方法)
         * @param entityName entity name
         * @returns
         */
        this.tabPanel = () => web_1.PageElement.located(web_1.By.id('ctl00_cipTabs_UcFilteringTabs_divTab'))
            .describedAs('tab panel');
    }
}
exports.FilteringTab = FilteringTab;
const filterPhaseTabMap = new Map();
filterPhaseTabMap.set('Step 2: Select and Adjust Projects', 2);
filterPhaseTabMap.set('Step 3: Filtering Result', 3);
exports.filteringPhaseTab = new FilteringTab(filterPhaseTabMap);
//# sourceMappingURL=FilteringTab.js.map