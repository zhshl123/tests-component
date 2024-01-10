"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillDesignReviewRequiredFields = exports.addDesignReview = void 0;
const core_1 = require("@serenity-js/core");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const components_1 = require("./components");
exports.addDesignReview = {
    using: (designReviewInfo) => {
        return core_1.Task.where(`#actor adds design review information`, 
        // 填入必填字段
        exports.fillDesignReviewRequiredFields.using(designReviewInfo), 
        // 提交
        common_1.clickButton.using('Save & Continue'), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.fillDesignReviewRequiredFields = {
    using: (designReviewInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor fills design review required fields`, 
        // 填入必填字段
        components_1.designReview.selectDropdownItem('Category', designReviewInfo.rowsHash().Category), components_1.designReview.selectItemInlookupPopup('Primary Project', designReviewInfo.rowsHash().PrimaryProject, 'Project Name'), components_1.designReview.selectItemInlookupPopup('Primary Contract', designReviewInfo.rowsHash().PrimaryContract, 'Contract Name'), components_1.designReview.fillTextInputField('ID', designReviewInfo.rowsHash().ID + timestamp), components_1.designReview.setCookie(statics_1.COOKIE_DRV_ID, designReviewInfo.rowsHash().ID + timestamp), components_1.designReview.fillTextInputField('Title', designReviewInfo.rowsHash().Title + timestamp), components_1.designReview.setCookie(statics_1.COOKIE_DRV_TITLE, designReviewInfo.rowsHash().Title + timestamp), components_1.designReview.selectSpecialDate('Date Reported', designReviewInfo.rowsHash().DateReported, 0));
    }
};
//# sourceMappingURL=AddDesignReview.js.map