"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseCalendar = exports.calendar = exports.EditCalendarFields = void 0;
const abstract_1 = require("../../common/abstract");
const CalendarAttributes_1 = require("./CalendarAttributes");
class EditCalendarFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.EditCalendarFields = EditCalendarFields;
exports.calendar = new EditCalendarFields(CalendarAttributes_1.calendarAttributeMap);
exports.browseCalendar = new abstract_1.SearchFromFields(CalendarAttributes_1.calendarAttributeMap);
//# sourceMappingURL=EditCalendarFields.js.map