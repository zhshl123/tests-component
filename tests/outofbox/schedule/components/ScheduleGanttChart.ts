import { Ensure, isPresent } from '@serenity-js/assertions'
import { Check, Log, Task } from '@serenity-js/core'
import { By, Click, Enter, isVisible, PageElement, PageElements, Switch } from '@serenity-js/web'

/**
 * 点击schedule gantt chart页面顶部图形按钮
 * @param 按钮名称 （图标下方的文字）
 */
export const clickGanttChartIconButton = {
    using: (buttonName: string) => {
        return Task.where(`#actor click gantt chart icon button`,
            Click.on(ganttChartIconButton(buttonName))
        )
    }
}

/**
 * 点击schedule gantt chart页面点击图形按钮的下拉图标后出现的选项或鼠标右键点击task后出现的选项
 * @param 按钮名称
 */
export const clickGanttChartTextButton = {
    using: (buttonName: string) => {
        return Task.where(`#actor click gantt chart text button`,
            Click.on(ganttChartTextButton(buttonName))
        )
    }
}

/**
 * 在task information popup中填值
 * @param fieldName 字段名称
 * @param itemName 要改成的值
 */
export const fillTextInputFieldInTaskPopup = {
    using: (fieldName: string, itemName: string) => {
        return Task.where(`#actor fill field ${fieldName} in task information popup with: ${itemName}`,
            Click.on(taskInformationPopupTextInputField(fieldName)),
            Enter.theValue(itemName).into(taskInformationPopupTextInputField(fieldName))
        )
    }
}

/**
 * 选择resource
 * @param itemName resource名称
 * 
 */
export const selectResourceInTaskInfoPopup = {
    using: (itemName: string) => {
        return Task.where(`#actor select resource: ${itemName}`,
            Click.on(resourceColumnInTaskInfoPopup('1', 'Resource Name')),
            Click.on(resourceNameDropdownIcon()),
            Click.on(resourceNameDropdownItem(itemName)),

        )
    }
}

/**
 * 点击提示信息框Ok按钮
 * @returns 
 */
export const clickOkButtonInMessageBox = () =>
    Task.where(`#actor click ok button in message box`,
        Ensure.eventually(ganttChartMessagePopupBox(), isVisible()),
        Switch.to(ganttChartMessagePopupBox()).and(
            Click.on(OkButtonInMessagePopupBox()),
        ),

    )
/************************************ html 元素组件 ******************************** */
/**
 * 图形按钮
 * @param buttonName 按钮名称（图形下方显示的名称）
 * @returns 
 */
export const ganttChartIconButton = (buttonName: string) => {
    return PageElement.located(By.id(scheduleGanttChartIconButtonMap.get(buttonName) + '-btnInnerEl'))
        .describedAs('gantt chart icon button: ' + buttonName)
}

/**
 * 文字按钮（带有下拉图标的按钮点击后出现的选项按钮）
 * @param buttonName 选项名称
 * @returns 
 */
export const ganttChartTextButton = (buttonName: string) => {
    // return PageElement.located(By.id(scheduleGanttChartTextButtonMap.get(buttonName) + '-itemEl'))
    return PageElement.located(By.cssContainingText('span', buttonName))
        .describedAs('gantt chart text button: ' + buttonName)
}

export const ganttChartTextButtonBox = () =>
    PageElement.located(By.id('ext-comp-1035-body')).describedAs('gantt chart text button box')

/**
 * task 列表面板
 * @returns 
 */
export const taskPanel = () =>
    PageElement.located(By.css('.x-grid-item-container'))
        .describedAs('task panel')

/**
 * task所在的行集合
 * @param rowNumber 
 * @returns 
 */
export const taskTableTrList = () => {
    return PageElements.located(By.css('.x-grid-tree-node-leaf'))
        .describedAs('task table tr list ')
}

/**
 * task所在的行
 * @param rowNumber 
 * @returns 
 */
export const taskTableTr = (rowNumber: string) => {
    const acutalRow = Number(rowNumber) - 1
    return PageElements.located(By.css('.x-grid-tree-node-leaf'))
        .nth(acutalRow)
        .describedAs('task table tr: ' + rowNumber)
}

/**
 * task各列的单元格
 * @param rowNumber 
 * @returns 
 */
export const taskTableCell = (rowNumber: string, columnName: string) => {
    const columnId = taskListColumnNameMap.get(columnName)
    return PageElement.located(By.css(`[data-columnid="${columnId}"]`))
        .of(taskTableTr(rowNumber))
        .describedAs('task table cell: ' + columnName)
}

/**
 * task各列的单元格的值
 * @param rowNumber 
 * @returns 
 */
