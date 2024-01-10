"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COTab = exports.COPageTabs = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../../common/abstract");
class COPageTabs extends abstract_1.PageTabs {
    constructor(entityMap) {
        super(entityMap);
        /**
         * 点击tab
         * @param entityName entity名称
         * @param tabName tab名称
         * @returns
         */
        this.clickTabById = (tabName) => {
            return core_1.Task.where(`#actor click  tab: ${tabName}`, core_1.Wait.until(this.tabPanel(), (0, assertions_1.isPresent)()), web_1.Click.on(this.tabByTabId(tabName)));
        };
    }
}
exports.COPageTabs = COPageTabs;
const COPageTabMap = new Map();
COPageTabMap.set('Financial Impact', '2');
exports.COTab = new COPageTabs(COPageTabMap);
//# sourceMappingURL=COPageTabs.js.map