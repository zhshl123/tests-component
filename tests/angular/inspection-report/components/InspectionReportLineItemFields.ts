import { LineItemFields } from '../../common/abstract';
import { inspectionReportLineItemAttributeMap } from './InspectionReportLineitemAttributes';

export class InspectionReportLineItemFields extends LineItemFields{
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }
}

export const inspectionReportLineItem = new InspectionReportLineItemFields(inspectionReportLineItemAttributeMap)
