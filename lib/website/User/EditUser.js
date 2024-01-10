"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = exports.EditUser = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const abstract_1 = require("../common/abstract");
const UserAttributes_1 = require("./UserAttributes");
class EditUser extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.ConfirmPasswordInputField = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_txtConfirmPassword'))
            .describedAs('text input input field: ' + fieldName);
        this.fillConfirmPasswordInputField = (fieldName, itemName) => {
            return core_1.Task.where(`#actor fill text input field ${fieldName} with ${itemName}`, web_1.Click.on(this.ConfirmPasswordInputField(fieldName)), web_1.Clear.theValueOf(this.ConfirmPasswordInputField(fieldName)), web_1.Enter.theValue(itemName).into(this.ConfirmPasswordInputField(fieldName)));
        };
        this.selectLookupDropdownItem = (fieldName, itemName) => {
            return core_1.Task.where(`#actor selects dropdown item '${itemName}' in lookup field '${fieldName}'`, 
            // 有值的情况
            core_1.Check.whether(this.lookupInputFieldSingleValue(fieldName), (0, assertions_1.isPresent)()).andIfSo(web_1.Click.on(this.lookupClearButton(fieldName)), web_1.Click.on(this.lookupInputField(fieldName)), 
            // 确保下拉框有值之后再点击lookup图标
            assertions_1.Ensure.eventually(this.lookupDropdownList(fieldName).first(), (0, assertions_1.isPresent)()), 
            // 点击下拉框的值
            web_1.Click.on(this.lookupDropdownItem(fieldName, itemName)), core_1.Wait.for(core_1.Duration.ofSeconds(5))).otherwise(web_1.Click.on(this.lookupInputField(fieldName)), 
            // 确保下拉框有值之后再点击lookup图标
            assertions_1.Ensure.eventually(this.lookupDropdownList(fieldName).first(), (0, assertions_1.isPresent)()), 
            // 点击下拉框的值
            web_1.Click.on(this.lookupDropdownItem(fieldName, itemName)), core_1.Wait.for(core_1.Duration.ofSeconds(5))));
        };
        this.lookupClearButton = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_btnClear'))
            .describedAs('click clear button');
        this.lookupInputFieldSingleValue = (fieldName) => web_1.PageElement.located(web_1.By.css(`[data-temp-type="mtpSelectTag"]`))
            .of(this.lookupInputFieldUl(fieldName))
            .describedAs('lookup field single value: ' + fieldName);
        this.lookupDropdownListBox = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_select_listbox'))
            .describedAs('lookup dropdown list box: ' + fieldName);
        this.dropdownListBox = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_ddlPicklist_listbox'))
            .describedAs('dropdown list box: ' + fieldName);
        this.dropdownItemTitle = (fieldName, itemName) => web_1.PageElements.located(web_1.By.css(`[title="${itemName}"]`))
            .of(this.dropdownListBox(fieldName))
            .describedAs('dropdown item: ' + itemName);
        this.selectDropdownItem = (fieldName, itemName) => {
            return core_1.Task.where(`#actor selects dropdown item: ${itemName}`, web_1.Click.on(this.dropdownField(fieldName)), 
            // 确保下拉框有值之后再点击对应选项
            assertions_1.Ensure.eventually(this.dropdownList(fieldName).first(), (0, assertions_1.isPresent)()), web_1.Click.on(this.dropdownItemTitle(fieldName, itemName).last()));
        };
        this.targetButton = (targetButtonName) => web_1.PageElements.located(web_1.By.css(`[value="${targetButtonName}"]`))
            .describedAs(targetButtonName + 'button');
        this.clickAddSaveButton = (targetButtonName) => {
            return core_1.Task.where(`#actor clicks button '${targetButtonName}' '`, web_1.Click.on(this.targetButton(targetButtonName).first()));
        };
        this.clickEditSaveButton = (targetButtonName) => {
            return core_1.Task.where(`#actor clicks button '${targetButtonName}' '`, web_1.Click.on(this.targetButton(targetButtonName).last()));
        };
        this.NewScopingAreaEditIcon = () => web_1.PageElements.located(web_1.By.css(`[title="Edit"]`)).last()
            .describedAs('Edit Icon of Ranking');
        this.clickNewEditIcon = () => {
            return core_1.Task.where(`#actor click New Edit Icon`, web_1.Click.on(this.NewScopingAreaEditIcon()));
        };
        this.checkTextInputFieldValue = (fieldName, itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check text field: ${fieldName} 's value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('Value').of(this.textInputField(fieldName)), (0, assertions_1.equals)(itemName))) : core_1.Task.where(`#actor check text field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('initialvalue').of(this.textInputField(fieldName)), (0, assertions_1.not)((0, assertions_1.equals)(itemName))));
        };
        this.cencelButton = () => web_1.PageElement.located(web_1.By.id('ctl00_cipActionBar_btnCancel2'))
            .describedAs('cencel action button');
        /**
         * check message popup is visible
         * @returns
         */
        this.waitMessagePopupBoxVisible = () => core_1.Task.where(`#actor check message popup box`, core_1.Wait.until((0, common_1.messagePopupBox)(), (0, web_1.isVisible)()), core_1.Check.whether(web_1.Text.of((0, common_1.messagePopupContent)()), (0, assertions_1.includes)('already')).andIfSo(common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), web_1.Click.on(this.cencelButton())));
    }
}
exports.EditUser = EditUser;
exports.user = new EditUser(UserAttributes_1.userMap);
//# sourceMappingURL=EditUser.js.map