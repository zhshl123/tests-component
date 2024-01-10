"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRFI = exports.editRFI = exports.addRFI = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const EditRFI_1 = require("./EditRFI");
exports.addRFI = {
    using: (RFIInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor Input all fields and save `, EditRFI_1.RFI.selectDropdownItem('Category', RFIInfo.rowsHash().Category), EditRFI_1.RFI.selectItemInlookupPopup('Primary Project', RFIInfo.rowsHash().PrimaryProject, 'Project Name'), EditRFI_1.RFI.selectItemInlookupPopup('Primary Contract', RFIInfo.rowsHash().PrimaryContract, 'Contract Name'), EditRFI_1.RFI.fillTextInputField('Title', RFIInfo.rowsHash().Title + timestamp), EditRFI_1.RFI.setCookie(statics_1.COOKIE_RFI_ID, RFIInfo.rowsHash().Title + timestamp), EditRFI_1.RFI.fillTextInputField('Submittal ID', RFIInfo.rowsHash().SubmittalID + timestamp), common_1.clickButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.editRFI = {
    using: (RFIInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor edit all fields and save `, EditRFI_1.RFI.selectItemInlookupPopup('Primary Project', RFIInfo.rowsHash().PrimaryProject, 'Project Name'), EditRFI_1.RFI.selectItemInlookupPopup('Primary Contract', RFIInfo.rowsHash().PrimaryContract, 'Contract Name'), EditRFI_1.RFI.fillTextInputField('Title', RFIInfo.rowsHash().Title + timestamp), EditRFI_1.RFI.setCookie(statics_1.COOKIE_RFI_ID, RFIInfo.rowsHash().Title + timestamp), EditRFI_1.RFI.selectSpecialDate('Date Reported', RFIInfo.rowsHash().DateReported, 0), common_1.clickButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.checkRFI = {
    using: (RFIInfo) => {
        return core_1.Task.where(`#actor check fields`, EditRFI_1.RFI.checkTextInputFieldValue('Title', web_1.Cookie.called(statics_1.COOKIE_RFI_ID).value(), DefaultStaticParams_1.SUCCEEDED), EditRFI_1.RFI.checkDateInputFieldValue('Date Reported', RFIInfo.rowsHash().DateReported, DefaultStaticParams_1.SUCCEEDED));
    }
};
//# sourceMappingURL=RFICrud.js.map