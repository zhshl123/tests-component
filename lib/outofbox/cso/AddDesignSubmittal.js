"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDesignSubmittal = void 0;
const core_1 = require("@serenity-js/core");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const components_1 = require("./components");
exports.addDesignSubmittal = {
    using: (designSubmittalInfo) => {
        return core_1.Task.where(`#actor adds Design Submittal information`, 
        // 填入必填字段
        fillRequiredFields.using(designSubmittalInfo), 
        // 提交
        common_1.clickButton.using('Save & Continue'), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
const fillRequiredFields = {
    using: (designSubmittalInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor fills Design Submittal required fields`, 
        // 填入必填字段
        components_1.designSubmittal.selectItemInlookupPopup('Primary Project', designSubmittalInfo.rowsHash().PrimaryProject, 'Project Name'), core_1.Wait.for(core_1.Duration.ofSeconds(3)), components_1.designSubmittal.selectItemInlookupPopup('Primary Contract', designSubmittalInfo.rowsHash().PrimaryContract, 'Contract Name'), core_1.Wait.for(core_1.Duration.ofSeconds(3)), components_1.designSubmittal.fillTextInputField('Submittal ID', designSubmittalInfo.rowsHash().ID + timestamp), components_1.designSubmittal.setCookie(statics_1.COOKIE_DESIGN_SUBMITTAL_ID, designSubmittalInfo.rowsHash().ID + timestamp), components_1.designSubmittal.fillTextInputField('Title', designSubmittalInfo.rowsHash().Title + timestamp), components_1.designSubmittal.setCookie(statics_1.COOKIE_DESIGN_SUBMITTAL_TITLE, designSubmittalInfo.rowsHash().Title + timestamp), components_1.designSubmittal.selectSpecialDate('Date Reported', designSubmittalInfo.rowsHash().DateReported, 0));
    }
};
//# sourceMappingURL=AddDesignSubmittal.js.map