export const taskTableCellValue = (rowNumber: string, columnName: string) => {
    return PageElement.located(By.css('.x-grid-cell-inner '))
        .of(taskTableCell(rowNumber, columnName))
        .describedAs('task table cell: ' + columnName)
}

/**
 * task information 弹窗
 * @returns 
 */
export const taskInformationPopup = () =>
    PageElement.located(By.css(`[aria-labelledby="ext-comp-1031_header-title-textEl"]`))
        .describedAs('task information popup window')

/**
 * task information 弹窗顶部的tab
 * @param tabName tab名称
 * @returns 
 */
export const taskInformationPopupTab = (tabName: string) => {
    const tabId = taskInformationPopupTabMap.get(tabName)
    return PageElement.located(By.id('tab-' + tabId + '-btnWrap'))
        .describedAs('task information popup tab: ' + tabName)
}

/**
 * task information 弹窗中的文本输入框
 * @param fieldName 字段名称
 * @returns 
 */
export const taskInformationPopupTextInputField = (fieldName: string) => {
    const elementName = taskInformationPopupFieldMap.get(fieldName)
    return PageElement.located(By.css(`[name="${elementName}"]`))
        .describedAs('task information popup text input field: ' + fieldName)
}

/**
 * task information 弹窗中 general tab的save按钮
 * @returns 
 */
export const saveTaskButtonInTaskInfoPopup = () =>
    PageElement.located(By.id('btnTaskFormSave-btnInnerEl'))
        .describedAs('save task button in task information popup')

/**
 * task information 弹窗中Predecessors\Resources\Advenced tab的save按钮
 */
export const saveInterimResultButtonInTaskInfoPopup = () =>
    PageElement.located(By.id('btnSaveInterimResult-btnInnerEl'))
        .describedAs('save interim result button in task information popup')

/**
 * task information 弹窗的关闭按钮
 * @returns 
 */
export const closeButtonInTaskInfoPopup = () =>
    PageElement.located(By.css(`[data-qtip="Close dialog"]`))
        .of(taskInformationPopup())
        .describedAs('close button in task information popup')

/**
 * 信息提示弹出框窗口
 * @returns 
 */
export const ganttChartMessagePopupBox = () =>
    PageElement.located(By.id('messagebox-1052'))
        .describedAs('gantt chart message popup box')

/**
 * 信息提示弹出框窗口的ok按钮
 * @returns 
 */
export const OkButtonInMessagePopupBox = () =>
    PageElement.located(By.id('button-1056-btnInnerEl'))
        .describedAs('Ok Button in message popup box')

/**
 * task information 弹窗中resources tab的add new按钮
 * @returns 
 */
export const addResourceButtonInTaskInfoPopup = () =>
    PageElement.located(By.id('button-1179-btnInnerEl'))
        .describedAs('add button in task information popup')

/**
 * task information 弹窗中resource 列表
 * @returns 
 */
export const resourceListInTaskInfoPopup = () =>
    PageElement.located(By.id('gridview-1172'))
        .describedAs('resource list in task information popup')

/**
 * task information 弹窗中resource列表中的列
 * @param rowNumber 行号
 * @param columnName 列名
 * @returns 
 */
export const resourceColumnInTaskInfoPopup = (rowNumber: string, columnName: string) => {
    const columnId = taskInformationPopupResourceColumnMap.get(columnName)
    const row = Number(rowNumber) - 1
    return PageElements.located(By.css(`[data-columnid="${columnId}"]`))
        .nth(row)
        .describedAs(`row: ${rowNumber} resource column: ${columnName} in task information popup`)
}

/**
 * task information 弹窗中resource 列表中的resource name输入框的下拉图标
 * @returns 
 */
export const resourceNameDropdownIcon = () => {
    return PageElement.located(By.id('combo-1170-trigger-picker'))
        .describedAs(`resource name dropdown icon`)
}

/**
 * task information 弹窗中resource 列表中的resource name输入框的下拉选项
 * @param itemName 选项名
 * @returns 
 */
export const resourceNameDropdownItem = (itemName: string) => {
    return PageElement.located(By.cssContainingText(`[data-boundview="combo-1170-picker"]`, itemName))
        .describedAs(`resource name dropdown item: ${itemName}`)
}

/********************************* 字段映射 ******************************** */

