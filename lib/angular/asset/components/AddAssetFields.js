"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assetAdd = exports.AddAssetFields = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const EditFormFields_1 = require("../../common/abstract/EditFormFields");
const AddAssetAttributes_1 = require("./AddAssetAttributes");
class AddAssetFields extends EditFormFields_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        /**
         * 字段的输入框组合（包含字段名和输入框）
         * @param fieldName 字段名称
         * @param 行数 从section title为第一行起算
         * @returns
         */
        this.assetFieldGroup = (fieldName, rowNumber) => {
            const mappedFieldName = this.entityMap.get(fieldName);
            return web_1.PageElement.located(web_1.By.css(`.c-lygrid__cell_rowend${rowNumber}[cid="${mappedFieldName}"]`))
                .describedAs('attribute field: ' + fieldName);
        };
        /**
         * assetId输入框
         * @param fieldName 字段名称
         * @returns
         */
        this.assetTextInputField = (fieldName, rowNumber) => web_1.PageElement.located(web_1.By.css('input'))
            .of(this.assetFieldGroup(fieldName, rowNumber))
            .describedAs(`attribute ${fieldName} input filed`);
        /**
         * 给assetId的field填值
         * @param fieldName 字段名
         * @param itemName 要填的值
         * @returns
         */
        this.fillAssetTextInputField = (fieldName, rowNumber, itemName) => {
            return core_1.Task.where(`#actor fill text input field ${fieldName} with ${itemName}`, web_1.Click.on(this.assetTextInputField(fieldName, rowNumber)), web_1.Clear.theValueOf(this.assetTextInputField(fieldName, rowNumber)), web_1.Enter.theValue(itemName).into(this.assetTextInputField(fieldName, rowNumber)));
        };
        /**
        * 选择下拉框选项
        * @param fieldName
        * @param itemName
        * @returns
        */
        this.selectAssetDropdownItem = (fieldName, rowNumber, itemName) => {
            return core_1.Task.where(`#actor selects dropdown item: ${itemName}`, web_1.Click.on(this.assetTextInputField(fieldName, rowNumber)), 
            // 确保下拉框有值之后再点击对应选项
            assertions_1.Ensure.eventually(this.dropdownList().first(), (0, assertions_1.isPresent)()), web_1.Click.on(this.dropdownItem(itemName)));
        };
    }
}
exports.AddAssetFields = AddAssetFields;
exports.assetAdd = new AddAssetFields(AddAssetAttributes_1.addAssetAttributeMap);
//# sourceMappingURL=AddAssetFields.js.map