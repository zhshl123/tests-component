"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCSH = exports.checkCSHInfo = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const components_1 = require("./components");
exports.checkCSHInfo = {
    using: (CSHInfo) => {
        return core_1.Task.where(`#actor checks construction schedule information`, components_1.csh.checkReadOnlyLabelValue('Category', CSHInfo.rowsHash().Category, DefaultStaticParams_1.SUCCEEDED), assertions_1.Ensure.eventually(web_1.Text.of(components_1.csh.lookupInputFieldSingleValue('Primary Project')), (0, assertions_1.includes)(CSHInfo.rowsHash().PrimaryProject)), assertions_1.Ensure.eventually(web_1.Text.of(components_1.csh.lookupInputFieldSingleValue('Primary Contract')), (0, assertions_1.includes)(CSHInfo.rowsHash().PrimaryContract)), components_1.csh.checkTextInputFieldValue('ID', web_1.Cookie.called(statics_1.COOKIE_CSH_ID).value(), DefaultStaticParams_1.SUCCEEDED), components_1.csh.checkTextInputFieldValue('Title', web_1.Cookie.called(statics_1.COOKIE_CSH_TITLE).value(), DefaultStaticParams_1.SUCCEEDED), components_1.csh.checkDateInputFieldValue('Date Reported', CSHInfo.rowsHash().DateReported, DefaultStaticParams_1.SUCCEEDED));
    }
};
const deleteCSH = () => {
    return core_1.Task.where(`#actor deletes construction schedule information`, common_1.clickActionButton.using(DefaultStaticParams_1.DELETE), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
};
exports.deleteCSH = deleteCSH;
//# sourceMappingURL=EditCSH.js.map