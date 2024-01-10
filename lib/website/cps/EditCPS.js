"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCPS = exports.checkCPSInfo = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const components_1 = require("./components");
exports.checkCPSInfo = {
    using: (CPSInfo) => {
        return core_1.Task.where(`#actor checks product submittal information`, components_1.cps.checkDropdownInputFieldValue('Category', CPSInfo.rowsHash().Category, DefaultStaticParams_1.SUCCEEDED), assertions_1.Ensure.eventually(web_1.Text.of(components_1.cps.lookupInputFieldSingleValue('Primary Project')), (0, assertions_1.includes)(CPSInfo.rowsHash().PrimaryProject)), assertions_1.Ensure.eventually(web_1.Text.of(components_1.cps.lookupInputFieldSingleValue('Primary Contract')), (0, assertions_1.includes)(CPSInfo.rowsHash().PrimaryContract)), components_1.cps.checkTextInputFieldValue('ID', web_1.Cookie.called(statics_1.COOKIE_CPS_ID).value(), DefaultStaticParams_1.SUCCEEDED), components_1.cps.checkTextInputFieldValue('Title', web_1.Cookie.called(statics_1.COOKIE_CPS_TITLE).value(), DefaultStaticParams_1.SUCCEEDED), components_1.cps.checkDateInputFieldValue('Date Reported', CPSInfo.rowsHash().DateReported, DefaultStaticParams_1.SUCCEEDED));
    }
};
const deleteCPS = () => {
    return core_1.Task.where(`#actor deletes product submittal information`, common_1.clickActionButton.using(DefaultStaticParams_1.DELETE), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
};
exports.deleteCPS = deleteCPS;
//# sourceMappingURL=EditCPS.js.map