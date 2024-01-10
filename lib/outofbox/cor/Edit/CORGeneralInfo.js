"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CORGeneralInfo = exports.deleteCOR = exports.clickCORTab = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
const common_1 = require("../../common");
exports.clickCORTab = {
    using: (tabName) => core_1.Task.where(`#actor click cor tab: ${tabName}`, web_1.Click.on(CORGeneralInfo.corTab(tabName)))
};
const deleteCOR = () => core_1.Task.where('#actor check cor general information', common_1.clickButton.using(DefaultStaticParams_1.DELETE), core_1.Wait.for(core_1.Duration.ofSeconds(5)), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
exports.deleteCOR = deleteCOR;
/**
 * Edit cor 的General 组件
 */
class CORGeneralInfo {
}
exports.CORGeneralInfo = CORGeneralInfo;
_a = CORGeneralInfo;
CORGeneralInfo.corTabPanel = () => web_1.PageElement.located(web_1.By.id('ctl00_cipTabs_UcGeneralTabs_divTab'))
    .describedAs('COR tab panel');
CORGeneralInfo.corTab = (tabName) => web_1.PageElement.located(web_1.By.cssContainingText('a', tabName))
    .of(_a.corTabPanel())
    .describedAs('COR tab:' + tabName);
CORGeneralInfo.conrgeneralTab = () => web_1.PageElement.located(web_1.By.css(`[tabid="1"]`))
    .of(_a.corTabPanel())
    .describedAs('COR General tab');
//# sourceMappingURL=CORGeneralInfo.js.map