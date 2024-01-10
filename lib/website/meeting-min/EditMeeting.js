"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meeting = exports.EditMeeting = void 0;
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../common/abstract");
const MeetingAttributes_1 = require("./MeetingAttributes");
class EditMeeting extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.textInputFieldA = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_txtAutoNumber'))
            .describedAs('text input input field: ' + fieldName);
    }
}
exports.EditMeeting = EditMeeting;
exports.meeting = new EditMeeting(MeetingAttributes_1.meetingMap);
//# sourceMappingURL=EditMeeting.js.map