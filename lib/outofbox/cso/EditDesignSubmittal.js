"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDesignSubmittal = exports.checkDesignSubmittalInfo = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const web_2 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const components_1 = require("./components");
exports.checkDesignSubmittalInfo = {
    using: (designSubmittalInfo) => {
        return core_1.Task.where(`#actor checks Others-Contractor Submittal information`, assertions_1.Ensure.eventually(web_2.Text.of(components_1.designSubmittal.lookupInputFieldSingleValue('Primary Project')), (0, assertions_1.includes)(designSubmittalInfo.rowsHash().PrimaryProject)), assertions_1.Ensure.eventually(web_2.Text.of(components_1.designSubmittal.lookupInputFieldSingleValue('Primary Contract')), (0, assertions_1.includes)(designSubmittalInfo.rowsHash().PrimaryContract)), components_1.designSubmittal.checkTextInputFieldValue('Submittal ID', web_1.Cookie.called(statics_1.COOKIE_DESIGN_SUBMITTAL_ID).value(), DefaultStaticParams_1.SUCCEEDED), components_1.designSubmittal.checkTextInputFieldValue('Title', web_1.Cookie.called(statics_1.COOKIE_DESIGN_SUBMITTAL_TITLE).value(), DefaultStaticParams_1.SUCCEEDED), components_1.designSubmittal.checkDateInputFieldValue('Date Reported', designSubmittalInfo.rowsHash().DateReported, DefaultStaticParams_1.SUCCEEDED));
    }
};
const deleteDesignSubmittal = () => {
    return core_1.Task.where(`#actor deletes Others-Contractor Submittal information`, common_1.clickActionButton.using(DefaultStaticParams_1.DELETE), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
};
exports.deleteDesignSubmittal = deleteDesignSubmittal;
//# sourceMappingURL=EditDesignSubmittal.js.map