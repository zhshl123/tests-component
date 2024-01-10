"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageTabs = exports.PageTabs = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
class PageTabs {
    constructor() {
        /**
         * 点击tab
         * @param tabName tab名称
         * @returns
         */
        this.clickTab = (tabName) => core_1.Task.where(`#actor click tab ${tabName}`, web_1.Click.on(this.targetTab(tabName)), core_1.Wait.for(core_1.Duration.ofSeconds(3)));
        this.tabListBox = () => web_1.PageElement.located(web_1.By.css('.ng-star-inserted.c-tab'))
            .describedAs('tab list box');
        this.targetTab = (tabName) => web_1.PageElement.located(web_1.By.cssContainingText('.c-tab__item span', tabName))
            .of(this.tabListBox())
            .describedAs('tab:' + tabName);
    }
}
exports.PageTabs = PageTabs;
exports.pageTabs = new PageTabs();
//# sourceMappingURL=PageTabs.js.map