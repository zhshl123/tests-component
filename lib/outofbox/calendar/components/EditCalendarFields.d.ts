import { EditFromFields, SearchFromFields } from '../../common/abstract';
export declare class EditCalendarFields extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
}
export declare const calendar: EditCalendarFields;
export declare const browseCalendar: SearchFromFields;
