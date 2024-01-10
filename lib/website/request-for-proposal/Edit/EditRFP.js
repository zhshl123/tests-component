"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RFPGeneralInfo = exports.deleteRFP = exports.clickRFPTab = void 0;
/* eslint-disable unicorn/filename-case */
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
const common_1 = require("../../common");
exports.clickRFPTab = {
    using: (tabName) => core_1.Task.where(`#actor click rfp tab: ${tabName}`, web_1.Click.on(RFPGeneralInfo.rfpTab(tabName)))
};
const deleteRFP = () => core_1.Task.where('#actor check RFP general information', common_1.clickButton.using(DefaultStaticParams_1.DELETE), core_1.Wait.for(core_1.Duration.ofSeconds(5)), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
exports.deleteRFP = deleteRFP;
/**
 * Edit RFP 的General 组件
 */
class RFPGeneralInfo {
}
exports.RFPGeneralInfo = RFPGeneralInfo;
_a = RFPGeneralInfo;
RFPGeneralInfo.rfpTabPanel = () => web_1.PageElement.located(web_1.By.id('ctl00_cipTabs_UcGeneralTabs_divTab'))
    .describedAs('RFP tab panel');
RFPGeneralInfo.rfpTab = (tabName) => web_1.PageElement.located(web_1.By.cssContainingText('a', tabName))
    .of(_a.rfpTabPanel())
    .describedAs('RFP tab:' + tabName);
RFPGeneralInfo.rfpgeneralTab = () => web_1.PageElement.located(web_1.By.css(`[tabid="1"]`))
    .of(_a.rfpTabPanel())
    .describedAs('RFP General tab');
//# sourceMappingURL=EditRFP.js.map