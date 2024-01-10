
import { By, PageElement } from '@serenity-js/web';

import { EditFromFields } from '../common/abstract';
import { meetingMap } from './MeetingAttributes';

export class EditMeeting extends EditFromFields{
    entityMap:Map<string, string>
    constructor(entityMap) {
        super(entityMap);  
    }
    textInputFieldA = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_txtAutoNumber'))
            .describedAs('text input input field: ' + fieldName)    
}

export const meeting = new EditMeeting(meetingMap)