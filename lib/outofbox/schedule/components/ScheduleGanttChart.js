"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourceNameDropdownItem = exports.resourceNameDropdownIcon = exports.resourceColumnInTaskInfoPopup = exports.resourceListInTaskInfoPopup = exports.addResourceButtonInTaskInfoPopup = exports.OkButtonInMessagePopupBox = exports.ganttChartMessagePopupBox = exports.closeButtonInTaskInfoPopup = exports.saveInterimResultButtonInTaskInfoPopup = exports.saveTaskButtonInTaskInfoPopup = exports.taskInformationPopupTextInputField = exports.taskInformationPopupTab = exports.taskInformationPopup = exports.taskTableCellValue = exports.taskTableCell = exports.taskTableTr = exports.taskTableTrList = exports.taskPanel = exports.ganttChartTextButtonBox = exports.ganttChartTextButton = exports.ganttChartIconButton = exports.clickOkButtonInMessageBox = exports.selectResourceInTaskInfoPopup = exports.fillTextInputFieldInTaskPopup = exports.clickGanttChartTextButton = exports.clickGanttChartIconButton = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
/**
 * 点击schedule gantt chart页面顶部图形按钮
 * @param 按钮名称 （图标下方的文字）
 */
exports.clickGanttChartIconButton = {
    using: (buttonName) => {
        return core_1.Task.where(`#actor click gantt chart icon button`, web_1.Click.on((0, exports.ganttChartIconButton)(buttonName)));
    }
};
/**
 * 点击schedule gantt chart页面点击图形按钮的下拉图标后出现的选项或鼠标右键点击task后出现的选项
 * @param 按钮名称
 */
exports.clickGanttChartTextButton = {
    using: (buttonName) => {
        return core_1.Task.where(`#actor click gantt chart text button`, web_1.Click.on((0, exports.ganttChartTextButton)(buttonName)));
    }
};
/**
 * 在task information popup中填值
 * @param fieldName 字段名称
 * @param itemName 要改成的值
 */
exports.fillTextInputFieldInTaskPopup = {
    using: (fieldName, itemName) => {
        return core_1.Task.where(`#actor fill field ${fieldName} in task information popup with: ${itemName}`, web_1.Click.on((0, exports.taskInformationPopupTextInputField)(fieldName)), web_1.Enter.theValue(itemName).into((0, exports.taskInformationPopupTextInputField)(fieldName)));
    }
};
/**
 * 选择resource
 * @param itemName resource名称
 *
 */
exports.selectResourceInTaskInfoPopup = {
    using: (itemName) => {
        return core_1.Task.where(`#actor select resource: ${itemName}`, web_1.Click.on((0, exports.resourceColumnInTaskInfoPopup)('1', 'Resource Name')), web_1.Click.on((0, exports.resourceNameDropdownIcon)()), web_1.Click.on((0, exports.resourceNameDropdownItem)(itemName)));
    }
};
/**
 * 点击提示信息框Ok按钮
 * @returns
 */
const clickOkButtonInMessageBox = () => core_1.Task.where(`#actor click ok button in message box`, assertions_1.Ensure.eventually((0, exports.ganttChartMessagePopupBox)(), (0, web_1.isVisible)()), web_1.Switch.to((0, exports.ganttChartMessagePopupBox)()).and(web_1.Click.on((0, exports.OkButtonInMessagePopupBox)())));
exports.clickOkButtonInMessageBox = clickOkButtonInMessageBox;
/************************************ html 元素组件 ******************************** */
/**
 * 图形按钮
 * @param buttonName 按钮名称（图形下方显示的名称）
 * @returns
 */
const ganttChartIconButton = (buttonName) => {
    return web_1.PageElement.located(web_1.By.id(scheduleGanttChartIconButtonMap.get(buttonName) + '-btnInnerEl'))
        .describedAs('gantt chart icon button: ' + buttonName);
};
exports.ganttChartIconButton = ganttChartIconButton;
/**
 * 文字按钮（带有下拉图标的按钮点击后出现的选项按钮）
 * @param buttonName 选项名称
 * @returns
 */