const scheduleGanttChartIconButtonMap = new Map()
scheduleGanttChartIconButtonMap.set('Locked', 'btnViewEdit')
scheduleGanttChartIconButtonMap.set('Save', 'btnSave')
scheduleGanttChartIconButtonMap.set('Edit General', 'btnEditSchedule')
scheduleGanttChartIconButtonMap.set('Add', 'addTaskButton')
scheduleGanttChartIconButtonMap.set('Remove', 'removeTaskButton')
scheduleGanttChartIconButtonMap.set('Undo', 'undoButton')
scheduleGanttChartIconButtonMap.set('Redo', 'redoButton')
scheduleGanttChartIconButtonMap.set('Indent', 'indentButton')
scheduleGanttChartIconButtonMap.set('outdent', 'outdentButton')
scheduleGanttChartIconButtonMap.set('Collapse', 'btnCollapse')
scheduleGanttChartIconButtonMap.set('ExpandAll', 'btnExpandAll')
scheduleGanttChartIconButtonMap.set('Sub Schedule', 'btnLoadSubSchedule')
scheduleGanttChartIconButtonMap.set('Import/Export', 'btnImportExport')
scheduleGanttChartIconButtonMap.set('Base Lines', 'btnSaveBaseline')
scheduleGanttChartIconButtonMap.set('Template', 'btnSaveTemplate')
scheduleGanttChartIconButtonMap.set('Edit Calendar', 'btnEditCalendar')
scheduleGanttChartIconButtonMap.set('Resources View', 'btnResourceViews')
scheduleGanttChartIconButtonMap.set('Reports', 'btnReports')
scheduleGanttChartIconButtonMap.set('Full Screen', 'btnFullScreen')
scheduleGanttChartIconButtonMap.set('Critical Path', 'btnHighPath')
scheduleGanttChartIconButtonMap.set('Zoom In', 'btnZoomIn')
scheduleGanttChartIconButtonMap.set('Zoom Out', 'btnZoomOut')
scheduleGanttChartIconButtonMap.set('Zoom To Fit', 'btnZoomToFit')
scheduleGanttChartIconButtonMap.set('Previous', 'btnPreviousTimeSpan')
scheduleGanttChartIconButtonMap.set('Today', 'btnGoToToday')
scheduleGanttChartIconButtonMap.set('Next', 'btnNextTimeSpan')
scheduleGanttChartIconButtonMap.set('Reschedule Tasks', 'btnRescheduleTasks')
scheduleGanttChartIconButtonMap.set('Print', 'btnPrint')
scheduleGanttChartIconButtonMap.set('...', 'ext-comp-1061-menu-trigger')

const scheduleGanttChartTextButtonMap = new Map()
scheduleGanttChartTextButtonMap.set('Import from Microsoft Project', 'btnImportFromMsProject')
scheduleGanttChartTextButtonMap.set('Export to Microsoft Project', 'btnExportToMsProject')
scheduleGanttChartTextButtonMap.set('Import Excel Data', 'btnImportFromExcel')
scheduleGanttChartTextButtonMap.set('Export Excel Data', 'btnExportToExcel')
scheduleGanttChartTextButtonMap.set('Save as Schedule Baseline', 'btnSaveAsScheduleBaseline')
scheduleGanttChartTextButtonMap.set('Manage Schedule Baselines', 'menuitem-1062')
scheduleGanttChartTextButtonMap.set('Load From Schedule Template', 'menuitem-1065')
scheduleGanttChartTextButtonMap.set('Save as Schedule Template', 'menuitem-1064')
scheduleGanttChartTextButtonMap.set('Resource Schedule', 'btnResourceSchedule')
scheduleGanttChartTextButtonMap.set('Resource Utilization', 'btnResourceUtilization')
scheduleGanttChartTextButtonMap.set('Resource Histogram', 'btnResourceHistogram')
scheduleGanttChartTextButtonMap.set('Refresh Grid Resources', 'btnRefreshGridResources')
scheduleGanttChartTextButtonMap.set('Contract Schedule Baselines Comparison Report', 'menuitem-1068')
scheduleGanttChartTextButtonMap.set('Contract Schedule Task Status Report', 'menuitem-1069')

