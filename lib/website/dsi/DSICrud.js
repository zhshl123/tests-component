"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDSI = exports.editDSI = exports.addDSI = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const EditDSI_1 = require("./EditDSI");
exports.addDSI = {
    using: (DSIInfo) => {
        return core_1.Task.where(`#actor Input all fields and save `, EditDSI_1.DSI.setCookie(statics_1.COOKIE_DSI_NO, web_1.Attribute.called('value').of(EditDSI_1.DSI.textInputField('DSI No.'))), EditDSI_1.DSI.selectItemInlookupPopup('Primary Project', DSIInfo.rowsHash().PrimaryProject, 'Project Name'), EditDSI_1.DSI.selectItemInlookupPopup('Primary Contract', DSIInfo.rowsHash().PrimaryContract, 'Contract Name'), EditDSI_1.DSI.fillTextInputField('Subject', DSIInfo.rowsHash().Subject), EditDSI_1.DSI.selectItemInlookupPopup('Designer', DSIInfo.rowsHash().Designer, 'Vendor Name'), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.editDSI = {
    using: (DSIInfo) => {
        return core_1.Task.where(`#actor edit all fields and save `, EditDSI_1.DSI.selectItemInlookupPopup('Primary Project', DSIInfo.rowsHash().PrimaryProject, 'Project Name'), EditDSI_1.DSI.selectItemInlookupPopup('Primary Contract', DSIInfo.rowsHash().PrimaryContract, 'Contract Name'), EditDSI_1.DSI.fillTextInputField('Subject', DSIInfo.rowsHash().Subject), EditDSI_1.DSI.selectItemInlookupPopup('Designer', DSIInfo.rowsHash().Designer, 'Vendor Name'), EditDSI_1.DSI.selectSpecialDate('Issuance Date', DSIInfo.rowsHash().IssuanceDate, 0), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.checkDSI = {
    using: (DSIInfo) => {
        return core_1.Task.where(`#actor check fields`, assertions_1.Ensure.eventually(web_1.Text.of(EditDSI_1.DSI.lookupInputFieldSingleValue('Primary Project')), (0, assertions_1.includes)(DSIInfo.rowsHash().PrimaryProject)), assertions_1.Ensure.eventually(web_1.Text.of(EditDSI_1.DSI.lookupInputFieldSingleValue('Primary Contract')), (0, assertions_1.includes)(DSIInfo.rowsHash().PrimaryContract)), EditDSI_1.DSI.checkLookupInputFieldSingleValue('Designer', DSIInfo.rowsHash().Designer, DefaultStaticParams_1.SUCCEEDED), EditDSI_1.DSI.checkTextInputFieldValue('Subject', DSIInfo.rowsHash().Subject, DefaultStaticParams_1.SUCCEEDED), EditDSI_1.DSI.checkDateInputFieldValue('Issuance Date', DSIInfo.rowsHash().IssuanceDate, DefaultStaticParams_1.SUCCEEDED));
    }
};
//# sourceMappingURL=DSICrud.js.map