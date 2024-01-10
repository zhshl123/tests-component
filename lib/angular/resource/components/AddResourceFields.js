"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseResources = exports.resourceEdit = exports.resourceAdd = exports.EditResourceFields = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const BrowseFormFields_1 = require("../../common/abstract/BrowseFormFields");
const EditFormFields_1 = require("../../common/abstract/EditFormFields");
const AddResourceAttribute_1 = require("./AddResourceAttribute");
const EditResourceAttribute_1 = require("./EditResourceAttribute");
class EditResourceFields extends EditFormFields_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        /**
         * 字段的输入框组合（包含字段名和输入框）
         * @param fieldName 字段名称
         * @param rowNumber
         * @returns
         */
        this.resourceFieldGroup = (fieldName, rowNumber) => {
            const mappedFieldName = this.entityMap.get(fieldName);
            return web_1.PageElement.located(web_1.By.css(`.c-lygrid__cell_rowspan${rowNumber}[cid="${mappedFieldName}"]`))
                .describedAs('attribute field: ' + fieldName);
        };
        /**
         * resourcename输入框
         * @param fieldName 字段名称
         * @returns
         */
        this.resourceTextInputField = (fieldName, rowNumber) => web_1.PageElement.located(web_1.By.css('input'))
            .of(this.resourceFieldGroup(fieldName, rowNumber))
            .describedAs(`attribute ${fieldName} input filed`);
        /**
         * 给ResourceName的field填值
         * @param fieldName 字段名
         * @param itemName 要填的值
         * @returns
         */
        this.fillResourceTextInputField = (fieldName, rowNumber, itemName) => {
            return core_1.Task.where(`#actor fill text input field ${fieldName} with ${itemName}`, web_1.Click.on(this.resourceTextInputField(fieldName, rowNumber)), web_1.Clear.theValueOf(this.resourceTextInputField(fieldName, rowNumber)), web_1.Enter.theValue(itemName).into(this.resourceTextInputField(fieldName, rowNumber)));
        };
        /**
        * 点击单选框按钮
        * @param fieldName
        * @param itemName
        * @returns
        */
        this.clickRadioButton = (fieldName, itemName) => {
            return core_1.Task.where(`#actor click radio button: ${itemName}`, core_1.Check.whether(this.selectedRadioButton(fieldName, itemName), (0, web_1.isVisible)()).andIfSo(core_1.Log.the(itemName + 'radio button already selected')).otherwise(web_1.Click.on(this.radioButton(fieldName, itemName))));
        };
    }
}
exports.EditResourceFields = EditResourceFields;
exports.resourceAdd = new EditResourceFields(AddResourceAttribute_1.addResourceAttributeMap);
exports.resourceEdit = new EditResourceFields(EditResourceAttribute_1.editResourceAttributeMap);
exports.browseResources = new BrowseFormFields_1.BrowseFormFields(new Map());
//# sourceMappingURL=AddResourceFields.js.map