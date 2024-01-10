"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CS = exports.EditCS = void 0;
/* eslint-disable unicorn/filename-case */
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../common/abstract");
const CSAttributes_1 = require("./CSAttributes");
class EditCS extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.dropdownListBox = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_ddlPicklist_listbox'))
            .describedAs('dropdown list box: ' + fieldName);
        this.selectDropdownItemB = (fieldName, itemName) => {
            return core_1.Task.where(`#actor selects dropdown item: ${itemName}`, web_1.Click.on(this.dropdownFieldB(fieldName)), 
            // 确保下拉框有值之后再点击对应选项
            assertions_1.Ensure.eventually(this.dropdownListB(fieldName).first(), (0, assertions_1.isPresent)()), web_1.Click.on(this.dropdownItemB(fieldName, itemName)));
        };
        this.dropdownFieldB = (fieldName) => {
            const mappedFieldName = this.entityMap.get(fieldName);
            return web_1.PageElement.located(web_1.By.css(`[aria-owns="ctl00_body_${mappedFieldName}_listbox"]`))
                .describedAs('dropdown field: ' + fieldName);
        };
        this.dropdownListBoxB = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_listbox'))
            .describedAs('dropdown list box: ' + fieldName);
        this.dropdownListB = (fieldName) => web_1.PageElements.located(web_1.By.css('li')).of(this.dropdownListBoxB(fieldName))
            .describedAs('dropdown list: ' + fieldName);
        this.dropdownItemB = (fieldName, itemName) => web_1.PageElement.located(web_1.By.css(`[data-offset-index="${itemName}"]`))
            .of(this.dropdownListBoxB(fieldName))
            .describedAs('dropdown item: ' + itemName);
        this.clickLink = () => web_1.PageElements.located(web_1.By.css(`[class="clinktext"]`)).last();
        this.clickLinktoEdit = () => {
            return core_1.Task.where('Click new cycle link to edit', web_1.Click.on(this.clickLink()));
        };
    }
}
exports.EditCS = EditCS;
exports.CS = new EditCS(CSAttributes_1.CSMap);
//# sourceMappingURL=EditCS.js.map