import { LOGIN } from '../DefaultStaticParams';
import { ADD_ASSET,ADD_ASSIGNMENT,ADD_BULLETIN,ADD_CHANGE_ORDER,ADD_CONTRACT,ADD_CONTRACT_INSPECTION_INVOICE, ADD_CONTRACT_INVOICE, ADD_COR, ADD_CPS, ADD_CSH,ADD_CSO,ADD_CSP, ADD_CYCLE,ADD_DESIGN_REVIEW,ADD_DOCUMENT, ADD_DSI, ADD_FILTERINGPHASE, ADD_FUNDGROUP,ADD_IMPLEMENTATION_PROJECT,ADD_INSPECTIONREPORT,ADD_INVOICE_ONLY, ADD_ISSUE, ADD_MEETING, ADD_ODS, ADD_PERMIT, ADD_PO_INVOICE, ADD_PROJECT, ADD_PUBLICPROPOSAL, ADD_RANKINGPHASE, ADD_REQUESTFORPROPOSAL, ADD_RFI, ADD_RISK,ADD_SA,ADD_SCENARIO,ADD_SOLICITATION, ADD_STAFFPROPOSAL, ADD_TIMESHEET,ADD_TRANSFER,ADD_USER,ADD_VENDOR, ADD_WO,BROWSE_ASSET,BROWSE_ASSIGNMENT,BROWSE_BUDGET, BROWSE_CHANGE_ORDERS, BROWSE_CONTRACTS, BROWSE_COR,BROWSE_CPS,BROWSE_CSH,BROWSE_CSO,BROWSE_CSP,BROWSE_CYCLES,BROWSE_DESIGN_REVIEW, BROWSE_DOCUMENTS, BROWSE_FUNDGROUP, BROWSE_FUNDS, BROWSE_IMPLEMENTATION_PROJECT, BROWSE_INVOICES, BROWSE_ISSUES, BROWSE_ODS, BROWSE_PROJECTS, BROWSE_REQUESTFORPROPOSAL, BROWSE_SOLICITATIONS, BROWSE_VENDERS, BROWSE_WO, MANAGE_SOLICITATION, SAVE_SCOPINGENVIRONMENT, SAVE_SCOPINGFINANCIAL, SAVE_SCOPINGFINANCIALDETAIL,SAVE_SCOPINGGENERAL, SAVE_SCOPINGPUBLICSAFETY, SCOPINGAREA_MANAGEMENT} from './common/statics/StaticPageName';

// 项目地址
export const PROJECT_URL ='/DailyBuild'
// export const PROJECT_URL ='/r20231228'

/**
 * 设置页面名称与对应url的键值对
 * eg: pageMap.set("页面名称", "页面除去前缀之后的url")
 */
