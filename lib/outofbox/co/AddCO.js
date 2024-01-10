"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillCORequiredFields = exports.addChangeOrder = void 0;
const core_1 = require("@serenity-js/core");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const components_1 = require("./components");
exports.addChangeOrder = {
    using: (changeOrderInfo) => {
        return core_1.Task.where(`#actor add change order`, exports.fillCORequiredFields.using(changeOrderInfo), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.fillCORequiredFields = {
    using: (changeOrderInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor fill change order required fields`, components_1.CO.selectItemInlookupPopup('Primary Project', changeOrderInfo.rowsHash().PrimaryProject, 'Project Name'), components_1.CO.selectItemInlookupPopup('Primary Contract', changeOrderInfo.rowsHash().PrimaryContract, 'Contract Name'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), components_1.CO.selectSpecialDate('Issue Date', changeOrderInfo.rowsHash().IssueDate, 0), components_1.CO.selectItemInlookupPopup('Contractor', changeOrderInfo.rowsHash().Contractor, 'Vendor ID'), components_1.CO.fillTextInputField('Subject', changeOrderInfo.rowsHash().Subject + timestamp), components_1.CO.setCookie(statics_1.COOKIE_CO_SUBJECT_NAME, changeOrderInfo.rowsHash().Subject + timestamp));
    }
};
//# sourceMappingURL=AddCO.js.map