"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editMeeting = exports.deleteMeeting = exports.addMeeting = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const EditMeeting_1 = require("./EditMeeting");
exports.addMeeting = {
    using: (meetingInfo) => {
        const Start_Date = meetingInfo.rowsHash().StartTime.split(' ')[0];
        const Start_Time = meetingInfo.rowsHash().StartTime.split(' ')[1] + ' ' + meetingInfo.rowsHash().StartTime.split(' ')[2];
        const Finish_Date = meetingInfo.rowsHash().FinishTime.split(' ')[0];
        const Finish_Time = meetingInfo.rowsHash().FinishTime.split(' ')[1] + ' ' + meetingInfo.rowsHash().FinishTime.split(' ')[2];
        return core_1.Task.where(`#actor Input all fields and save `, EditMeeting_1.meeting.fillTextInputField('Subject', meetingInfo.rowsHash().Subject), EditMeeting_1.meeting.selectSpecialDate('Start Time', Start_Date, 0), EditMeeting_1.meeting.selectClock('Start Time', Start_Time), EditMeeting_1.meeting.selectSpecialDate('Finish Time', Finish_Date, 1), EditMeeting_1.meeting.selectClock('Finish Time', Finish_Time), EditMeeting_1.meeting.fillTextInputField('Location', meetingInfo.rowsHash().Location), EditMeeting_1.meeting.selectItemInlookupPopup('Primary Contract', meetingInfo.rowsHash().PrimaryContract, 'Contract Name'), common_1.clickButton.using(DefaultStaticParams_1.SAVE_CONTINUE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.deleteMeeting = {
    using: () => {
        return core_1.Task.where(`#actor click Delete button`, common_1.clickButton.using(DefaultStaticParams_1.DELETE), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK));
    }
};
exports.editMeeting = {
    using: (meetingInfo) => {
        const Start_Date = meetingInfo.rowsHash().StartTime.split(' ')[0];
        const Start_Time = meetingInfo.rowsHash().StartTime.split(' ')[1] + ' ' + meetingInfo.rowsHash().StartTime.split(' ')[2];
        const Finish_Date = meetingInfo.rowsHash().FinishTime.split(' ')[0];
        const Finish_Time = meetingInfo.rowsHash().FinishTime.split(' ')[1] + ' ' + meetingInfo.rowsHash().FinishTime.split(' ')[2];
        return core_1.Task.where(`#actor Input all fields and save `, EditMeeting_1.meeting.setCookie(statics_1.COOKIE_MEETING_NO, web_1.Attribute.called('value').of(EditMeeting_1.meeting.textInputFieldA('Meeting No.'))), EditMeeting_1.meeting.fillTextInputField('Subject', meetingInfo.rowsHash().Subject), EditMeeting_1.meeting.selectSpecialDate('Start Time', Start_Date, 0), EditMeeting_1.meeting.selectClock('Start Time', Start_Time), EditMeeting_1.meeting.selectSpecialDate('Finish Time', Finish_Date, 1), EditMeeting_1.meeting.selectClock('Finish Time', Finish_Time), EditMeeting_1.meeting.fillTextInputField('Location', meetingInfo.rowsHash().Location), EditMeeting_1.meeting.selectItemInlookupPopup('Primary Contract', meetingInfo.rowsHash().PrimaryContract, 'Contract Name'), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
//# sourceMappingURL=MeetingCrud.js.map