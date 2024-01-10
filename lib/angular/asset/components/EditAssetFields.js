"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assetEdit = exports.EditAssetFields = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
const EditFormFields_1 = require("../../common/abstract/EditFormFields");
const EditAssetAttributes_1 = require("./EditAssetAttributes");
class EditAssetFields extends EditFormFields_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        /**
         * 字段的输入框组合（包含字段名和输入框）
         * @param fieldName 字段名称
         * @param 行数 从section title为第一行起算
         * @returns
         */
        this.assetFieldGroup = (fieldName) => {
            const mappedFieldName = this.entityMap.get(fieldName);
            return web_1.PageElement.located(web_1.By.css(`.c-lygrid__cell_rowspan1[cid="${mappedFieldName}"]`))
                .describedAs('attribute field: ' + fieldName);
        };
        /**
         * assetId输入框
         * @param fieldName 字段名称
         * @returns
         */
        this.assetTextInputField = (fieldName) => web_1.PageElement.located(web_1.By.css('input'))
            .of(this.assetFieldGroup(fieldName))
            .describedAs(`attribute ${fieldName} input filed`);
        /**
         * 下拉框的输入框
         * @param fieldName
         * @returns
         */
        this.dropdownInputField = (fieldName) => web_1.PageElement.located(web_1.By.css('nz-select-top-control'))
            .of(this.assetFieldGroup(fieldName))
            .describedAs('dropdown input field');
        /**
        * 选择下拉框选项
        * @param fieldName
        * @param itemName
        * @returns
        */
        this.selectDropdownItem = (fieldName, itemName) => {
            return core_1.Task.where(`#actor selects dropdown item: ${itemName}`, 
            // 确保下拉框有值之后再点击对应选项
            web_1.Click.on(this.dropdownInputField(fieldName)), assertions_1.Ensure.eventually(this.dropdownList().first(), (0, assertions_1.isPresent)()), web_1.Click.on(this.dropdownItem(itemName)));
        };
        /**
         * 给assetId的field填值
         * @param fieldName 字段名
         * @param itemName 要填的值
         * @returns
         */
        this.fillAssetTextInputField = (fieldName, itemName) => {
            return core_1.Task.where(`#actor fill text input field ${fieldName} with ${itemName}`, web_1.Click.on(this.assetTextInputField(fieldName)), web_1.Clear.theValueOf(this.assetTextInputField(fieldName)), web_1.Enter.theValue(itemName).into(this.assetTextInputField(fieldName)));
        };
        /**
         * 检查文本输入框的值
         * @param fieldName 字段名
         * @param itemName 字段的期望值
         * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
         * @returns
         */
        this.checkAssetTextInputFieldValue = (fieldName, itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check text field: ${fieldName} 's value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('title').of(this.assetTextInputField(fieldName)), (0, assertions_1.equals)(itemName))) : core_1.Task.where(`#actor check text field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('title').of(this.assetTextInputField(fieldName)), (0, assertions_1.not)((0, assertions_1.equals)(itemName))));
        };
    }
}
exports.EditAssetFields = EditAssetFields;
exports.assetEdit = new EditAssetFields(EditAssetAttributes_1.editAssetAttributeMap);
//# sourceMappingURL=EditAssetFields.js.map