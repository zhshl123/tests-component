"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRisk = exports.checkRisk = exports.editRisk = exports.addRisk = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const EditRisk_1 = require("./EditRisk");
exports.addRisk = {
    using: (riskInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor Input all fields and save `, EditRisk_1.risk.fillTextInputField('Risk ID', riskInfo.rowsHash().RiskID + timestamp), EditRisk_1.risk.setCookie(statics_1.COOKIE_RISK_ID, riskInfo.rowsHash().RiskID + timestamp), EditRisk_1.risk.fillTextInputField('Risk Title', riskInfo.rowsHash().RiskTitle), EditRisk_1.risk.selectDropdownItem('Risk Type', riskInfo.rowsHash().RiskType), EditRisk_1.risk.selectDropdownItem('Risk Status', riskInfo.rowsHash().RiskStatus), EditRisk_1.risk.fillNumberInputField('Probability', riskInfo.rowsHash().Probability), EditRisk_1.risk.selectDropdownItem('Impact', riskInfo.rowsHash().Impact), EditRisk_1.risk.selectItemInlookupPopup('Owners', riskInfo.rowsHash().Owners, 'User Login Name'), common_1.clickButton.using(DefaultStaticParams_1.SAVE), EditRisk_1.risk.waitMessagePopupBoxVisible());
    }
};
exports.editRisk = {
    using: (riskInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor Input all fields and save `, EditRisk_1.risk.fillTextInputField('Risk ID', riskInfo.rowsHash().RiskID + timestamp), EditRisk_1.risk.setCookie(statics_1.COOKIE_RISK_ID, riskInfo.rowsHash().RiskID + timestamp), EditRisk_1.risk.fillTextInputField('Risk Title', riskInfo.rowsHash().RiskTitle), EditRisk_1.risk.selectDropdownItem('Risk Type', riskInfo.rowsHash().RiskType), EditRisk_1.risk.selectDropdownItem('Risk Status', riskInfo.rowsHash().RiskStatus), EditRisk_1.risk.fillNumberInputField('Probability', riskInfo.rowsHash().Probability), EditRisk_1.risk.selectDropdownItem('Impact', riskInfo.rowsHash().Impact), EditRisk_1.risk.selectItemInlookupPopup('Owners1', riskInfo.rowsHash().Owners1, 'User Login Name'), common_1.clickButton.using(DefaultStaticParams_1.SAVE), EditRisk_1.risk.waitMessagePopupBoxVisible());
    }
};
exports.checkRisk = {
    using: (riskInfo) => {
        return core_1.Task.where(`#actor check all fields`, core_1.Wait.for(core_1.Duration.ofSeconds(3)), EditRisk_1.risk.checkTextInputFieldValue('Risk ID', web_1.Cookie.called(statics_1.COOKIE_RISK_ID).value(), DefaultStaticParams_1.SUCCEEDED), EditRisk_1.risk.checkTextInputFieldValue('Risk Title', riskInfo.rowsHash().RiskTitle, DefaultStaticParams_1.SUCCEEDED), EditRisk_1.risk.checkDropdownInputFieldValue('Risk Type', riskInfo.rowsHash().RiskType, DefaultStaticParams_1.SUCCEEDED), EditRisk_1.risk.checkDropdownInputFieldValue('Risk Status', riskInfo.rowsHash().RiskStatus, DefaultStaticParams_1.SUCCEEDED), EditRisk_1.risk.checkNumberInputFieldValue('Probability', riskInfo.rowsHash().Probability, DefaultStaticParams_1.SUCCEEDED), EditRisk_1.risk.checkDropdownInputFieldValue('Impact', riskInfo.rowsHash().Impact, DefaultStaticParams_1.SUCCEEDED));
    }
};
exports.deleteRisk = {
    using: () => {
        return core_1.Task.where(`#actor click Delete button`, common_1.clickButton.using(DefaultStaticParams_1.DELETE), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK));
    }
};
//# sourceMappingURL=RiskCrud.js.map