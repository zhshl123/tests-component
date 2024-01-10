
import { BrowseFormFields } from '../../common/abstract/BrowseFormFields';
import { EditFromFields } from '../../common/abstract/EditFormFields';
import { addInspectionReportAttributeMap } from './AddInspectionReportAttributes';
import { editInspectionReportAttributeMap } from './EditInspectionReportAttributes';

export class EditInspectionReportFields extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }
  
}

export const inspectionReportAdd = new EditInspectionReportFields(addInspectionReportAttributeMap)
export const inspectionReportEdit = new EditInspectionReportFields(editInspectionReportAttributeMap)
export const browseInspectionReport = new BrowseFormFields(new Map())