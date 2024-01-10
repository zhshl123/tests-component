export const solicitationAttributesMap = new Map()
solicitationAttributesMap.set('Type', 'SolicitationTypeID')
solicitationAttributesMap.set('Solicitation ID', 'SolicitationID')
solicitationAttributesMap.set('Solicitation Name', 'SolicitationName')
solicitationAttributesMap.set('Publication Date', 'ReceiveStartDate')
solicitationAttributesMap.set('Bid Due Date', 'ReceiveEndDate')
solicitationAttributesMap.set('Is Sealed Bid', 'IsSealedBid')
solicitationAttributesMap.set('Status', 'SolicitationStatusID')
solicitationAttributesMap.set('Process Type', 'BiddingProcessTypeID')
solicitationAttributesMap.set('Department', 'DepartmentID')
solicitationAttributesMap.set('Bid Manager', 'ResourceAutoID')
solicitationAttributesMap.set('Q&A Deadline', 'QADateline')
solicitationAttributesMap.set('Bidder Meeting Required', 'BidderMeetingRequired')
solicitationAttributesMap.set('Bidder Meeting Date', 'BidderMeetingDate')
solicitationAttributesMap.set('Bidder Meeting Location', 'BidderMeetingLocation')
solicitationAttributesMap.set('Contact', 'Contact')
solicitationAttributesMap.set('Phone', 'Phone')
solicitationAttributesMap.set('Email', 'Email')
solicitationAttributesMap.set('Address', 'Address')
solicitationAttributesMap.set('Associated Projects', 'RelationshipFieldFK_solicitations_implementedprojects')
solicitationAttributesMap.set('Description', 'Description')
solicitationAttributesMap.set('Classifications', 'RelationshipFieldFK_Solicitations_SolicitationCls_VW_SolCategorysol')
solicitationAttributesMap.set('NAICS', 'RelationshipFieldFK_Solicitations_SolicitationNAICSCod_vw_vendornaicssol')

solicitationAttributesMap.set('Resource Name', 'ResourceName')
solicitationAttributesMap.set('Project Name', 'ProjectName')
solicitationAttributesMap.set('Classification Name', 'CategoryName')
solicitationAttributesMap.set('NAICS Code', 'NAICSCode')

// Questions Tab
solicitationAttributesMap.set('Item No.', 'ItemNo')
solicitationAttributesMap.set('Question Description', 'ItemName')

// Bidder Tab
solicitationAttributesMap.set('Bidder ID', 'BidderID')
solicitationAttributesMap.set('Bidder Name', 'BidderName')

// Response Tab
solicitationAttributesMap.set('Prime Contractor', 'SolicitationVendorAutoID')

// Evaluator Tab 
solicitationAttributesMap.set('Evaluator ID', 'EvaluatorID')
solicitationAttributesMap.set('Evaluator Name', 'EvaluatorName')

// Quotes Tab
solicitationAttributesMap.set('Bid Spec No.', 'BidSpecificationNumber')
solicitationAttributesMap.set('SOV Item', 'SovItemAutoID')

// Ranking Tab
solicitationAttributesMap.set('Ranking Type', 'RankingTypeID')
solicitationAttributesMap.set('Ranking Phase Name', 'RankingPhaseName')