const ganttChartTextButton = (buttonName) => {
    // return PageElement.located(By.id(scheduleGanttChartTextButtonMap.get(buttonName) + '-itemEl'))
    return web_1.PageElement.located(web_1.By.cssContainingText('span', buttonName))
        .describedAs('gantt chart text button: ' + buttonName);
};
exports.ganttChartTextButton = ganttChartTextButton;
const ganttChartTextButtonBox = () => web_1.PageElement.located(web_1.By.id('ext-comp-1035-body')).describedAs('gantt chart text button box');
exports.ganttChartTextButtonBox = ganttChartTextButtonBox;
/**
 * task 列表面板
 * @returns
 */
const taskPanel = () => web_1.PageElement.located(web_1.By.css('.x-grid-item-container'))
    .describedAs('task panel');
exports.taskPanel = taskPanel;
/**
 * task所在的行集合
 * @param rowNumber
 * @returns
 */
const taskTableTrList = () => {
    return web_1.PageElements.located(web_1.By.css('.x-grid-tree-node-leaf'))
        .describedAs('task table tr list ');
};
exports.taskTableTrList = taskTableTrList;
/**
 * task所在的行
 * @param rowNumber
 * @returns
 */
const taskTableTr = (rowNumber) => {
    const acutalRow = Number(rowNumber) - 1;
    return web_1.PageElements.located(web_1.By.css('.x-grid-tree-node-leaf'))
        .nth(acutalRow)
        .describedAs('task table tr: ' + rowNumber);
};
exports.taskTableTr = taskTableTr;
/**
 * task各列的单元格
 * @param rowNumber
 * @returns
 */
const taskTableCell = (rowNumber, columnName) => {
    const columnId = taskListColumnNameMap.get(columnName);
    return web_1.PageElement.located(web_1.By.css(`[data-columnid="${columnId}"]`))
        .of((0, exports.taskTableTr)(rowNumber))
        .describedAs('task table cell: ' + columnName);
};
exports.taskTableCell = taskTableCell;
/**
 * task各列的单元格的值
 * @param rowNumber
 * @returns
 */
const taskTableCellValue = (rowNumber, columnName) => {
    return web_1.PageElement.located(web_1.By.css('.x-grid-cell-inner '))
        .of((0, exports.taskTableCell)(rowNumber, columnName))
        .describedAs('task table cell: ' + columnName);
};
exports.taskTableCellValue = taskTableCellValue;
/**
 * task information 弹窗
 * @returns
 */
const taskInformationPopup = () => web_1.PageElement.located(web_1.By.css(`[aria-labelledby="ext-comp-1031_header-title-textEl"]`))
    .describedAs('task information popup window');
exports.taskInformationPopup = taskInformationPopup;
/**
 * task information 弹窗顶部的tab
 * @param tabName tab名称
 * @returns
 */
const taskInformationPopupTab = (tabName) => {
    const tabId = taskInformationPopupTabMap.get(tabName);
    return web_1.PageElement.located(web_1.By.id('tab-' + tabId + '-btnWrap'))
        .describedAs('task information popup tab: ' + tabName);
};
exports.taskInformationPopupTab = taskInformationPopupTab;
/**
 * task information 弹窗中的文本输入框
 * @param fieldName 字段名称
 * @returns
 */
const taskInformationPopupTextInputField = (fieldName) => {
    const elementName = taskInformationPopupFieldMap.get(fieldName);
    return web_1.PageElement.located(web_1.By.css(`[name="${elementName}"]`))
        .describedAs('task information popup text input field: ' + fieldName);
};
exports.taskInformationPopupTextInputField = taskInformationPopupTextInputField;
/**
 * task information 弹窗中 general tab的save按钮
 * @returns
 */
const saveTaskButtonInTaskInfoPopup = () => web_1.PageElement.located(web_1.By.id('btnTaskFormSave-btnInnerEl'))
    .describedAs('save task button in task information popup');
exports.saveTaskButtonInTaskInfoPopup = saveTaskButtonInTaskInfoPopup;
/**
 * task information 弹窗中Predecessors\Resources\Advenced tab的save按钮
 */
const saveInterimResultButtonInTaskInfoPopup = () => web_1.PageElement.located(web_1.By.id('btnSaveInterimResult-btnInnerEl'))
    .describedAs('save interim result button in task information popup');
exports.saveInterimResultButtonInTaskInfoPopup = saveInterimResultButtonInTaskInfoPopup;
/**
 * task information 弹窗的关闭按钮
 * @returns
 */
