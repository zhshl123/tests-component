import { DataTable } from '@cucumber/cucumber'
import { Ensure, equals, includes, isPresent, not } from '@serenity-js/assertions'
import { Check, Duration, List, Log, Question, Task, Wait } from '@serenity-js/core'
import { By, Click, Cookie, isVisible, Page, PageElement, RightClick, Switch, Text } from '@serenity-js/web'

import { ADD, DELETE, EDIT, OK, SAVE, SUCCEEDED } from '../../../DefaultStaticParams'
import { checkTextInGridList, clickButton, clickMessagePopupButton, clickSectionButton, waitMessagePopupBoxVisible } from '../../common'
import { COOKIE_SCHEDULE_NAME, COPIED_COOKIE_SCHEDULE_NAME, EDIT_CONTRACT_SCHEDULE, EDIT_SCHEDULE } from '../../common/statics'
import { schedule } from '../components'
import {
    addResourceButtonInTaskInfoPopup, clickGanttChartIconButton, clickGanttChartTextButton,
    clickOkButtonInMessageBox,
    closeButtonInTaskInfoPopup,
    fillTextInputFieldInTaskPopup, ganttChartIconButton, ganttChartMessagePopupBox, OkButtonInMessagePopupBox, saveInterimResultButtonInTaskInfoPopup,
    saveTaskButtonInTaskInfoPopup,
    selectResourceInTaskInfoPopup,
    taskInformationPopup, taskInformationPopupTab, taskTableCell, taskTableCellValue, taskTableTrList
} from '../components/ScheduleGanttChart'

export const checkscheduleList = {
    using: (scheduleName: string | Question<any>) => {
        return Task.where(`#actor checks schedule list`,
            checkTextInGridList.using(scheduleName)

        )
    }
}

export const copySchedule = {
    using: (scheduleName: string | Question<any>) => {
        return Task.where(`#actor copys schedule`,
            Click.on(schedule.scheduleGridCheckbox(scheduleName)),
            clickSectionButton.using('Copy Schedule'),
            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(2)),
        )
    }

}

export const checkCopiedSchedule = {
    using: (scheduleInfo: DataTable) => {
        const items = List.of(schedule.scheduleGridTableBody())
        let rowNumber = 0;
        let elementNumber = 3;

        return Task.where(`#actor checks copied schedule`,
            items.forEach(({ actor, item }) => actor.attemptsTo(
                Log.the('rowNumber:' + rowNumber++),
                Check.whether(
                    Text.of(PageElement.located(By.id('ctl00_body_dgSchedule_ctl0' + elementNumber++ + '_lblScheduleName'))),
                    equals(Cookie.called(COPIED_COOKIE_SCHEDULE_NAME).value())
                ).andIfSo(
                    Click.on(schedule.buttonInGridList(EDIT, rowNumber)),
                )
            )),
            Wait.until(Page.whichTitle(includes(EDIT_SCHEDULE)), isPresent()),
            Switch.to(Page.whichTitle(includes(EDIT_SCHEDULE))).and(
                schedule.checkTextInputFieldValue('Schedule Name', Cookie.called(COPIED_COOKIE_SCHEDULE_NAME).value(), SUCCEEDED),
                schedule.checkDropdownInputFieldValue('Schedule Status', scheduleInfo.rowsHash().ScheduleStatus, SUCCEEDED),
                schedule.checkDateInputFieldValue('Status Date', scheduleInfo.rowsHash().StatusDate, SUCCEEDED),
                // 校验完成后删除copy的Schedule
                clickButton.using(DELETE),
                waitMessagePopupBoxVisible(),
                clickMessagePopupButton.using(OK),
            )

        )

    }
}

export const deleteSchedule = () => {
    const items = List.of(schedule.scheduleGridTableBody())
    let rowNumber = 0;
    let elementNumber = 3;
    return Task.where(`#actor deletes schedule`,
        items.forEach(({ actor, item }) => actor.attemptsTo(
            Log.the('rowNumber:' + rowNumber++),
            Check.whether(
                Text.of(PageElement.located(By.id('ctl00_body_dgSchedule_ctl0' + elementNumber++ + '_lblScheduleName'))),
                equals(Cookie.called(COOKIE_SCHEDULE_NAME).value())
            ).andIfSo(
                Click.on(schedule.buttonInGridList(EDIT, rowNumber)),
            )
        )),
        Wait.until(Page.whichTitle(includes(EDIT_SCHEDULE)), isPresent()),
        Switch.to(Page.whichTitle(includes(EDIT_SCHEDULE))),
        clickButton.using(DELETE),
        waitMessagePopupBoxVisible(),
        clickMessagePopupButton.using(OK),
        Wait.for(Duration.ofSeconds(5)),
    )

}

export const checkScheduleName = {
    using: (scheduleName: string | Question<any>) => {
        return Task.where(`#actor checks schedule name`,
            Ensure.eventually(schedule.scheduleNameCellInGrid(scheduleName), not(isVisible()))
        )
    }
}

