"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ranking = exports.EditRanking = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const abstract_1 = require("../common/abstract");
const RankingAttributes_1 = require("./RankingAttributes");
class EditRanking extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.textInputField = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_txt' + this.entityMap.get(fieldName)))
            .describedAs('text input input field: ' + fieldName);
        this.dropdownField = (fieldName) => {
            const mappedFieldName = this.entityMap.get(fieldName);
            return web_1.PageElement.located(web_1.By.css(`[aria-owns="ctl00_body_${mappedFieldName}_listbox"]`))
                .describedAs('dropdown field: ' + fieldName);
        };
        this.dropdownListBox = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_listbox'))
            .describedAs('dropdown list box: ' + fieldName);
        this.dropdownList = (fieldName) => web_1.PageElements.located(web_1.By.css('li')).of(this.dropdownListBox(fieldName))
            .describedAs('dropdown list: ' + fieldName);
        this.dateInputField = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName)))
            .describedAs('date input field: ' + fieldName);
        this.dateCalendarIcon = (fieldName) => {
            const mappedFieldName = this.entityMap.get(fieldName);
            return web_1.PageElement.located(web_1.By.css(`[aria-controls="ctl00_body_${mappedFieldName}_dateview"]`))
                .describedAs('date calendar icon: ' + fieldName);
        };
        this.checkTextInputFieldValue = (fieldName, itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check text field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('value').of(this.textInputField(fieldName)), (0, assertions_1.equals)(itemName))) : core_1.Task.where(`#actor check text field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('value').of(this.textInputField(fieldName)), (0, assertions_1.not)((0, assertions_1.equals)(itemName))));
        };
        this.checkDropdownInputFieldValue = (fieldName, itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check dropdown field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('title').of(this.dropdownField(fieldName)), (0, assertions_1.equals)(itemName))) : core_1.Task.where(`#actor check dropdown field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('title').of(this.dropdownField(fieldName)), (0, assertions_1.not)((0, assertions_1.equals)(itemName))));
        };
        this.checkDateInputFieldValue = (fieldName, itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check date field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('value').of(this.dateInputField(fieldName)), (0, assertions_1.equals)(itemName))) : core_1.Task.where(`#actor check date field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('value').of(this.dateInputField(fieldName)), (0, assertions_1.not)((0, assertions_1.equals)(itemName))));
        };
    }
}
exports.EditRanking = EditRanking;
exports.ranking = new EditRanking(RankingAttributes_1.rankingMap);
//# sourceMappingURL=EditRanking.js.map