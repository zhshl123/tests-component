"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFiltering = exports.checkFiltering = exports.editFiltering = exports.addFiltering = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const EditFitleringFields_1 = require("../../outofbox/Filtering/EditFitleringFields");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
exports.addFiltering = {
    using: (filteringInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor Input all fields and save `, EditFitleringFields_1.filteringPhase.fillTextInputField('Filtering Phase Name', filteringInfo.rowsHash().FilteringPhaseName + timestamp), EditFitleringFields_1.filteringPhase.setCookie(statics_1.COOKIE_FILTERING_NAME, filteringInfo.rowsHash().FilteringPhaseName + timestamp), EditFitleringFields_1.filteringPhase.selectDropdownItem('Source Filtering Phase', filteringInfo.rowsHash().SourceFilteringPhase), EditFitleringFields_1.filteringPhase.clickSingleCheckBox('Is Working Filtering Phase', filteringInfo.rowsHash().IsWorkingFilteringPhase), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.editFiltering = {
    using: (filteringInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor Input all fields and save `, EditFitleringFields_1.filteringPhase.fillTextInputField('Filtering Phase Name', filteringInfo.rowsHash().FilteringPhaseName + timestamp), EditFitleringFields_1.filteringPhase.setCookie(statics_1.COOKIE_FILTERING_NAME, filteringInfo.rowsHash().FilteringPhaseName + timestamp), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.checkFiltering = {
    using: (Result) => {
        return core_1.Task.where(`#actor checks value `, EditFitleringFields_1.filteringPhase.checkTextInputFieldValue('Filtering Phase Name', web_1.Cookie.called(statics_1.COOKIE_FILTERING_NAME).value(), Result));
    }
};
exports.deleteFiltering = {
    using: () => {
        return core_1.Task.where(`#actor delete filtering `, common_1.clickButton.using(DefaultStaticParams_1.DELETE), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK));
    }
};
//# sourceMappingURL=FilteringCurd.js.map