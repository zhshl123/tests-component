"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSA = exports.editSA = exports.addSA = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const EditSA_1 = require("./EditSA");
exports.addSA = {
    using: (SAInfo) => {
        return core_1.Task.where(`#actor Input all fields and save `, EditSA_1.SA.setCookie(statics_1.COOKIE_SA_ID, web_1.Attribute.called('value').of(EditSA_1.SA.textInputField('ID'))), EditSA_1.SA.selectItemInlookupPopup('Primary Project', SAInfo.rowsHash().PrimaryProject, 'Project Name'), EditSA_1.SA.selectItemInlookupPopup('Primary Contract', SAInfo.rowsHash().PrimaryContract, 'Contract Name'), EditSA_1.SA.fillTextInputField('Title', SAInfo.rowsHash().Title), common_1.clickButton.using(DefaultStaticParams_1.SAVE_CONTINUE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.editSA = {
    using: (SAInfo) => {
        return core_1.Task.where(`#actor edit all fields and save `, EditSA_1.SA.selectItemInlookupPopup('Primary Project', SAInfo.rowsHash().PrimaryProject, 'Project Name'), EditSA_1.SA.selectItemInlookupPopup('Primary Contract', SAInfo.rowsHash().PrimaryContract, 'Contract Name'), EditSA_1.SA.fillTextInputField('Title', SAInfo.rowsHash().Title), EditSA_1.SA.selectSpecialDate('Date Reported', SAInfo.rowsHash().DateReported, 0), common_1.clickButton.using(DefaultStaticParams_1.SAVE_CONTINUE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.checkSA = {
    using: (SAInfo) => {
        return core_1.Task.where(`#actor check fields`, EditSA_1.SA.checkTextInputFieldValue('Title', SAInfo.rowsHash().Title, DefaultStaticParams_1.SUCCEEDED), EditSA_1.SA.checkDateInputFieldValue('Date Reported', SAInfo.rowsHash().DateReported, DefaultStaticParams_1.SUCCEEDED));
    }
};
//# sourceMappingURL=SACrud.js.map