export const openGanttChartPage = {
    using: (scheduleName: string | Question<any>) => {
        const items = List.of(schedule.scheduleGridTableBody())
        let rowNumber = 0;
        let elementNumber = 3;
        return Task.where(`#actor opens gantt chart page`,
            items.forEach(({ actor, item }) => actor.attemptsTo(
                Check.whether(
                    Text.of(PageElement.located(By.id('ctl00_body_dgSchedule_ctl0' + elementNumber++ + '_lblScheduleName'))),
                    equals(scheduleName)
                ).andIfSo(
                    Click.on(schedule.buttonInGridList('View Single Schedule', rowNumber++)),
                    Wait.until(Page.whichTitle(includes(EDIT_CONTRACT_SCHEDULE)), isPresent()),
                    Switch.to(Page.whichTitle(includes(EDIT_CONTRACT_SCHEDULE))),
                )
            )),

        )

    }
}

export const addMultiScheduleTask = {
    using: (taskInfo: Record<string, string>[]) => {
        const items = List.of(taskInfo)
        const trList = List.of(taskTableTrList())
        return Task.where(`#actor adds multi task`,
            Log.the(Text.of(ganttChartIconButton('Locked'))),
            // 查看是否处于只读状态
            Check.whether(Text.of(ganttChartIconButton('Locked')), equals('Locked')
            ).andIfSo(
                clickGanttChartIconButton.using('Locked')
            ),
            // 删除旧的task信息
            Check.whether(taskTableTrList(), isPresent()).andIfSo(
                trList.forEach(({ actor, item }) => actor.attemptsTo(
                    Click.on(taskTableCell('1', 'Task Name')),
                    clickGanttChartIconButton.using('Remove'),
                    Ensure.eventually(ganttChartMessagePopupBox(), isVisible()),
                    Switch.to(ganttChartMessagePopupBox()).and(
                        Click.on(OkButtonInMessagePopupBox()),
                    ),
                ))
            ),
            // 新增task
            items.forEach(({ actor, item }) => actor.attemptsTo(
                clickGanttChartIconButton.using(ADD),
                RightClick.on(taskTableCell(item.rowNumber, 'Task Name')),
                clickGanttChartTextButton.using('Task information'),
                Ensure.eventually(taskInformationPopup(), isVisible()),
                Switch.to(taskInformationPopup()).and(
                    fillTaskGeneralInfo.using(item),
                    fillTaskResourceInfo.using(item),
                    Click.on(closeButtonInTaskInfoPopup())
                )
            )),
            clickGanttChartIconButton.using(SAVE),
            clickOkButtonInMessageBox(),
            
        )
    }

}

export const fillTaskGeneralInfo = {
    using: (taskInfo: Record<string, string>) => {
        return Task.where(`#actor edit task general information`,
            Click.on(taskInformationPopupTab('General')),
            fillTextInputFieldInTaskPopup.using('Task ID', taskInfo.TaskID),
            fillTextInputFieldInTaskPopup.using('Task Name', taskInfo.TaskName),
            fillTextInputFieldInTaskPopup.using('Start', taskInfo.Start),
            fillTextInputFieldInTaskPopup.using('Finish', taskInfo.Finish),
            Click.on(saveTaskButtonInTaskInfoPopup()),
            clickOkButtonInMessageBox(),

        )
    }

}

export const fillTaskResourceInfo = {
    using: (taskInfo: Record<string, string>) => {
        const resourceList = List.of(taskInfo.Resource.split(','))
        return Task.where(`#actor edit task resource information`,
            Click.on(taskInformationPopupTab('Resources')),
            resourceList.forEach(({ actor, item }) => actor.attemptsTo(
                Click.on(addResourceButtonInTaskInfoPopup()),
                Wait.for(Duration.ofSeconds(2)),
                selectResourceInTaskInfoPopup.using(item)
            )),
            Click.on(saveInterimResultButtonInTaskInfoPopup()),
            clickOkButtonInMessageBox(),
           
        )

    }

}


export const checkMultiScheduleTask = {
    using: (taskInfo: Record<string, string>[]) => {
        const items = List.of(taskInfo)
        return Task.where(`#actor check multi task information`,
            items.forEach(({ actor, item }) => actor.attemptsTo(
                Ensure.eventually(Text.of(taskTableCellValue(item.rowNumber, 'Task Name')), equals(item.TaskName)),
                Ensure.eventually(Text.of(taskTableCellValue(item.rowNumber, 'Task ID')), equals(item.TaskID)),
                Ensure.eventually(Text.of(taskTableCellValue(item.rowNumber, 'Start')), equals(item.Start)),
                Ensure.eventually(Text.of(taskTableCellValue(item.rowNumber, 'Finish')), equals(item.Finish)),
                checkTaskReouceValue.using(item),
            ))
        )
    }
}


export const checkTaskReouceValue = {
    using: (taskInfo: Record<string, string>) => {
        const items = List.of(taskInfo.Resource.split(','))
        return Task.where(`#actor check task resource information`,
            items.forEach(({ actor, item }) => actor.attemptsTo(
                Ensure.eventually(Text.of(taskTableCellValue(taskInfo.rowNumber, 'Resources')), includes(item)),
            ))
        )
    }
}


export const deleteMultiTask = {
    using: (taskInfo: Record<string, string>[]) => {
        const items = List.of(taskInfo)
        return Task.where(`#actor check task resource information`,
            items.forEach(({ actor, item }) => actor.attemptsTo(
                Click.on(taskTableCell(item.rowNumber, 'Task Name')),
                clickGanttChartIconButton.using('Remove'),
                Ensure.eventually(ganttChartMessagePopupBox(), isVisible()),
                Switch.to(ganttChartMessagePopupBox()).and(
                    Click.on(OkButtonInMessagePopupBox()),
                ),
            ))
        )
    }
}
