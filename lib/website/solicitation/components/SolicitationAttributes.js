"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solicitationAttributesMap = void 0;
exports.solicitationAttributesMap = new Map();
exports.solicitationAttributesMap.set('Type', 'SolicitationTypeID');
exports.solicitationAttributesMap.set('Solicitation ID', 'SolicitationID');
exports.solicitationAttributesMap.set('Solicitation Name', 'SolicitationName');
exports.solicitationAttributesMap.set('Publication Date', 'ReceiveStartDate');
exports.solicitationAttributesMap.set('Bid Due Date', 'ReceiveEndDate');
exports.solicitationAttributesMap.set('Is Sealed Bid', 'IsSealedBid');
exports.solicitationAttributesMap.set('Status', 'SolicitationStatusID');
exports.solicitationAttributesMap.set('Process Type', 'BiddingProcessTypeID');
exports.solicitationAttributesMap.set('Department', 'DepartmentID');
exports.solicitationAttributesMap.set('Bid Manager', 'ResourceAutoID');
exports.solicitationAttributesMap.set('Q&A Deadline', 'QADateline');
exports.solicitationAttributesMap.set('Bidder Meeting Required', 'BidderMeetingRequired');
exports.solicitationAttributesMap.set('Bidder Meeting Date', 'BidderMeetingDate');
exports.solicitationAttributesMap.set('Bidder Meeting Location', 'BidderMeetingLocation');
exports.solicitationAttributesMap.set('Contact', 'Contact');
exports.solicitationAttributesMap.set('Phone', 'Phone');
exports.solicitationAttributesMap.set('Email', 'Email');
exports.solicitationAttributesMap.set('Address', 'Address');
exports.solicitationAttributesMap.set('Associated Projects', 'RelationshipFieldFK_solicitations_implementedprojects');
exports.solicitationAttributesMap.set('Description', 'Description');
exports.solicitationAttributesMap.set('Classifications', 'RelationshipFieldFK_Solicitations_SolicitationCls_VW_SolCategorysol');
exports.solicitationAttributesMap.set('NAICS', 'RelationshipFieldFK_Solicitations_SolicitationNAICSCod_vw_vendornaicssol');
exports.solicitationAttributesMap.set('Resource Name', 'ResourceName');
exports.solicitationAttributesMap.set('Project Name', 'ProjectName');
exports.solicitationAttributesMap.set('Classification Name', 'CategoryName');
exports.solicitationAttributesMap.set('NAICS Code', 'NAICSCode');
// Questions Tab
exports.solicitationAttributesMap.set('Item No.', 'ItemNo');
exports.solicitationAttributesMap.set('Question Description', 'ItemName');
// Bidder Tab
exports.solicitationAttributesMap.set('Bidder ID', 'BidderID');
exports.solicitationAttributesMap.set('Bidder Name', 'BidderName');
// Response Tab
exports.solicitationAttributesMap.set('Prime Contractor', 'SolicitationVendorAutoID');
// Evaluator Tab 
exports.solicitationAttributesMap.set('Evaluator ID', 'EvaluatorID');
exports.solicitationAttributesMap.set('Evaluator Name', 'EvaluatorName');
// Quotes Tab
exports.solicitationAttributesMap.set('Bid Spec No.', 'BidSpecificationNumber');
exports.solicitationAttributesMap.set('SOV Item', 'SovItemAutoID');
// Ranking Tab
exports.solicitationAttributesMap.set('Ranking Type', 'RankingTypeID');
exports.solicitationAttributesMap.set('Ranking Phase Name', 'RankingPhaseName');
//# sourceMappingURL=SolicitationAttributes.js.map