export const pageMap = new Map()
pageMap.set(LOGIN, PROJECT_URL + '/Users/Login.aspx');
pageMap.set(BROWSE_CONTRACTS, PROJECT_URL + '/Contract/BrowseContracts.aspx');
pageMap.set(BROWSE_VENDERS, PROJECT_URL + '/Vendors/BrowseVendors.aspx');
pageMap.set(BROWSE_PROJECTS, PROJECT_URL + '/Projects/BrowsePlanningProjects.aspx');
pageMap.set(BROWSE_FUNDS, PROJECT_URL + '/Funds/BrowseFunds.aspx');
pageMap.set(BROWSE_BUDGET, PROJECT_URL + '/Budget/BrowseBudget.aspx');
pageMap.set(ADD_CONTRACT, PROJECT_URL + '/Contract/ContractManagement.aspx');
pageMap.set(ADD_CONTRACT_INVOICE, PROJECT_URL + '/Invoices/ManageInvoices.aspx?InvoiceFinancialStructure=3');
pageMap.set(ADD_PO_INVOICE, PROJECT_URL + '/Invoices/ManageInvoices.aspx?InvoiceFinancialStructure=2');
pageMap.set(ADD_INVOICE_ONLY, PROJECT_URL + '/Invoices/ManageInvoices.aspx?InvoiceFinancialStructure=4');
pageMap.set(ADD_CONTRACT_INSPECTION_INVOICE, PROJECT_URL + '/Invoices/ManageInvoices.aspx?InvoiceFinancialStructure=5');
pageMap.set(BROWSE_INVOICES, PROJECT_URL + '/Invoices/BrowseInvoices.aspx');
pageMap.set(SAVE_SCOPINGGENERAL,PROJECT_URL + '/Evaluation/ProjectEvaluationNew.aspx?ScopingProjectScenarioID=57&ScopingAreaID=1&ProjectAutoID=54');
pageMap.set(SAVE_SCOPINGFINANCIAL,PROJECT_URL + '/Evaluation/ProjectEvaluationNew.aspx?ScopingProjectScenarioID=57&ScopingAreaID=2&ProjectAutoID=54');
pageMap.set(SAVE_SCOPINGENVIRONMENT,PROJECT_URL + '/Evaluation/ProjectEvaluationNew.aspx?ScopingProjectScenarioID=57&ScopingAreaID=3&ProjectAutoID=54');
pageMap.set(SAVE_SCOPINGPUBLICSAFETY,PROJECT_URL + '/Evaluation/ProjectEvaluationNew.aspx?ScopingProjectScenarioID=57&ScopingAreaID=4&ProjectAutoID=54');
pageMap.set(SAVE_SCOPINGFINANCIALDETAIL,PROJECT_URL + '/Evaluation/ProjectEvaluationNew.aspx?ScopingProjectScenarioID=57&ScopingAreaID=2&ProjectAutoID=54&ViewDetail=1');
pageMap.set(BROWSE_SOLICITATIONS, PROJECT_URL + '/BidManagement/BrowseSol.aspx');
pageMap.set(ADD_SOLICITATION, PROJECT_URL + '/BidManagement/SolGeneralManagement.aspx');
pageMap.set(MANAGE_SOLICITATION, PROJECT_URL + '/BidManagement/SolGeneralManagement.aspx');
pageMap.set(ADD_VENDOR, PROJECT_URL + '/Vendors/EditVendor.aspx');
pageMap.set(ADD_DOCUMENT, PROJECT_URL + '/DocManagement/DocFileDetails.aspx?Act=New')
pageMap.set(BROWSE_DOCUMENTS, PROJECT_URL + '/DocManagement/DocSearch.aspx')
pageMap.set(ADD_COR, PROJECT_URL + '/ChangeOrder/CORManagement.aspx');
pageMap.set(BROWSE_COR, PROJECT_URL + '/ChangeOrder/BrowseChangeOrderRequests.aspx');
pageMap.set(ADD_PROJECT, PROJECT_URL+ '/Projects/ProjectGeneral.aspx');
pageMap.set(ADD_IMPLEMENTATION_PROJECT , PROJECT_URL+ '/Projects/ImplementedProjectGeneral.aspx?Exist=1&ProjectType=2');
pageMap.set(BROWSE_IMPLEMENTATION_PROJECT, PROJECT_URL + '/Projects/BrowseImplementationProjects.aspx');
pageMap.set(SCOPINGAREA_MANAGEMENT, PROJECT_URL + '/Evaluation/ScopingAreaManagement.aspx')
pageMap.set(ADD_PUBLICPROPOSAL,PROJECT_URL + '/Proposals/PublicProposal.aspx')
pageMap.set(ADD_STAFFPROPOSAL,PROJECT_URL + '/Proposals/StaffProposalGeneral.aspx')
pageMap.set(ADD_RANKINGPHASE,PROJECT_URL + '/Ranking/RankingPhaseManagement.aspx')
pageMap.set(ADD_FILTERINGPHASE,PROJECT_URL + '/FilteringPhase/FilteringPhase.aspx')
pageMap.set(ADD_CHANGE_ORDER, PROJECT_URL + '/ChangeOrder/ChangeOrderManagement.aspx')
pageMap.set(BROWSE_CHANGE_ORDERS, PROJECT_URL + '//ChangeOrder/BrowseChangeOrders.aspx')
pageMap.set(ADD_ISSUE, PROJECT_URL + '/Issues/IssueGeneric.aspx')
pageMap.set(BROWSE_ISSUES, PROJECT_URL + 'Issues/browseobjects.aspx?entityname=issuesgeneric')
pageMap.set(ADD_CSH, PROJECT_URL +'/Issues/ObjectManagement.aspx?entityname=constructschd')
pageMap.set(BROWSE_CSH,PROJECT_URL +'/Issues/BrowseObjects.aspx?EntityName=constructschd')
pageMap.set(ADD_CPS, PROJECT_URL +'/Issues/ObjectManagement.aspx?EntityName=productsubmt')
pageMap.set(BROWSE_CPS, PROJECT_URL + '/Issues/BrowseObjects.aspx?EntityName=Productsubmt')
pageMap.set(BROWSE_CHANGE_ORDERS, PROJECT_URL + '//ChangeOrder/BrowseChangeOrders.aspx')
pageMap.set(ADD_REQUESTFORPROPOSAL, PROJECT_URL + '/ChangeOrder/RFPManagement.aspx')
pageMap.set(BROWSE_REQUESTFORPROPOSAL, PROJECT_URL + '/ChangeOrder/BrowseRequestForProposals.aspx')
pageMap.set(ADD_CSP, PROJECT_URL+'/Issues/ObjectManagement.aspx?entityname=Safetyplan')
pageMap.set(BROWSE_CSP, PROJECT_URL +'/Issues/browseobjects.aspx?entityname=Safetyplan')
pageMap.set(ADD_CSO, PROJECT_URL+'/Issues/ObjectManagement.aspx?entityname=Othcttsubmt')
pageMap.set(BROWSE_CSO, PROJECT_URL +'/Issues/browseobjects.aspx?entityname=Othcttsubmt')
pageMap.set(ADD_ODS, PROJECT_URL+'/Issues/ObjectManagement.aspx?EntityName=othdsnsubmt')
pageMap.set(BROWSE_ODS, PROJECT_URL +'/Issues/BrowseObjects.aspx?EntityName=othdsnsubmt')
pageMap.set(BROWSE_DESIGN_REVIEW, PROJECT_URL+'/Issues/BrowseObjects.aspx?EntityName=DesignReview')
pageMap.set(ADD_DESIGN_REVIEW, PROJECT_URL + '/Issues/ObjectManagement.aspx?EntityName=designreview')

