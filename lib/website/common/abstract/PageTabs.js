"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageTabs = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
class PageTabs {
    constructor(entityMap) {
        /**
         * 点击tab
         * @param entityName entity名称
         * @param tabName tab名称
         * @returns
         */
        this.clickTab = (tabName) => {
            return tabName.includes('Line Items') ? core_1.Task.where(`#actor click tab: ${tabName}`, 
            // Wait.until(this.tabPanel(), isPresent()),
            core_1.Wait.for(core_1.Duration.ofSeconds(5)), web_1.Click.on(this.tabByTabId(tabName))) : core_1.Task.where(`#actor click  tab: ${tabName}`, core_1.Wait.for(core_1.Duration.ofSeconds(5)), 
            // Wait.until(this.tabPanel(), isPresent()),
            web_1.Click.on(this.tab(tabName)));
        };
        /**
         * 左侧tab的面板(子类可重写此方法)
         * @param entityName entity name
         * @returns
         */
        this.tabPanel = () => web_1.PageElement.located(web_1.By.id('cipTabsWrapper'))
            .describedAs('tab panel');
        /**
         * 指定的tab
         * @param entityName entity name
         * @param tabName tab的名称
         * @returns
         */
        this.tab = (tabName) => web_1.PageElement.located(web_1.By.cssContainingText('a', tabName))
            .of(this.tabPanel())
            .describedAs('tab:' + tabName);
        /**
         * tab的id
         * @param entityName entity name
         * @param tabName tab名称
         * @returns
         */
        this.tabByTabId = (tabName) => {
            const tabId = this.entityMap.get(tabName);
            return web_1.PageElement.located(web_1.By.css(`[tabid="${tabId}"]`))
                // .of(this.tabPanel(entityName))
                .describedAs('tab:' + tabId);
        };
        this.entityMap = entityMap;
    }
}
exports.PageTabs = PageTabs;
//# sourceMappingURL=PageTabs.js.map