"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entityDocument = exports.EntityDocumentFields = void 0;
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../../common/abstract");
const DocumentAttributes_1 = require("./DocumentAttributes");
// entity中的document tab页面 例：project
class EntityDocumentFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.selectAllCheckBox = () => web_1.PageElement.located(web_1.By.id('ctl00_body_gvDoc_ctl02_GridView_HearderCheckBox'))
            .describedAs('entity document select all check box');
        this.gridButton = (buttonName) => web_1.PageElement.located(web_1.By.id('ctl00_body_gvDoc_ctl01_cc' + gridButtonMap.get(buttonName)))
            .describedAs('entity document grig button:' + buttonName);
    }
}
exports.EntityDocumentFields = EntityDocumentFields;
exports.entityDocument = new EntityDocumentFields(DocumentAttributes_1.documentAttributeMap);
const gridButtonMap = new Map();
gridButtonMap.set('Add', 'AddFiles');
gridButtonMap.set('Batch Delete', 'BatchDelete');
//# sourceMappingURL=EntityDocumentFields.js.map