"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillCpsRequiredFields = exports.addCPS = void 0;
const core_1 = require("@serenity-js/core");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const components_1 = require("./components");
exports.addCPS = {
    using: (CPSInfo) => {
        return core_1.Task.where(`#actor adds product submittal information`, 
        // 填入必填字段
        exports.fillCpsRequiredFields.using(CPSInfo), 
        // 提交
        common_1.clickButton.using('Save & Continue'), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.fillCpsRequiredFields = {
    using: (CPSInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor fills product submittal required fields`, 
        // 填入必填字段
        components_1.cps.selectDropdownItem('Category', CPSInfo.rowsHash().Category), components_1.cps.selectItemInlookupPopup('Primary Project', CPSInfo.rowsHash().PrimaryProject, 'Project Name'), components_1.cps.selectItemInlookupPopup('Primary Contract', CPSInfo.rowsHash().PrimaryContract, 'Contract Name'), components_1.cps.fillTextInputField('ID', CPSInfo.rowsHash().ID + timestamp), components_1.cps.setCookie(statics_1.COOKIE_CPS_ID, CPSInfo.rowsHash().ID + timestamp), components_1.cps.fillTextInputField('Title', CPSInfo.rowsHash().Title + timestamp), components_1.cps.setCookie(statics_1.COOKIE_CPS_TITLE, CPSInfo.rowsHash().Title + timestamp), components_1.cps.selectSpecialDate('Date Reported', CPSInfo.rowsHash().DateReported, 0));
    }
};
//# sourceMappingURL=AddCPS.js.map