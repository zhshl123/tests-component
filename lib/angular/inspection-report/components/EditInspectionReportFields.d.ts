import { BrowseFormFields } from '../../common/abstract/BrowseFormFields';
import { EditFromFields } from '../../common/abstract/EditFormFields';
export declare class EditInspectionReportFields extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
}
export declare const inspectionReportAdd: EditInspectionReportFields;
export declare const inspectionReportEdit: EditInspectionReportFields;
export declare const browseInspectionReport: BrowseFormFields;
