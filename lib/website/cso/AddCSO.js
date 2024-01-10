"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillCSORequiredFields = exports.addODS = exports.addCSO = void 0;
const core_1 = require("@serenity-js/core");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const components_1 = require("./components");
exports.addCSO = {
    using: (CSOInfo) => {
        return core_1.Task.where(`#actor adds Others-Contractor Submittal information`, 
        // 填入必填字段
        exports.fillCSORequiredFields.using(CSOInfo), 
        // 提交
        common_1.clickButton.using('Save & Continue'), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.addODS = {
    using: (ODSInfo) => {
        return core_1.Task.where(`#actor adds Other-Designer Submittal information`, 
        // 填入必填字段
        exports.fillCSORequiredFields.using(ODSInfo), 
        // 提交
        common_1.clickButton.using('Save & Continue'), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.fillCSORequiredFields = {
    using: (CSOInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor fills Other-Designer Submittal required fields`, 
        // 填入必填字段
        components_1.cso.selectDropdownItem('Category', CSOInfo.rowsHash().Category), components_1.cso.selectItemInlookupPopup('Primary Project', CSOInfo.rowsHash().PrimaryProject, 'Project Name'), components_1.cso.selectItemInlookupPopup('Primary Contract', CSOInfo.rowsHash().PrimaryContract, 'Contract Name'), components_1.cso.fillTextInputField('ID', CSOInfo.rowsHash().ID + timestamp), components_1.cso.setCookie(statics_1.COOKIE_CSO_ID, CSOInfo.rowsHash().ID + timestamp), components_1.cso.fillTextInputField('Title', CSOInfo.rowsHash().Title + timestamp), components_1.cso.setCookie(statics_1.COOKIE_CSO_TITLE, CSOInfo.rowsHash().Title + timestamp), components_1.cso.selectSpecialDate('Date Reported', CSOInfo.rowsHash().DateReported, 0));
    }
};
//# sourceMappingURL=AddCSO.js.map