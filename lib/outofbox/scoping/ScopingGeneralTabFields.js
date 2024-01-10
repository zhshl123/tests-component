"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scopingGeneral = exports.ScopingGeneralTabFields = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const abstract_1 = require("../common/abstract");
const ScopingAttributes_1 = require("./ScopingAttributes");
class ScopingGeneralTabFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.textInputField = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_ctl06_' + this.entityMap.get(fieldName)))
            .describedAs('text input field: ' + fieldName);
        this.dropdownField = (fieldName) => {
            const mappedFieldName = this.entityMap.get(fieldName);
            return web_1.PageElement.located(web_1.By.css(`[aria-owns="ctl00_body_ctl06_${mappedFieldName}_ddlPicklist_listbox"]`))
                .describedAs('dropdown field: ' + fieldName);
        };
        this.dropdownListBox = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_ctl06_' + this.entityMap.get(fieldName) + '_ddlPicklist-list'))
            .describedAs('dropdown list box: ' + fieldName);
        this.selectDropdownItem = (fieldName, itemName) => {
            return core_1.Task.where(`#actor selects dropdown item: ${itemName}`, web_1.Click.on(this.dropdownField(fieldName)), 
            // 确保下拉框有值之后再点击对应选项
            assertions_1.Ensure.eventually(this.dropdownList(fieldName).first(), (0, web_1.isVisible)()), web_1.Click.on(this.dropdownItem(fieldName, itemName)));
        };
        this.checkTextInputFieldValue = (fieldName, itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check text field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('initialvalue').of(this.textInputField(fieldName)), (0, assertions_1.equals)(itemName))) : core_1.Task.where(`#actor check text field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('initialvalue').of(this.textInputField(fieldName)), (0, assertions_1.not)((0, assertions_1.equals)(itemName))));
        };
        this.checkDropdownInputFieldValue = (fieldName, itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check dropdown field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('initialvalue').of(this.dropdownField(fieldName)), (0, assertions_1.equals)(itemName))) : core_1.Task.where(`#actor check dropdown field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('initialvalue').of(this.dropdownField(fieldName)), (0, assertions_1.not)((0, assertions_1.equals)(itemName))));
        };
        this.scopingAreaTabBar = () => web_1.PageElement.located(web_1.By.id('ctl00_body_trAreaButton'))
            .describedAs('scoping area tab bar');
        this.scopingAreaTab = (tabName) => web_1.PageElement.located(web_1.By.cssContainingText('a', tabName))
            .of(this.scopingAreaTabBar())
            .describedAs('scoping area tab:' + tabName);
    }
}
exports.ScopingGeneralTabFields = ScopingGeneralTabFields;
exports.scopingGeneral = new ScopingGeneralTabFields(ScopingAttributes_1.scopingMap);
//# sourceMappingURL=ScopingGeneralTabFields.js.map