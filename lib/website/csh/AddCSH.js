"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillCSHRequiredFields = exports.addCSH = void 0;
const core_1 = require("@serenity-js/core");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const components_1 = require("./components");
exports.addCSH = {
    using: (CSHInfo) => {
        return core_1.Task.where(`#actor adds construction schedule information`, 
        // 填入必填字段
        exports.fillCSHRequiredFields.using(CSHInfo), 
        // 提交
        common_1.clickButton.using('Save & Continue'), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.fillCSHRequiredFields = {
    using: (CSHInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor fills construction schedule required fields`, 
        // 填入必填字段
        components_1.csh.selectDropdownItem('Category', CSHInfo.rowsHash().Category), components_1.csh.selectItemInlookupPopup('Primary Project', CSHInfo.rowsHash().PrimaryProject, 'Project Name'), components_1.csh.selectItemInlookupPopup('Primary Contract', CSHInfo.rowsHash().PrimaryContract, 'Contract Name'), components_1.csh.fillTextInputField('ID', CSHInfo.rowsHash().ID + timestamp), components_1.csh.setCookie(statics_1.COOKIE_CSH_ID, CSHInfo.rowsHash().ID + timestamp), components_1.csh.fillTextInputField('Title', CSHInfo.rowsHash().Title + timestamp), components_1.csh.setCookie(statics_1.COOKIE_CSH_TITLE, CSHInfo.rowsHash().Title + timestamp), components_1.csh.selectSpecialDate('Date Reported', CSHInfo.rowsHash().DateReported, 0));
    }
};
//# sourceMappingURL=AddCSH.js.map