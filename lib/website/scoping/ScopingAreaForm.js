"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScopingAreaForm = exports.EditScopingArea = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const abstract_1 = require("../common/abstract");
const ScopingAttributes_1 = require("./ScopingAttributes");
class EditScopingArea extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.textInputField = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_ucScopingArea_' + this.entityMap.get(fieldName)))
            .describedAs('text input field: ' + fieldName);
        this.fillTextInputField = (fieldName, itemName) => {
            return core_1.Task.where(`#actor fill text input field ${fieldName} with ${itemName}`, web_1.Click.on(this.textInputField(fieldName)), web_1.Clear.theValueOf(this.textInputField(fieldName)), web_1.Enter.theValue(itemName).into(this.textInputField(fieldName)));
        };
        this.dropdownField = (fieldName) => {
            const mappedFieldName = this.entityMap.get(fieldName);
            return web_1.PageElement.located(web_1.By.css(`[aria-owns="ctl00_body_ucScopingArea_ddl${mappedFieldName}_listbox"]`))
                .describedAs('dropdown field: ' + fieldName);
        };
        this.dropdownListBox = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_ucScopingArea_ddl' + this.entityMap.get(fieldName) + '_listbox'))
            .describedAs('dropdown list box: ' + fieldName);
        this.dropdownList = (fieldName) => web_1.PageElements.located(web_1.By.css('li')).of(this.dropdownListBox(fieldName))
            .describedAs('dropdown list: ' + fieldName);
        this.selectDropdownItem = (fieldName, itemName) => {
            return core_1.Task.where(`#actor selects dropdown item: ${itemName}`, web_1.Click.on(this.dropdownField(fieldName)), 
            // 确保下拉框有值之后再点击对应选项
            assertions_1.Ensure.eventually(this.dropdownList(fieldName).first(), (0, web_1.isVisible)()), web_1.Click.on(this.dropdownItem(fieldName, itemName)));
        };
        this.Checkbox = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_ucScopingArea_' + this.entityMap.get(fieldName)))
            .describedAs('radio button group:' + fieldName);
        this.clickSingleCheckBox = (fieldName, itemName) => {
            return core_1.Task.where(`#actor click ${fieldName} single check box: ${itemName}`, web_1.Click.on(this.Checkbox(fieldName)));
        };
        this.checkTextInputFieldValue = (fieldName, itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check text field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('initialvalue').of(this.textInputField(fieldName)), (0, assertions_1.equals)(itemName))) : core_1.Task.where(`#actor check text field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('initialvalue').of(this.textInputField(fieldName)), (0, assertions_1.not)((0, assertions_1.equals)(itemName))));
        };
        this.checkDropdownInputFieldValue = (fieldName, itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check dropdown field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('initialvalue').of(this.dropdownField(fieldName)), (0, assertions_1.equals)(itemName))) : core_1.Task.where(`#actor check dropdown field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('initialvalue').of(this.dropdownField(fieldName)), (0, assertions_1.not)((0, assertions_1.equals)(itemName))));
        };
        this.Panel = () => web_1.PageElement.located(web_1.By.id('ctl00_body_tdEditScopingArea'))
            .describedAs('panel : Edit Scoping Area');
        this.NewScopingAreaDeleteIcon = () => web_1.PageElements.located(web_1.By.css(`[title="Delete"]`)).last()
            .describedAs('Delete icon of New Scoping Area');
        this.clickNewDelteIcon = () => {
            return core_1.Task.where(`#actor click New Delete Icon`, web_1.Click.on(this.NewScopingAreaDeleteIcon()));
        };
        this.NewScopingAreaEditIcon = () => web_1.PageElements.located(web_1.By.css(`[title="Edit"]`)).last()
            .describedAs('Edit Icon of New Scoping Area');
        this.clickNewEditIcon = () => {
            return core_1.Task.where(`#actor click New Edit Icon`, web_1.Click.on(this.NewScopingAreaEditIcon()));
        };
    }
}
exports.EditScopingArea = EditScopingArea;
exports.ScopingAreaForm = new EditScopingArea(ScopingAttributes_1.scopingMap);
//# sourceMappingURL=ScopingAreaForm.js.map