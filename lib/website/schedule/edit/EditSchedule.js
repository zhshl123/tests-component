"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMultiTask = exports.checkTaskReouceValue = exports.checkMultiScheduleTask = exports.fillTaskResourceInfo = exports.fillTaskGeneralInfo = exports.addMultiScheduleTask = exports.openGanttChartPage = exports.checkScheduleName = exports.deleteSchedule = exports.checkCopiedSchedule = exports.copySchedule = exports.checkscheduleList = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
const common_1 = require("../../common");
const statics_1 = require("../../common/statics");
const components_1 = require("../components");
const ScheduleGanttChart_1 = require("../components/ScheduleGanttChart");
exports.checkscheduleList = {
    using: (scheduleName) => {
        return core_1.Task.where(`#actor checks schedule list`, common_1.checkTextInGridList.using(scheduleName));
    }
};
exports.copySchedule = {
    using: (scheduleName) => {
        return core_1.Task.where(`#actor copys schedule`, web_1.Click.on(components_1.schedule.scheduleGridCheckbox(scheduleName)), common_1.clickSectionButton.using('Copy Schedule'), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(2)));
    }
};
exports.checkCopiedSchedule = {
    using: (scheduleInfo) => {
        const items = core_1.List.of(components_1.schedule.scheduleGridTableBody());
        let rowNumber = 0;
        let elementNumber = 3;
        return core_1.Task.where(`#actor checks copied schedule`, items.forEach(({ actor, item }) => actor.attemptsTo(core_1.Log.the('rowNumber:' + rowNumber++), core_1.Check.whether(web_1.Text.of(web_1.PageElement.located(web_1.By.id('ctl00_body_dgSchedule_ctl0' + elementNumber++ + '_lblScheduleName'))), (0, assertions_1.equals)(web_1.Cookie.called(statics_1.COPIED_COOKIE_SCHEDULE_NAME).value())).andIfSo(web_1.Click.on(components_1.schedule.buttonInGridList(DefaultStaticParams_1.EDIT, rowNumber))))), core_1.Wait.until(web_1.Page.whichTitle((0, assertions_1.includes)(statics_1.EDIT_SCHEDULE)), (0, assertions_1.isPresent)()), web_1.Switch.to(web_1.Page.whichTitle((0, assertions_1.includes)(statics_1.EDIT_SCHEDULE))).and(components_1.schedule.checkTextInputFieldValue('Schedule Name', web_1.Cookie.called(statics_1.COPIED_COOKIE_SCHEDULE_NAME).value(), DefaultStaticParams_1.SUCCEEDED), components_1.schedule.checkDropdownInputFieldValue('Schedule Status', scheduleInfo.rowsHash().ScheduleStatus, DefaultStaticParams_1.SUCCEEDED), components_1.schedule.checkDateInputFieldValue('Status Date', scheduleInfo.rowsHash().StatusDate, DefaultStaticParams_1.SUCCEEDED), 
        // 校验完成后删除copy的Schedule
        common_1.clickButton.using(DefaultStaticParams_1.DELETE), (0, common_1.waitMessagePopupBoxVisible)(), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK)));
    }
};
const deleteSchedule = () => {
    const items = core_1.List.of(components_1.schedule.scheduleGridTableBody());
    let rowNumber = 0;
    let elementNumber = 3;
    return core_1.Task.where(`#actor deletes schedule`, items.forEach(({ actor, item }) => actor.attemptsTo(core_1.Log.the('rowNumber:' + rowNumber++), core_1.Check.whether(web_1.Text.of(web_1.PageElement.located(web_1.By.id('ctl00_body_dgSchedule_ctl0' + elementNumber++ + '_lblScheduleName'))), (0, assertions_1.equals)(web_1.Cookie.called(statics_1.COOKIE_SCHEDULE_NAME).value())).andIfSo(web_1.Click.on(components_1.schedule.buttonInGridList(DefaultStaticParams_1.EDIT, rowNumber))))), core_1.Wait.until(web_1.Page.whichTitle((0, assertions_1.includes)(statics_1.EDIT_SCHEDULE)), (0, assertions_1.isPresent)()), web_1.Switch.to(web_1.Page.whichTitle((0, assertions_1.includes)(statics_1.EDIT_SCHEDULE))), common_1.clickButton.using(DefaultStaticParams_1.DELETE), (0, common_1.waitMessagePopupBoxVisible)(), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
};
exports.deleteSchedule = deleteSchedule;
exports.checkScheduleName = {
    using: (scheduleName) => {
        return core_1.Task.where(`#actor checks schedule name`, assertions_1.Ensure.eventually(components_1.schedule.scheduleNameCellInGrid(scheduleName), (0, assertions_1.not)((0, web_1.isVisible)())));
    }
};
exports.openGanttChartPage = {
    using: (scheduleName) => {
        const items = core_1.List.of(components_1.schedule.scheduleGridTableBody());
        let rowNumber = 0;
        let elementNumber = 3;
        return core_1.Task.where(`#actor opens gantt chart page`, items.forEach(({ actor, item }) => actor.attemptsTo(core_1.Check.whether(web_1.Text.of(web_1.PageElement.located(web_1.By.id('ctl00_body_dgSchedule_ctl0' + elementNumber++ + '_lblScheduleName'))), (0, assertions_1.equals)(scheduleName)).andIfSo(web_1.Click.on(components_1.schedule.buttonInGridList('View Single Schedule', rowNumber++))))), core_1.Wait.until(web_1.Page.whichTitle((0, assertions_1.includes)(statics_1.EDIT_CONTRACT_SCHEDULE)), (0, assertions_1.isPresent)()), web_1.Switch.to(web_1.Page.whichTitle((0, assertions_1.includes)(statics_1.EDIT_CONTRACT_SCHEDULE))));
    }
};
exports.addMultiScheduleTask = {
    using: (taskInfo) => {
        const items = core_1.List.of(taskInfo);
        const trList = core_1.List.of((0, ScheduleGanttChart_1.taskTableTrList)());
        return core_1.Task.where(`#actor adds multi task`, core_1.Log.the(web_1.Text.of((0, ScheduleGanttChart_1.ganttChartIconButton)('Locked'))), 
        // 查看是否处于只读状态
        core_1.Check.whether(web_1.Text.of((0, ScheduleGanttChart_1.ganttChartIconButton)('Locked')), (0, assertions_1.equals)('Locked')).andIfSo(ScheduleGanttChart_1.clickGanttChartIconButton.using('Locked')), 
        // 删除旧的task信息
        core_1.Check.whether((0, ScheduleGanttChart_1.taskTableTrList)(), (0, assertions_1.isPresent)()).andIfSo(trList.forEach(({ actor, item }) => actor.attemptsTo(web_1.Click.on((0, ScheduleGanttChart_1.taskTableCell)('1', 'Task Name')), ScheduleGanttChart_1.clickGanttChartIconButton.using('Remove'), assertions_1.Ensure.eventually((0, ScheduleGanttChart_1.ganttChartMessagePopupBox)(), (0, web_1.isVisible)()), web_1.Switch.to((0, ScheduleGanttChart_1.ganttChartMessagePopupBox)()).and(web_1.Click.on((0, ScheduleGanttChart_1.OkButtonInMessagePopupBox)()))))), 
        // 新增task
        items.forEach(({ actor, item }) => actor.attemptsTo(ScheduleGanttChart_1.clickGanttChartIconButton.using(DefaultStaticParams_1.ADD), web_1.RightClick.on((0, ScheduleGanttChart_1.taskTableCell)(item.rowNumber, 'Task Name')), ScheduleGanttChart_1.clickGanttChartTextButton.using('Task information'), assertions_1.Ensure.eventually((0, ScheduleGanttChart_1.taskInformationPopup)(), (0, web_1.isVisible)()), web_1.Switch.to((0, ScheduleGanttChart_1.taskInformationPopup)()).and(exports.fillTaskGeneralInfo.using(item), exports.fillTaskResourceInfo.using(item), web_1.Click.on((0, ScheduleGanttChart_1.closeButtonInTaskInfoPopup)())))), ScheduleGanttChart_1.clickGanttChartIconButton.using(DefaultStaticParams_1.SAVE), (0, ScheduleGanttChart_1.clickOkButtonInMessageBox)());
    }
};
exports.fillTaskGeneralInfo = {
    using: (taskInfo) => {
        return core_1.Task.where(`#actor edit task general information`, web_1.Click.on((0, ScheduleGanttChart_1.taskInformationPopupTab)('General')), ScheduleGanttChart_1.fillTextInputFieldInTaskPopup.using('Task ID', taskInfo.TaskID), ScheduleGanttChart_1.fillTextInputFieldInTaskPopup.using('Task Name', taskInfo.TaskName), ScheduleGanttChart_1.fillTextInputFieldInTaskPopup.using('Start', taskInfo.Start), ScheduleGanttChart_1.fillTextInputFieldInTaskPopup.using('Finish', taskInfo.Finish), web_1.Click.on((0, ScheduleGanttChart_1.saveTaskButtonInTaskInfoPopup)()), (0, ScheduleGanttChart_1.clickOkButtonInMessageBox)());
    }
};
exports.fillTaskResourceInfo = {
    using: (taskInfo) => {
        const resourceList = core_1.List.of(taskInfo.Resource.split(','));
        return core_1.Task.where(`#actor edit task resource information`, web_1.Click.on((0, ScheduleGanttChart_1.taskInformationPopupTab)('Resources')), resourceList.forEach(({ actor, item }) => actor.attemptsTo(web_1.Click.on((0, ScheduleGanttChart_1.addResourceButtonInTaskInfoPopup)()), core_1.Wait.for(core_1.Duration.ofSeconds(2)), ScheduleGanttChart_1.selectResourceInTaskInfoPopup.using(item))), web_1.Click.on((0, ScheduleGanttChart_1.saveInterimResultButtonInTaskInfoPopup)()), (0, ScheduleGanttChart_1.clickOkButtonInMessageBox)());
    }
};
exports.checkMultiScheduleTask = {
    using: (taskInfo) => {
        const items = core_1.List.of(taskInfo);
        return core_1.Task.where(`#actor check multi task information`, items.forEach(({ actor, item }) => actor.attemptsTo(assertions_1.Ensure.eventually(web_1.Text.of((0, ScheduleGanttChart_1.taskTableCellValue)(item.rowNumber, 'Task Name')), (0, assertions_1.equals)(item.TaskName)), assertions_1.Ensure.eventually(web_1.Text.of((0, ScheduleGanttChart_1.taskTableCellValue)(item.rowNumber, 'Task ID')), (0, assertions_1.equals)(item.TaskID)), assertions_1.Ensure.eventually(web_1.Text.of((0, ScheduleGanttChart_1.taskTableCellValue)(item.rowNumber, 'Start')), (0, assertions_1.equals)(item.Start)), assertions_1.Ensure.eventually(web_1.Text.of((0, ScheduleGanttChart_1.taskTableCellValue)(item.rowNumber, 'Finish')), (0, assertions_1.equals)(item.Finish)), exports.checkTaskReouceValue.using(item))));
    }
};
exports.checkTaskReouceValue = {
    using: (taskInfo) => {
        const items = core_1.List.of(taskInfo.Resource.split(','));
        return core_1.Task.where(`#actor check task resource information`, items.forEach(({ actor, item }) => actor.attemptsTo(assertions_1.Ensure.eventually(web_1.Text.of((0, ScheduleGanttChart_1.taskTableCellValue)(taskInfo.rowNumber, 'Resources')), (0, assertions_1.includes)(item)))));
    }
};
exports.deleteMultiTask = {
    using: (taskInfo) => {
        const items = core_1.List.of(taskInfo);
        return core_1.Task.where(`#actor check task resource information`, items.forEach(({ actor, item }) => actor.attemptsTo(web_1.Click.on((0, ScheduleGanttChart_1.taskTableCell)(item.rowNumber, 'Task Name')), ScheduleGanttChart_1.clickGanttChartIconButton.using('Remove'), assertions_1.Ensure.eventually((0, ScheduleGanttChart_1.ganttChartMessagePopupBox)(), (0, web_1.isVisible)()), web_1.Switch.to((0, ScheduleGanttChart_1.ganttChartMessagePopupBox)()).and(web_1.Click.on((0, ScheduleGanttChart_1.OkButtonInMessagePopupBox)())))));
    }
};
//# sourceMappingURL=EditSchedule.js.map