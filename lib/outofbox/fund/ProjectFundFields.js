"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectFund = exports.ProjectFundFields = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../common/abstract");
class ProjectFundFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        /**
         * 选择列表中第一个fund到selected fund list中
         * @param fundName 资金名称
         * @returns
         */
        this.addFundToSelectedList = (fundName) => {
            return core_1.Task.where(`#actor select fund: ${fundName} to selected fund list `, core_1.Check.whether(this.unselectedFundList(fundName).first(), (0, web_1.isVisible)()).andIfSo(web_1.Click.on(this.unselectedFundList(fundName).first()), web_1.Click.on(this.addFundIcon()), core_1.Wait.for(core_1.Duration.ofSeconds(5))).otherwise(core_1.Check.whether(this.selectedFundList(fundName).first(), (0, web_1.isVisible)()).andIfSo(core_1.Log.the(`fund ${fundName} already selected`)).otherwise(core_1.Log.the(`fund ${fundName} not exist`))));
        };
        /**
         * 搜索目标fund
         * @param fundName 资金名称
         * @returns
         */
        this.searchFund = (fundName) => {
            return core_1.Task.where(`#actor search fund: ${fundName}`, web_1.Enter.theValue(fundName).into(this.searchFundInputField()), web_1.Click.on(this.searchFundIcon()), core_1.Wait.for(core_1.Duration.ofSeconds(3)));
        };
        this.searchFundInputField = () => web_1.PageElement.located(web_1.By.id('ctl00_body_txtSearchUnSelectedFund'))
            .describedAs('search fund input field');
        this.searchFundIcon = () => web_1.PageElement.located(web_1.By.id('ctl00_body_btnSearchUnSelectedFund'))
            .describedAs('search fund icon');
        this.unselectedFundList = (fundName) => web_1.PageElements.located(web_1.By.cssContainingText('#ctl00_body_sltUnSelectedFunds option', fundName))
            .describedAs(`unselected funds list: ${fundName}`);
        this.selectedFundList = (fundName) => web_1.PageElements.located(web_1.By.cssContainingText('#ctl00_body_sltSelectedFunds option', fundName))
            .describedAs(`selected funds list: ${fundName}`);
        this.addFundIcon = () => web_1.PageElement.located(web_1.By.id('ctl00_body_imgbtnFundAdd'))
            .describedAs('add fund icon');
    }
}
exports.ProjectFundFields = ProjectFundFields;
exports.projectFund = new ProjectFundFields(new Map());
//# sourceMappingURL=ProjectFundFields.js.map