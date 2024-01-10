import { EditFromFields, SearchFromFields } from '../../common/abstract';
import { calendarAttributeMap } from './CalendarAttributes';

export class EditCalendarFields extends EditFromFields{
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

}

export const calendar = new EditCalendarFields(calendarAttributeMap)
export const browseCalendar = new SearchFromFields(calendarAttributeMap)