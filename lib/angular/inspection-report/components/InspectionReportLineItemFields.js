"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inspectionReportLineItem = exports.InspectionReportLineItemFields = void 0;
const abstract_1 = require("../../common/abstract");
const InspectionReportLineitemAttributes_1 = require("./InspectionReportLineitemAttributes");
class InspectionReportLineItemFields extends abstract_1.LineItemFields {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.InspectionReportLineItemFields = InspectionReportLineItemFields;
exports.inspectionReportLineItem = new InspectionReportLineItemFields(InspectionReportLineitemAttributes_1.inspectionReportLineItemAttributeMap);
//# sourceMappingURL=InspectionReportLineItemFields.js.map