"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCO = exports.checkCOGeneralInfo = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const components_1 = require("./components");
exports.checkCOGeneralInfo = {
    using: (changeOrderInfo) => {
        return core_1.Task.where(`#actor check change order general information`, assertions_1.Ensure.eventually(web_1.Text.of(components_1.CO.readOnlyFieldLink('Primary Project')), (0, assertions_1.includes)(changeOrderInfo.rowsHash().PrimaryProject)), assertions_1.Ensure.eventually(web_1.Text.of(components_1.CO.readOnlyFieldLink('Primary Contract')), (0, assertions_1.includes)(changeOrderInfo.rowsHash().PrimaryContract)), components_1.CO.checkReadOnlyFieldLinkValue('Contractor', changeOrderInfo.rowsHash().Contractor, DefaultStaticParams_1.SUCCEEDED), assertions_1.Ensure.eventually(web_1.Attribute.called('value').of(components_1.CO.dateInputField('Issue Date')), (0, assertions_1.equals)(changeOrderInfo.rowsHash().IssueDate)), assertions_1.Ensure.eventually(web_1.Attribute.called('value').of(components_1.CO.textInputField('Subject')), (0, assertions_1.equals)(web_1.Cookie.called(statics_1.COOKIE_CO_SUBJECT_NAME).value())));
    }
};
const deleteCO = () => core_1.Task.where(`#actor add change order`, common_1.clickButton.using(DefaultStaticParams_1.DELETE), (0, common_1.waitMessagePopupBoxVisible)(), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
exports.deleteCO = deleteCO;
//# sourceMappingURL=COGeneralInfo.js.map