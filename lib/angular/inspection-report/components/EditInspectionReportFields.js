"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseInspectionReport = exports.inspectionReportEdit = exports.inspectionReportAdd = exports.EditInspectionReportFields = void 0;
const BrowseFormFields_1 = require("../../common/abstract/BrowseFormFields");
const EditFormFields_1 = require("../../common/abstract/EditFormFields");
const AddInspectionReportAttributes_1 = require("./AddInspectionReportAttributes");
const EditInspectionReportAttributes_1 = require("./EditInspectionReportAttributes");
class EditInspectionReportFields extends EditFormFields_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.EditInspectionReportFields = EditInspectionReportFields;
exports.inspectionReportAdd = new EditInspectionReportFields(AddInspectionReportAttributes_1.addInspectionReportAttributeMap);
exports.inspectionReportEdit = new EditInspectionReportFields(EditInspectionReportAttributes_1.editInspectionReportAttributeMap);
exports.browseInspectionReport = new BrowseFormFields_1.BrowseFormFields(new Map());
//# sourceMappingURL=EditInspectionReportFields.js.map