const closeButtonInTaskInfoPopup = () => web_1.PageElement.located(web_1.By.css(`[data-qtip="Close dialog"]`))
    .of((0, exports.taskInformationPopup)())
    .describedAs('close button in task information popup');
exports.closeButtonInTaskInfoPopup = closeButtonInTaskInfoPopup;
/**
 * 信息提示弹出框窗口
 * @returns
 */
const ganttChartMessagePopupBox = () => web_1.PageElement.located(web_1.By.id('messagebox-1052'))
    .describedAs('gantt chart message popup box');
exports.ganttChartMessagePopupBox = ganttChartMessagePopupBox;
/**
 * 信息提示弹出框窗口的ok按钮
 * @returns
 */
const OkButtonInMessagePopupBox = () => web_1.PageElement.located(web_1.By.id('button-1056-btnInnerEl'))
    .describedAs('Ok Button in message popup box');
exports.OkButtonInMessagePopupBox = OkButtonInMessagePopupBox;
/**
 * task information 弹窗中resources tab的add new按钮
 * @returns
 */
const addResourceButtonInTaskInfoPopup = () => web_1.PageElement.located(web_1.By.id('button-1179-btnInnerEl'))
    .describedAs('add button in task information popup');
exports.addResourceButtonInTaskInfoPopup = addResourceButtonInTaskInfoPopup;
/**
 * task information 弹窗中resource 列表
 * @returns
 */
const resourceListInTaskInfoPopup = () => web_1.PageElement.located(web_1.By.id('gridview-1172'))
    .describedAs('resource list in task information popup');
exports.resourceListInTaskInfoPopup = resourceListInTaskInfoPopup;
/**
 * task information 弹窗中resource列表中的列
 * @param rowNumber 行号
 * @param columnName 列名
 * @returns
 */
const resourceColumnInTaskInfoPopup = (rowNumber, columnName) => {
    const columnId = taskInformationPopupResourceColumnMap.get(columnName);
    const row = Number(rowNumber) - 1;
    return web_1.PageElements.located(web_1.By.css(`[data-columnid="${columnId}"]`))
        .nth(row)
        .describedAs(`row: ${rowNumber} resource column: ${columnName} in task information popup`);
};
exports.resourceColumnInTaskInfoPopup = resourceColumnInTaskInfoPopup;
/**
 * task information 弹窗中resource 列表中的resource name输入框的下拉图标
 * @returns
 */
const resourceNameDropdownIcon = () => {
    return web_1.PageElement.located(web_1.By.id('combo-1170-trigger-picker'))
        .describedAs(`resource name dropdown icon`);
};
exports.resourceNameDropdownIcon = resourceNameDropdownIcon;
/**
 * task information 弹窗中resource 列表中的resource name输入框的下拉选项
 * @param itemName 选项名
 * @returns
 */
