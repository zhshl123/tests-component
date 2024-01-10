"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillCSPRequiredFields = exports.addCSP = void 0;
const core_1 = require("@serenity-js/core");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const components_1 = require("./components");
exports.addCSP = {
    using: (CSPInfo) => {
        return core_1.Task.where(`#actor adds safety paln information`, 
        // 填入必填字段
        exports.fillCSPRequiredFields.using(CSPInfo), 
        // 提交
        common_1.clickButton.using('Save & Continue'), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.fillCSPRequiredFields = {
    using: (CSPInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor fills safety paln required fields`, 
        // 填入必填字段
        components_1.csp.selectDropdownItem('Category', CSPInfo.rowsHash().Category), components_1.csp.selectItemInlookupPopup('Primary Project', CSPInfo.rowsHash().PrimaryProject, 'Project Name'), components_1.csp.selectItemInlookupPopup('Primary Contract', CSPInfo.rowsHash().PrimaryContract, 'Contract Name'), components_1.csp.fillTextInputField('ID', CSPInfo.rowsHash().ID + timestamp), components_1.csp.setCookie(statics_1.COOKIE_CSP_ID, CSPInfo.rowsHash().ID + timestamp), components_1.csp.fillTextInputField('Title', CSPInfo.rowsHash().Title + timestamp), components_1.csp.setCookie(statics_1.COOKIE_CSP_TITLE, CSPInfo.rowsHash().Title + timestamp), components_1.csp.selectSpecialDate('Date Reported', CSPInfo.rowsHash().DateReported, 0));
    }
};
//# sourceMappingURL=AddCSP.js.map