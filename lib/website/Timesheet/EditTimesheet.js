"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timesheet = exports.EditTimeSheet = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../common/abstract");
const TimesheetAttributes_1 = require("./TimesheetAttributes");
class EditTimeSheet extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.NewScopingAreaEditIcon = () => web_1.PageElements.located(web_1.By.css(`[title="Edit"]`)).last()
            .describedAs('Edit Icon of Ranking');
        this.clickNewEditIcon = () => {
            return core_1.Task.where(`#actor click New Edit Icon`, web_1.Click.on(this.NewScopingAreaEditIcon()));
        };
        this.selectLookupDropdownItem = (fieldName, itemName) => {
            return core_1.Task.where(`#actor selects dropdown item: ${itemName}`, web_1.Click.on(this.lookupInputField(fieldName)), 
            // 确保下拉框有值
            assertions_1.Ensure.eventually(this.lookupDropdownList(fieldName).first(), (0, assertions_1.isPresent)()), 
            //点击下拉框的值
            web_1.Click.on(this.lookupDropdownItem(fieldName, itemName)), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
        };
        this.dropdownItem = (fieldName, itemName) => web_1.PageElement.located(web_1.By.css(`[title="${itemName}"]`))
            .of(this.dropdownListBox(fieldName))
            .describedAs('dropdown item: ' + itemName);
        this.dropdownListBox = (fieldName) => web_1.PageElements.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_ddlPicklist-list')).last()
            .describedAs('dropdown list box: ' + fieldName);
        this.selectDropdownItem = (fieldName, itemName) => {
            return core_1.Task.where(`#actor selects dropdown item: ${itemName}`, web_1.Click.on(this.dropdownField(fieldName)), 
            // 确保下拉框有值之后再点击对应选项
            assertions_1.Ensure.eventually(this.dropdownList(fieldName).first(), (0, assertions_1.isPresent)()), web_1.Click.on(this.dropdownItem(fieldName, itemName)));
        };
    }
}
exports.EditTimeSheet = EditTimeSheet;
exports.timesheet = new EditTimeSheet(TimesheetAttributes_1.timesheetMap);
//# sourceMappingURL=EditTimesheet.js.map