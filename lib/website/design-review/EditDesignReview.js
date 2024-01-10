"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDesignReview = exports.checkDesignReviewInfo = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const web_2 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const components_1 = require("./components");
exports.checkDesignReviewInfo = {
    using: (designReviewInfo) => {
        return core_1.Task.where(`#actor checks design review information`, components_1.designReview.checkReadOnlyLabelValue('Category', designReviewInfo.rowsHash().Category, DefaultStaticParams_1.SUCCEEDED), assertions_1.Ensure.eventually(web_2.Text.of(components_1.designReview.lookupInputFieldSingleValue('Primary Project')), (0, assertions_1.includes)(designReviewInfo.rowsHash().PrimaryProject)), assertions_1.Ensure.eventually(web_2.Text.of(components_1.designReview.lookupInputFieldSingleValue('Primary Contract')), (0, assertions_1.includes)(designReviewInfo.rowsHash().PrimaryContract)), components_1.designReview.checkTextInputFieldValue('ID', web_1.Cookie.called(statics_1.COOKIE_DRV_ID).value(), DefaultStaticParams_1.SUCCEEDED), components_1.designReview.checkTextInputFieldValue('Title', web_1.Cookie.called(statics_1.COOKIE_DRV_TITLE).value(), DefaultStaticParams_1.SUCCEEDED), components_1.designReview.checkDateInputFieldValue('Date Reported', designReviewInfo.rowsHash().DateReported, DefaultStaticParams_1.SUCCEEDED));
    }
};
const deleteDesignReview = () => {
    return core_1.Task.where(`#actor deletes design review information`, common_1.clickActionButton.using(DefaultStaticParams_1.DELETE), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
};
exports.deleteDesignReview = deleteDesignReview;
//# sourceMappingURL=EditDesignReview.js.map