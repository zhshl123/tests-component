"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseResource = exports.BrowseResourceFields = void 0;
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../../common/abstract");
class BrowseResourceFields extends abstract_1.BrowseFormFields {
    constructor(entityMap) {
        super(entityMap);
        this.editButtonInGrid = () => {
            return web_1.PageElements.located(web_1.By.css(`[cid="iconbutton1"]`)).first()
                .describedAs('edit button in grid');
        };
    }
}
exports.BrowseResourceFields = BrowseResourceFields;
exports.browseResource = new BrowseResourceFields(new Map());
//# sourceMappingURL=BrowseResourceFields.js.map