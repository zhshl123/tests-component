"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editIR = exports.deleteIR = exports.addIR = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const EditIR_1 = require("./EditIR");
exports.addIR = {
    using: (reportName, inspectionType, inspectors, reportStatus, inspectionDate) => {
        const Date = inspectionDate.split(' ')[0];
        const Time = inspectionDate.split(' ')[1] + ' ' + inspectionDate.split(' ')[2];
        return core_1.Task.where(`#actor Input all fields and save `, EditIR_1.IR.fillTextInputField('Report Name', reportName), EditIR_1.IR.selectDropdownItem('Inspection Type', inspectionType), core_1.Wait.for(core_1.Duration.ofSeconds(3)), EditIR_1.IR.selectItemInlookupPopup('Inspectors', inspectors, 'Resource ID'), EditIR_1.IR.selectDropdownItem('Report Status', reportStatus), EditIR_1.IR.selectSpecialDate('Inspection Date', Date, 0), EditIR_1.IR.selectClock('Inspection Date', Time), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.deleteIR = {
    using: () => {
        return core_1.Task.where(`#actor click Delete button`, common_1.clickButton.using(DefaultStaticParams_1.DELETE), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK));
    }
};
exports.editIR = {
    using: (IRInfo) => {
        const Date = IRInfo.rowsHash().InspectionDate.split(' ')[0];
        const Time = IRInfo.rowsHash().InspectionDate.split(' ')[1] + ' ' + IRInfo.rowsHash().InspectionDate.split(' ')[2];
        return core_1.Task.where(`#actor Input all fields and save `, EditIR_1.IR.setCookie(statics_1.COOKIE_REPORT_NO, web_1.Attribute.called('value').of(EditIR_1.IR.textInputFieldA('Report No.'))), EditIR_1.IR.fillTextInputField('Report Name', IRInfo.rowsHash().ReportName), core_1.Wait.for(core_1.Duration.ofSeconds(3)), web_1.Click.on(EditIR_1.IR.ralationshipAttributeLookupFieldClearIcon('Inspectors')), EditIR_1.IR.selectItemInlookupPopup('Inspectors', IRInfo.rowsHash().Inspectors, 'Resource ID'), EditIR_1.IR.selectDropdownItemA('Report Status', IRInfo.rowsHash().ReportStatus), EditIR_1.IR.selectSpecialDate('Inspection Date', Date, 0), EditIR_1.IR.selectClock('Inspection Date', Time), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
//# sourceMappingURL=IRCrud.js.map