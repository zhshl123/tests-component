"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assetBrowse = exports.BrowseAssetFields = void 0;
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../../common/abstract");
class BrowseAssetFields extends abstract_1.BrowseFormFields {
    constructor(entityMap) {
        super(entityMap);
        this.editButtonInGrid = () => {
            return web_1.PageElements.located(web_1.By.css(`[cid="iconbutton1"]`)).first()
                .describedAs('edit button in grid');
        };
        this.printBarCodeButtonInGrid = () => {
            return web_1.PageElements.located(web_1.By.css(`[cid="iconbutton2"]`)).first()
                .describedAs('print bar code button in grid');
        };
    }
}
exports.BrowseAssetFields = BrowseAssetFields;
exports.assetBrowse = new BrowseAssetFields(new Map());
//# sourceMappingURL=BrowseAssetFields.js.map