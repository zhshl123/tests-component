"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorBrowse = exports.BrowseVendorFields = void 0;
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../../common/abstract");
class BrowseVendorFields extends abstract_1.BrowseFormFields {
    constructor(entityMap) {
        super(entityMap);
        this.editButtonInGrid = () => {
            return web_1.PageElements.located(web_1.By.css(`[cid="iconbutton5"]`)).first()
                .describedAs('edit button in grid');
        };
        this.deleteButtonInGrid = () => {
            return web_1.PageElements.located(web_1.By.css(`[cid="iconbutton6"]`)).first()
                .describedAs('delete button in grid');
        };
    }
}
exports.BrowseVendorFields = BrowseVendorFields;
exports.vendorBrowse = new BrowseVendorFields(new Map());
//# sourceMappingURL=BrowseVendorFields.js.map