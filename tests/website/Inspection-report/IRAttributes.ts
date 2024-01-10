/* eslint-disable unicorn/filename-case */
export const IRMap = new Map()

/*========================Assignment=============================*/
IRMap.set('Report No.','ReportNumber')
IRMap.set('Report Name','ReportName')
IRMap.set('Inspection Type','InspectionTypeID')
IRMap.set('Inspectors','RelationshipFieldFK_Resources_InspectionRptRes_InspectionReportrpt')
IRMap.set('Report Status','ReportStatusID')
IRMap.set('Planned Inspection Date','ProposalInspectionDate')
IRMap.set('Resource ID','ResourceID')

IRMap.set('Approved','1')
IRMap.set('Draft','2')
IRMap.set('Rejected','3')
IRMap.set('Under Review','4')