"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCSO = exports.checkCSOInfo = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const web_2 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const components_1 = require("./components");
exports.checkCSOInfo = {
    using: (CSOInfo) => {
        return core_1.Task.where(`#actor checks Others-Contractor Submittal information`, components_1.cso.checkReadOnlyLabelValue('Category', CSOInfo.rowsHash().Category, DefaultStaticParams_1.SUCCEEDED), assertions_1.Ensure.eventually(web_2.Text.of(components_1.cso.lookupInputFieldSingleValue('Primary Project')), (0, assertions_1.includes)(CSOInfo.rowsHash().PrimaryProject)), assertions_1.Ensure.eventually(web_2.Text.of(components_1.cso.lookupInputFieldSingleValue('Primary Contract')), (0, assertions_1.includes)(CSOInfo.rowsHash().PrimaryContract)), components_1.cso.checkTextInputFieldValue('ID', web_1.Cookie.called(statics_1.COOKIE_CSO_ID).value(), DefaultStaticParams_1.SUCCEEDED), components_1.cso.checkTextInputFieldValue('Title', web_1.Cookie.called(statics_1.COOKIE_CSO_TITLE).value(), DefaultStaticParams_1.SUCCEEDED), components_1.cso.checkDateInputFieldValue('Date Reported', CSOInfo.rowsHash().DateReported, DefaultStaticParams_1.SUCCEEDED));
    }
};
const deleteCSO = () => {
    return core_1.Task.where(`#actor deletes Others-Contractor Submittal information`, common_1.clickActionButton.using(DefaultStaticParams_1.DELETE), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
};
exports.deleteCSO = deleteCSO;
//# sourceMappingURL=EditCSO.js.map