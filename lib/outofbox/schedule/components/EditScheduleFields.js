"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schedule = exports.EditScheduleFields = void 0;
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../../common/abstract");
const ScheduleAttributes_1 = require("./ScheduleAttributes");
class EditScheduleFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.scheduleGridTable = () => web_1.PageElement.located(web_1.By.id('ctl00_body_dgSchedule'))
            .describedAs('schedule grid table');
        this.scheduleGridCheckbox = (itemName) => {
            return web_1.PageElement.located(web_1.By.id(web_1.Attribute.called('id').of(this.scheduleNameCellInGrid(itemName)).replace('_lblScheduleName', '_GridView_ItemCheckBox')))
                .describedAs(`schedule name: ${itemName} checkbox`);
        };
        this.scheduleNameCellInGrid = (itemName) => {
            return web_1.PageElements.located(web_1.By.cssContainingText('span', itemName))
                .first()
                .of(this.scheduleGridTable())
                .describedAs(`schedule name: ${itemName} cell in grid`);
        };
        this.scheduleGridTableBody = () => {
            return web_1.PageElements.located(web_1.By.css('.cstdgrid__bodyrow'))
                .of(this.scheduleGridTable())
                .describedAs(`schedule grid table body`);
        };
        this.buttonInGridList = (buttonName, rowNumber) => {
            return web_1.PageElements.located(web_1.By.css(`[title="${buttonName}"]`))
                .nth(rowNumber)
                .of(this.scheduleGridTable())
                .describedAs(`row: ${rowNumber} button ${buttonName} in grid`);
        };
    }
}
exports.EditScheduleFields = EditScheduleFields;
exports.schedule = new EditScheduleFields(ScheduleAttributes_1.scheduleAttributeMap);
//# sourceMappingURL=EditScheduleFields.js.map