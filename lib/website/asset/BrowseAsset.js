"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseAssetInfo = exports.BrowseAsset = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const abstract_1 = require(".././common/abstract");
const common_1 = require("../common");
const GridList_1 = require("../common/GridList");
const AssetAttributes_1 = require("./AssetAttributes");
class BrowseAsset extends abstract_1.SearchFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.textInputField = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_txt' + this.entityMap.get(fieldName)))
            .describedAs('text input input field: ' + fieldName);
        this.searchItemInBrowsePage = (fieldName, itemName) => {
            return core_1.Task.where(`#actor search item: ${itemName} with ${fieldName}`, this.fillTextInputField(fieldName, itemName), common_1.clickButton.using(DefaultStaticParams_1.SEARCH), core_1.Wait.for(core_1.Duration.ofSeconds(3)), (0, GridList_1.checkGridList)());
        };
    }
}
exports.BrowseAsset = BrowseAsset;
exports.browseAssetInfo = new BrowseAsset(AssetAttributes_1.assetMap);
//# sourceMappingURL=BrowseAsset.js.map