// icon button被折叠到...内后
scheduleGanttChartTextButtonMap.set('Template', 'menuitem-1292')
scheduleGanttChartTextButtonMap.set('Edit Calendar', 'menuitem-1252')
scheduleGanttChartTextButtonMap.set('Resources View', 'menuitem-1254')
scheduleGanttChartTextButtonMap.set('Reports', 'menuitem-1255-itemEl')
scheduleGanttChartTextButtonMap.set('Full Screen', 'menuitem-1256')
scheduleGanttChartTextButtonMap.set('Critical Path', 'menuitem-1257')
scheduleGanttChartTextButtonMap.set('Zoom In', 'btnZoommenuitem-1259')
scheduleGanttChartTextButtonMap.set('Zoom Out', 'menuitem-1261-itemEl')
scheduleGanttChartTextButtonMap.set('Zoom To Fit', 'menuitem-1260-itemEl')
scheduleGanttChartTextButtonMap.set('Previous', 'menuitem-1263-itemEl')
scheduleGanttChartTextButtonMap.set('Today', 'menuitem-1264')
scheduleGanttChartTextButtonMap.set('Next', 'menuitem-1265-itemEl')
scheduleGanttChartTextButtonMap.set('Reschedule Tasks', 'menuitem-1267')
scheduleGanttChartTextButtonMap.set('Print', 'menuitem-1268-itemEl')
// task 鼠标右键之后出现的选项
scheduleGanttChartTextButtonMap.set('Task information', 'menuitem-1250')
scheduleGanttChartTextButtonMap.set('Delete task', 'menuitem-1036')
scheduleGanttChartTextButtonMap.set('Edit left label', 'menuitem-1037')
scheduleGanttChartTextButtonMap.set('Convert to milestone', 'menuitem-1038')
scheduleGanttChartTextButtonMap.set('Add', 'menuitem-1039')
scheduleGanttChartTextButtonMap.set('Task below', 'menuitem-1042')
scheduleGanttChartTextButtonMap.set('Milestone', 'menuitem-1043')
scheduleGanttChartTextButtonMap.set('Sub-task', 'menuitem-1044')
scheduleGanttChartTextButtonMap.set('Successor', 'menuitem-1045')
scheduleGanttChartTextButtonMap.set('Predecessor', 'menuitem-1046')
scheduleGanttChartTextButtonMap.set('Delete dependency', 'menuitem-1047')
scheduleGanttChartTextButtonMap.set('Notify', 'menuitem-1049')
scheduleGanttChartTextButtonMap.set('View Audit Trail', 'menuitem-1051')

// task 列表中列名与对应的列id
const taskListColumnNameMap = new Map()
taskListColumnNameMap.set('Task Name', 'cipnamecolumn-1087')
taskListColumnNameMap.set('Task ID', 'ciptaskidcolumn-1090')
taskListColumnNameMap.set('Task Mode', 'cipschedulingmodecolumn-1091')
taskListColumnNameMap.set('Start', 'startdatecolumn-1093')
taskListColumnNameMap.set('Finish', 'enddatecolumn-1095')
taskListColumnNameMap.set('Duration', 'durationcolumn-1097')
taskListColumnNameMap.set('Predecessors', 'cippredecessorcolumn-1100')
taskListColumnNameMap.set('Resources', 'resourceassignmentcolumn-1101')

// task information弹窗tab
const taskInformationPopupTabMap = new Map()
taskInformationPopupTabMap.set('General', '1187')
taskInformationPopupTabMap.set('Predecessors', '1188')
taskInformationPopupTabMap.set('Resources', '1189')
taskInformationPopupTabMap.set('Advanced', '1190')
taskInformationPopupTabMap.set('Documents', '1191')
taskInformationPopupTabMap.set('Risks', '1192')
taskInformationPopupTabMap.set('Issues', '1193')

// task information弹窗字段名称
const taskInformationPopupFieldMap = new Map()
taskInformationPopupFieldMap.set('Task ID', 'TaskID')
taskInformationPopupFieldMap.set('Task Name', 'Name')
taskInformationPopupFieldMap.set('Status', 'TaskStatusID')
taskInformationPopupFieldMap.set('Task Mode', 'SchedulingMode')
taskInformationPopupFieldMap.set('Is Milestone', 'Milestone')
taskInformationPopupFieldMap.set('Start', 'StartDate')
taskInformationPopupFieldMap.set('Finish', 'EndDate')
taskInformationPopupFieldMap.set('Actual Start', 'ActualStartDate')
taskInformationPopupFieldMap.set('Deadline', 'Deadline')
taskInformationPopupFieldMap.set('End', 'EndDate')
taskInformationPopupFieldMap.set('Actual Finish', 'ActualFinishDate')
taskInformationPopupFieldMap.set('Work', 'Effort')
taskInformationPopupFieldMap.set('Duration', 'Duration')
taskInformationPopupFieldMap.set('Actual Duration', 'ActualDuration')
taskInformationPopupFieldMap.set('Actual Work', 'WorkedPerformed')
taskInformationPopupFieldMap.set('% Complete', 'PercentDone')
taskInformationPopupFieldMap.set('% Work Complete', 'WorkPerformedPercent')
taskInformationPopupFieldMap.set('Updated Date', 'UpdatedDate')

//task information弹窗中resource 列表各字段
const taskInformationPopupResourceColumnMap = new Map()
taskInformationPopupResourceColumnMap.set('Resource Name', 'resourcenamecolumn-1173')
taskInformationPopupResourceColumnMap.set('Units', 'assignmentunitscolumn-1174')
taskInformationPopupResourceColumnMap.set('IsTaskOwner', 'checkcolumn-1175')
