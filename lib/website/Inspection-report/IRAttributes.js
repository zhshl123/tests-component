"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IRMap = void 0;
/* eslint-disable unicorn/filename-case */
exports.IRMap = new Map();
/*========================Assignment=============================*/
exports.IRMap.set('Report No.', 'ReportNumber');
exports.IRMap.set('Report Name', 'ReportName');
exports.IRMap.set('Inspection Type', 'InspectionTypeID');
exports.IRMap.set('Inspectors', 'RelationshipFieldFK_Resources_InspectionRptRes_InspectionReportrpt');
exports.IRMap.set('Report Status', 'ReportStatusID');
exports.IRMap.set('Planned Inspection Date', 'ProposalInspectionDate');
exports.IRMap.set('Resource ID', 'ResourceID');
exports.IRMap.set('Approved', '1');
exports.IRMap.set('Draft', '2');
exports.IRMap.set('Rejected', '3');
exports.IRMap.set('Under Review', '4');
//# sourceMappingURL=IRAttributes.js.map