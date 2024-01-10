"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCSP = exports.checkCSPInfo = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const web_2 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const components_1 = require("./components");
exports.checkCSPInfo = {
    using: (CSPInfo) => {
        return core_1.Task.where(`#actor checks safety plan information`, components_1.csp.checkReadOnlyLabelValue('Category', CSPInfo.rowsHash().Category, DefaultStaticParams_1.SUCCEEDED), assertions_1.Ensure.eventually(web_2.Text.of(components_1.csp.lookupInputFieldSingleValue('Primary Project')), (0, assertions_1.includes)(CSPInfo.rowsHash().PrimaryProject)), assertions_1.Ensure.eventually(web_2.Text.of(components_1.csp.lookupInputFieldSingleValue('Primary Contract')), (0, assertions_1.includes)(CSPInfo.rowsHash().PrimaryContract)), components_1.csp.checkTextInputFieldValue('ID', web_1.Cookie.called(statics_1.COOKIE_CSP_ID).value(), DefaultStaticParams_1.SUCCEEDED), components_1.csp.checkTextInputFieldValue('Title', web_1.Cookie.called(statics_1.COOKIE_CSP_TITLE).value(), DefaultStaticParams_1.SUCCEEDED), components_1.csp.checkDateInputFieldValue('Date Reported', CSPInfo.rowsHash().DateReported, DefaultStaticParams_1.SUCCEEDED));
    }
};
const deleteCSP = () => {
    return core_1.Task.where(`#actor deletes safety plan information`, common_1.clickActionButton.using(DefaultStaticParams_1.DELETE), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
};
exports.deleteCSP = deleteCSP;
//# sourceMappingURL=EditCSP.js.map