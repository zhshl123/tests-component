"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inspectionReportCrud = exports.InpectionReportCrud = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../../website/common");
const common_2 = require("../common");
const PopupWindow_1 = require("../common/PopupWindow");
const StaticCookie_1 = require("../common/statics/StaticCookie");
const EditInspectionReportFields_1 = require("./components/EditInspectionReportFields");
class InpectionReportCrud {
    constructor() {
        this.checkRequiredInfo = (inspectionReportInfo) => {
            return core_1.Task.where(`#actor check Inspection Report information`, EditInspectionReportFields_1.inspectionReportEdit.checkTextInputFieldValue('Report Name', web_1.Cookie.called(StaticCookie_1.COOKIE_INSPECTION_REPORT_NAME).value(), DefaultStaticParams_1.SUCCEEDED), EditInspectionReportFields_1.inspectionReportEdit.checkReadOnlyFieldValue('Inspection Type', inspectionReportInfo.rowsHash().InspectionType, DefaultStaticParams_1.SUCCEEDED), EditInspectionReportFields_1.inspectionReportEdit.checkDropdownFieldValue('Inspector', inspectionReportInfo.rowsHash().Inspector, DefaultStaticParams_1.SUCCEEDED));
        };
        this.updateRequiredInfo = (inspectionReportInfo) => {
            const timestamp = common_1.formatted_now;
            return core_1.Task.where(`#actor update Inspection Report information`, EditInspectionReportFields_1.inspectionReportEdit.fillTextInputField('Report Name', inspectionReportInfo.rowsHash().ReportName + timestamp), EditInspectionReportFields_1.inspectionReportEdit.setCookie(StaticCookie_1.COOKIE_INSPECTION_REPORT_NAME, inspectionReportInfo.rowsHash().ReportName + timestamp), core_1.Wait.for(core_1.Duration.ofSeconds(2)), EditInspectionReportFields_1.inspectionReportEdit.clearDropdownSelectedItem('Inspector'), EditInspectionReportFields_1.inspectionReportEdit.selectItemInPopup('Inspector', inspectionReportInfo.rowsHash().Inspector, 1, 0), EditInspectionReportFields_1.inspectionReportEdit.fillDateInputField('Planned Inspection Date', inspectionReportInfo.rowsHash().PlannedInspectionDate), web_1.Click.on(common_2.targetButton.getButton(DefaultStaticParams_1.SAVE)), (0, PopupWindow_1.checkAndClosePopupWindow)());
        };
        this.delete = () => core_1.Task.where(`#actor delete Inspection Report information`, common_2.clickButton.using(DefaultStaticParams_1.DELETE), assertions_1.Ensure.eventually((0, PopupWindow_1.alertMssageBox)(), (0, assertions_1.isPresent)()), web_1.Click.on((0, PopupWindow_1.buttonInAlertMessageBox)(DefaultStaticParams_1.OK)), core_1.Wait.for(core_1.Duration.ofSeconds(3)));
        this.addByRequiredFields = (inspectionReportInfo) => {
            return core_1.Task.where(`#actor add Inspection Report`, this.fillFields(inspectionReportInfo), core_1.Wait.for(core_1.Duration.ofSeconds(2)), web_1.Click.on(common_2.targetButton.getButton(DefaultStaticParams_1.SAVE)), (0, PopupWindow_1.checkAndClosePopupWindow)());
        };
        this.fillFields = (inspectionReportInfo) => {
            const timestamp = common_1.formatted_now;
            return core_1.Task.where(`#actor fill Inspection Report required field`, EditInspectionReportFields_1.inspectionReportAdd.fillTextInputField('Report Name', inspectionReportInfo.rowsHash().ReportName + timestamp), EditInspectionReportFields_1.inspectionReportAdd.setCookie(StaticCookie_1.COOKIE_INSPECTION_REPORT_NAME, inspectionReportInfo.rowsHash().ReportName + timestamp), EditInspectionReportFields_1.inspectionReportAdd.selectDropdownItem('Inspection Type', inspectionReportInfo.rowsHash().InspectionType), core_1.Wait.for(core_1.Duration.ofSeconds(5)), EditInspectionReportFields_1.inspectionReportAdd.selectItemInPopup('Inspector', inspectionReportInfo.rowsHash().Inspector, 1, 0), EditInspectionReportFields_1.inspectionReportAdd.fillDateInputField('Planned Inspection Date', inspectionReportInfo.rowsHash().PlannedInspectionDate));
        };
    }
}
exports.InpectionReportCrud = InpectionReportCrud;
exports.inspectionReportCrud = new InpectionReportCrud();
//# sourceMappingURL=InspectionReportCrud.js.map