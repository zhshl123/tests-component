"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Filtering = exports.EditFiltering = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../common/abstract");
const FilteringAttributes_1 = require("./FilteringAttributes");
class EditFiltering extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.dropdownListBox = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_ddlPicklist_listbox'))
            .describedAs('dropdown list box: ' + fieldName);
        this.NewScopingAreaEditIcon = () => web_1.PageElements.located(web_1.By.css(`[title="Edit"]`)).last()
            .describedAs('Edit Icon of Ranking');
        this.clickNewEditIcon = () => {
            return core_1.Task.where(`#actor click New Edit Icon`, web_1.Click.on(this.NewScopingAreaEditIcon()));
        };
    }
}
exports.EditFiltering = EditFiltering;
exports.Filtering = new EditFiltering(FilteringAttributes_1.FilteringMap);
//# sourceMappingURL=EditFitlering.js.map