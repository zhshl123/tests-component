"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asset = exports.EditAsset = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../common/abstract");
const AssetAttributes_1 = require("./AssetAttributes");
class EditAsset extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.dropdownFieldA = (fieldName) => {
            const mappedFieldName = this.entityMap.get(fieldName);
            return web_1.PageElement.located(web_1.By.css(`[aria-owns="ctl00_body_ddl${mappedFieldName}_listbox"]`))
                .describedAs('dropdown field: ' + fieldName);
        };
        this.dropdownListBoxA = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_ddl' + this.entityMap.get(fieldName) + '_listbox'))
            .describedAs('dropdown list box: ' + fieldName);
        this.dropdownListA = (fieldName) => web_1.PageElements.located(web_1.By.css('li')).of(this.dropdownListBoxA(fieldName))
            .describedAs('dropdown list: ' + fieldName);
        this.dropdownItemA = (fieldName, itemName) => web_1.PageElements.located(web_1.By.cssContainingText('.combobox-span', itemName)).last()
            .of(this.dropdownListBoxA(fieldName))
            .describedAs('dropdown item: ' + itemName);
        this.selectDropdownItemA = (fieldName, itemName) => {
            return core_1.Task.where(`#actor selects dropdown item: ${itemName}`, web_1.Click.on(this.dropdownFieldA(fieldName)), 
            // 确保下拉框有值之后再点击对应选项
            assertions_1.Ensure.eventually(this.dropdownListA(fieldName).first(), (0, assertions_1.isPresent)()), web_1.Click.on(this.dropdownItemA(fieldName, itemName)));
        };
        this.textInputFieldA = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_txt' + this.entityMap.get(fieldName)))
            .describedAs('text input input field: ' + fieldName);
        this.fillTextInputFieldA = (fieldName, itemName) => {
            return core_1.Task.where(`#actor fill text input field ${fieldName} with ${itemName}`, web_1.Click.on(this.textInputFieldA(fieldName)), web_1.Clear.theValueOf(this.textInputFieldA(fieldName)), web_1.Enter.theValue(itemName).into(this.textInputFieldA(fieldName)));
        };
    }
}
exports.EditAsset = EditAsset;
exports.asset = new EditAsset(AssetAttributes_1.assetMap);
//# sourceMappingURL=EditAsset.js.map