pageMap.set(ADD_RISK,PROJECT_URL + '/Risks/RiskMan.aspx')
pageMap.set(ADD_USER,PROJECT_URL + '/Users/Users.aspx')
pageMap.set(ADD_CYCLE,PROJECT_URL + '/Util/CycleMan.aspx')
pageMap.set(ADD_SCENARIO,PROJECT_URL + '/Util/ScenarioMan.aspx')
pageMap.set(BROWSE_CYCLES,PROJECT_URL + '/Util/BrowseCycles.aspx')
pageMap.set(ADD_ASSIGNMENT,PROJECT_URL + '/Contract/InspectionAssignmentGeneral.aspx')
pageMap.set(ADD_INSPECTIONREPORT,PROJECT_URL + '/Contract/InspectionReportManagement.aspx')
pageMap.set(ADD_FUNDGROUP,PROJECT_URL + '/Funds/GroupMan.aspx')
pageMap.set(BROWSE_FUNDGROUP,PROJECT_URL + '/Funds/BrowseGroups.aspx')
pageMap.set(ADD_ASSET,PROJECT_URL + '/Assets/AssetMan.aspx')
pageMap.set(ADD_WO,PROJECT_URL + '/Assets/ViewAssetMantenance.aspx')
pageMap.set(BROWSE_ASSET,PROJECT_URL + '/Assets/BrowseAssetInTree.aspx')
pageMap.set(BROWSE_WO,PROJECT_URL + '/Assets/MaintenancePlan.aspx')
pageMap.set(ADD_BULLETIN,PROJECT_URL + '/Issues/BulletinManagement.aspx')
pageMap.set(ADD_DSI,PROJECT_URL + '/Issues/DSIManagement.aspx')
pageMap.set(ADD_RFI,PROJECT_URL + '/Issues/IssueRFI.aspx')
pageMap.set(ADD_SA,PROJECT_URL + '/Issues/ObjectManagement.aspx?EntityName=studyanalysis')
pageMap.set(ADD_MEETING,PROJECT_URL + '/MeetingMinutes/MeetingMinutesManagement.aspx')
pageMap.set(ADD_PERMIT,PROJECT_URL + '/Permits/PermitsManagement.aspx')
pageMap.set(ADD_TIMESHEET,PROJECT_URL + '/TimeSheets/ManageTimeSheet.aspx')
pageMap.set(ADD_TRANSFER,PROJECT_URL + '/Transfer/TransferManagement.aspx')
pageMap.set(BROWSE_ASSIGNMENT, PROJECT_URL + '/Contract/BrowseInspectionAssignment.aspx')