const resourceNameDropdownItem = (itemName) => {
    return web_1.PageElement.located(web_1.By.cssContainingText(`[data-boundview="combo-1170-picker"]`, itemName))
        .describedAs(`resource name dropdown item: ${itemName}`);
};
exports.resourceNameDropdownItem = resourceNameDropdownItem;
/********************************* 字段映射 ******************************** */
const scheduleGanttChartIconButtonMap = new Map();
scheduleGanttChartIconButtonMap.set('Locked', 'btnViewEdit');
scheduleGanttChartIconButtonMap.set('Save', 'btnSave');
scheduleGanttChartIconButtonMap.set('Edit General', 'btnEditSchedule');
scheduleGanttChartIconButtonMap.set('Add', 'addTaskButton');
scheduleGanttChartIconButtonMap.set('Remove', 'removeTaskButton');
scheduleGanttChartIconButtonMap.set('Undo', 'undoButton');
scheduleGanttChartIconButtonMap.set('Redo', 'redoButton');
scheduleGanttChartIconButtonMap.set('Indent', 'indentButton');
scheduleGanttChartIconButtonMap.set('outdent', 'outdentButton');
scheduleGanttChartIconButtonMap.set('Collapse', 'btnCollapse');
scheduleGanttChartIconButtonMap.set('ExpandAll', 'btnExpandAll');
scheduleGanttChartIconButtonMap.set('Sub Schedule', 'btnLoadSubSchedule');
scheduleGanttChartIconButtonMap.set('Import/Export', 'btnImportExport');
scheduleGanttChartIconButtonMap.set('Base Lines', 'btnSaveBaseline');
scheduleGanttChartIconButtonMap.set('Template', 'btnSaveTemplate');
scheduleGanttChartIconButtonMap.set('Edit Calendar', 'btnEditCalendar');
scheduleGanttChartIconButtonMap.set('Resources View', 'btnResourceViews');
scheduleGanttChartIconButtonMap.set('Reports', 'btnReports');
scheduleGanttChartIconButtonMap.set('Full Screen', 'btnFullScreen');
scheduleGanttChartIconButtonMap.set('Critical Path', 'btnHighPath');
scheduleGanttChartIconButtonMap.set('Zoom In', 'btnZoomIn');
scheduleGanttChartIconButtonMap.set('Zoom Out', 'btnZoomOut');
scheduleGanttChartIconButtonMap.set('Zoom To Fit', 'btnZoomToFit');
scheduleGanttChartIconButtonMap.set('Previous', 'btnPreviousTimeSpan');
scheduleGanttChartIconButtonMap.set('Today', 'btnGoToToday');
scheduleGanttChartIconButtonMap.set('Next', 'btnNextTimeSpan');
scheduleGanttChartIconButtonMap.set('Reschedule Tasks', 'btnRescheduleTasks');
scheduleGanttChartIconButtonMap.set('Print', 'btnPrint');
scheduleGanttChartIconButtonMap.set('...', 'ext-comp-1061-menu-trigger');
const scheduleGanttChartTextButtonMap = new Map();
scheduleGanttChartTextButtonMap.set('Import from Microsoft Project', 'btnImportFromMsProject');
scheduleGanttChartTextButtonMap.set('Export to Microsoft Project', 'btnExportToMsProject');
scheduleGanttChartTextButtonMap.set('Import Excel Data', 'btnImportFromExcel');
scheduleGanttChartTextButtonMap.set('Export Excel Data', 'btnExportToExcel');
scheduleGanttChartTextButtonMap.set('Save as Schedule Baseline', 'btnSaveAsScheduleBaseline');
scheduleGanttChartTextButtonMap.set('Manage Schedule Baselines', 'menuitem-1062');
scheduleGanttChartTextButtonMap.set('Load From Schedule Template', 'menuitem-1065');
scheduleGanttChartTextButtonMap.set('Save as Schedule Template', 'menuitem-1064');
scheduleGanttChartTextButtonMap.set('Resource Schedule', 'btnResourceSchedule');
scheduleGanttChartTextButtonMap.set('Resource Utilization', 'btnResourceUtilization');
scheduleGanttChartTextButtonMap.set('Resource Histogram', 'btnResourceHistogram');
scheduleGanttChartTextButtonMap.set('Refresh Grid Resources', 'btnRefreshGridResources');
scheduleGanttChartTextButtonMap.set('Contract Schedule Baselines Comparison Report', 'menuitem-1068');
scheduleGanttChartTextButtonMap.set('Contract Schedule Task Status Report', 'menuitem-1069');
// icon button被折叠到...内后
scheduleGanttChartTextButtonMap.set('Template', 'menuitem-1292');
scheduleGanttChartTextButtonMap.set('Edit Calendar', 'menuitem-1252');
scheduleGanttChartTextButtonMap.set('Resources View', 'menuitem-1254');
scheduleGanttChartTextButtonMap.set('Reports', 'menuitem-1255-itemEl');
scheduleGanttChartTextButtonMap.set('Full Screen', 'menuitem-1256');
scheduleGanttChartTextButtonMap.set('Critical Path', 'menuitem-1257');
scheduleGanttChartTextButtonMap.set('Zoom In', 'btnZoommenuitem-1259');
scheduleGanttChartTextButtonMap.set('Zoom Out', 'menuitem-1261-itemEl');
scheduleGanttChartTextButtonMap.set('Zoom To Fit', 'menuitem-1260-itemEl');
scheduleGanttChartTextButtonMap.set('Previous', 'menuitem-1263-itemEl');
scheduleGanttChartTextButtonMap.set('Today', 'menuitem-1264');
scheduleGanttChartTextButtonMap.set('Next', 'menuitem-1265-itemEl');
scheduleGanttChartTextButtonMap.set('Reschedule Tasks', 'menuitem-1267');
scheduleGanttChartTextButtonMap.set('Print', 'menuitem-1268-itemEl');
// task 鼠标右键之后出现的选项
scheduleGanttChartTextButtonMap.set('Task information', 'menuitem-1250');
scheduleGanttChartTextButtonMap.set('Delete task', 'menuitem-1036');
scheduleGanttChartTextButtonMap.set('Edit left label', 'menuitem-1037');
scheduleGanttChartTextButtonMap.set('Convert to milestone', 'menuitem-1038');
scheduleGanttChartTextButtonMap.set('Add', 'menuitem-1039');
scheduleGanttChartTextButtonMap.set('Task below', 'menuitem-1042');
scheduleGanttChartTextButtonMap.set('Milestone', 'menuitem-1043');
scheduleGanttChartTextButtonMap.set('Sub-task', 'menuitem-1044');
scheduleGanttChartTextButtonMap.set('Successor', 'menuitem-1045');
scheduleGanttChartTextButtonMap.set('Predecessor', 'menuitem-1046');
scheduleGanttChartTextButtonMap.set('Delete dependency', 'menuitem-1047');
scheduleGanttChartTextButtonMap.set('Notify', 'menuitem-1049');
scheduleGanttChartTextButtonMap.set('View Audit Trail', 'menuitem-1051');
// task 列表中列名与对应的列id
const taskListColumnNameMap = new Map();
taskListColumnNameMap.set('Task Name', 'cipnamecolumn-1087');
taskListColumnNameMap.set('Task ID', 'ciptaskidcolumn-1090');
taskListColumnNameMap.set('Task Mode', 'cipschedulingmodecolumn-1091');
taskListColumnNameMap.set('Start', 'startdatecolumn-1093');
taskListColumnNameMap.set('Finish', 'enddatecolumn-1095');
taskListColumnNameMap.set('Duration', 'durationcolumn-1097');
taskListColumnNameMap.set('Predecessors', 'cippredecessorcolumn-1100');
taskListColumnNameMap.set('Resources', 'resourceassignmentcolumn-1101');
// task information弹窗tab
const taskInformationPopupTabMap = new Map();
taskInformationPopupTabMap.set('General', '1187');
taskInformationPopupTabMap.set('Predecessors', '1188');
taskInformationPopupTabMap.set('Resources', '1189');
taskInformationPopupTabMap.set('Advanced', '1190');
taskInformationPopupTabMap.set('Documents', '1191');
taskInformationPopupTabMap.set('Risks', '1192');
taskInformationPopupTabMap.set('Issues', '1193');
// task information弹窗字段名称
const taskInformationPopupFieldMap = new Map();
taskInformationPopupFieldMap.set('Task ID', 'TaskID');
taskInformationPopupFieldMap.set('Task Name', 'Name');
taskInformationPopupFieldMap.set('Status', 'TaskStatusID');
taskInformationPopupFieldMap.set('Task Mode', 'SchedulingMode');
taskInformationPopupFieldMap.set('Is Milestone', 'Milestone');
taskInformationPopupFieldMap.set('Start', 'StartDate');
taskInformationPopupFieldMap.set('Finish', 'EndDate');
taskInformationPopupFieldMap.set('Actual Start', 'ActualStartDate');
taskInformationPopupFieldMap.set('Deadline', 'Deadline');
taskInformationPopupFieldMap.set('End', 'EndDate');
taskInformationPopupFieldMap.set('Actual Finish', 'ActualFinishDate');
taskInformationPopupFieldMap.set('Work', 'Effort');
taskInformationPopupFieldMap.set('Duration', 'Duration');
taskInformationPopupFieldMap.set('Actual Duration', 'ActualDuration');
taskInformationPopupFieldMap.set('Actual Work', 'WorkedPerformed');
taskInformationPopupFieldMap.set('% Complete', 'PercentDone');
taskInformationPopupFieldMap.set('% Work Complete', 'WorkPerformedPercent');
taskInformationPopupFieldMap.set('Updated Date', 'UpdatedDate');
//task information弹窗中resource 列表各字段
const taskInformationPopupResourceColumnMap = new Map();
taskInformationPopupResourceColumnMap.set('Resource Name', 'resourcenamecolumn-1173');
taskInformationPopupResourceColumnMap.set('Units', 'assignmentunitscolumn-1174');
taskInformationPopupResourceColumnMap.set('IsTaskOwner', 'checkcolumn-1175');
//# sourceMappingURL=ScheduleGanttChart.js.map