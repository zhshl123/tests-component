"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRFI = exports.editRFI = exports.addRFI = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const EditRFI_1 = require("./EditRFI");
exports.addRFI = {
    using: (RFIInfo) => {
        return core_1.Task.where(`#actor Input all fields and save `, EditRFI_1.RFI.selectItemInlookupPopup('Primary Project', RFIInfo.rowsHash().PrimaryProject, 'Project Name'), EditRFI_1.RFI.selectItemInlookupPopup('Primary Contract', RFIInfo.rowsHash().PrimaryContract, 'Contract Name'), EditRFI_1.RFI.fillTextInputField('Title', RFIInfo.rowsHash().Title), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.editRFI = {
    using: (RFIInfo) => {
        return core_1.Task.where(`#actor edit all fields and save `, EditRFI_1.RFI.setCookie(statics_1.COOKIE_RFI_ID, web_1.Attribute.called('value').of(EditRFI_1.RFI.textInputField('ID'))), EditRFI_1.RFI.selectItemInlookupPopup('Primary Project', RFIInfo.rowsHash().PrimaryProject, 'Project Name'), EditRFI_1.RFI.selectItemInlookupPopup('Primary Contract', RFIInfo.rowsHash().PrimaryContract, 'Contract Name'), EditRFI_1.RFI.fillTextInputField('Title', RFIInfo.rowsHash().Title), EditRFI_1.RFI.selectSpecialDate('Date Reported', RFIInfo.rowsHash().DateReported, 0), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.checkRFI = {
    using: (RFIInfo) => {
        return core_1.Task.where(`#actor check fields`, assertions_1.Ensure.eventually(web_1.Text.of(EditRFI_1.RFI.lookupInputFieldSingleValue('Primary Project')), (0, assertions_1.includes)(RFIInfo.rowsHash().PrimaryProject)), assertions_1.Ensure.eventually(web_1.Text.of(EditRFI_1.RFI.lookupInputFieldSingleValue('Primary Contract')), (0, assertions_1.includes)(RFIInfo.rowsHash().PrimaryContract)), EditRFI_1.RFI.checkTextInputFieldValue('Title', RFIInfo.rowsHash().Title, DefaultStaticParams_1.SUCCEEDED), EditRFI_1.RFI.checkDateInputFieldValue('Date Reported', RFIInfo.rowsHash().DateReported, DefaultStaticParams_1.SUCCEEDED));
    }
};
//# sourceMappingURL=RFICrud.js.map