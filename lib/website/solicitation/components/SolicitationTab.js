"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solicitationTab = exports.SolicitationTabs = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../../common/abstract");
class SolicitationTabs extends abstract_1.PageTabs {
    constructor(entityMap) {
        super(entityMap);
        this.clickSolicitationTab = (tabName) => {
            return core_1.Task.where(`#actor click tab: ${tabName}`, web_1.Click.on(this.tabByTabId(tabName)));
        };
        this.clickRankingPhaseTab = (tabName) => {
            return core_1.Task.where(`#actor click tab: ${tabName}`, web_1.Click.on(this.tab(tabName)));
        };
        /**
         * 指定的tab
         * @param entityName entity name
         * @param tabName tab的名称
         * @returns
         */
        this.tab = (tabName) => web_1.PageElement.located(web_1.By.cssContainingText('a', tabName))
            .of(this.tabPanel())
            .describedAs('tab:' + tabName);
    }
}
exports.SolicitationTabs = SolicitationTabs;
const solicitationTabMap = new Map();
solicitationTabMap.set('Questions', '2');
solicitationTabMap.set('Bidders', '5');
solicitationTabMap.set('Responses', '11');
solicitationTabMap.set('Evaluators', '12');
solicitationTabMap.set('Quotes', '3');
solicitationTabMap.set('RankingPhases', '50');
exports.solicitationTab = new SolicitationTabs(solicitationTabMap);
//# sourceMappingURL=SolicitationTab.js.map