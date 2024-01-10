"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermit = exports.deletePermit = exports.editPermit = exports.addPermit = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const EditPermit_1 = require("./EditPermit");
exports.addPermit = {
    using: (permitInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor Input all fields and save `, EditPermit_1.permit.fillTextInputField('Permit No.', permitInfo.rowsHash().PermitNo + timestamp), EditPermit_1.permit.setCookie(statics_1.COOKIE_PERMIT_NO, permitInfo.rowsHash().PermitNo + timestamp), EditPermit_1.permit.selectLookupDropdownItem('Category', permitInfo.rowsHash().Category), EditPermit_1.permit.selectLookupDropdownItem('Type', permitInfo.rowsHash().Type), EditPermit_1.permit.fillTextInputField('Applicant Name', permitInfo.rowsHash().ApplicantName), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.editPermit = {
    using: (permitInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor Input all fields and save `, EditPermit_1.permit.fillTextInputField('Permit No.', permitInfo.rowsHash().PermitNo + timestamp), EditPermit_1.permit.setCookie(statics_1.COOKIE_PERMIT_NO, permitInfo.rowsHash().PermitNo + timestamp), EditPermit_1.permit.fillTextInputField('Applicant Name', permitInfo.rowsHash().ApplicantName), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.deletePermit = {
    using: () => {
        return core_1.Task.where(`#actor click Delete button`, common_1.clickButton.using(DefaultStaticParams_1.DELETE), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK));
    }
};
exports.checkPermit = {
    using: (permitInfo) => {
        return core_1.Task.where(`#actor check fields`, EditPermit_1.permit.checkTextInputFieldValue('Permit No.', web_1.Cookie.called(statics_1.COOKIE_PERMIT_NO).value(), DefaultStaticParams_1.SUCCEEDED), EditPermit_1.permit.checkTextInputFieldValue('Applicant Name', permitInfo.rowsHash().ApplicantName, DefaultStaticParams_1.SUCCEEDED));
    }
};
//# sourceMappingURL=PermitCrud.js.map