"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permit = exports.EditPermit = void 0;
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../common/abstract");
const PermitAttributes_1 = require("./PermitAttributes");
class EditPermit extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.dropdownField = (fieldName) => {
            const mappedFieldName = this.entityMap.get(fieldName);
            return web_1.PageElement.located(web_1.By.css(`[aria-describedby="ctl00_body_${mappedFieldName}_select_taglist"]`))
                .describedAs('dropdown field: ' + fieldName);
        };
    }
}
exports.EditPermit = EditPermit;
exports.permit = new EditPermit(PermitAttributes_1.permitMap);
//# sourceMappingURL=EditPermit.js.map