"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAssetForAngular = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../../website/common");
const common_2 = require("../common");
const StaticCookie_1 = require("../common/statics/StaticCookie");
const AddAssetFields_1 = require("./components/AddAssetFields");
exports.addAssetForAngular = {
    using: (assetInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor add asset with ${assetInfo}`, AddAssetFields_1.assetAdd.fillAssetTextInputField('Asset ID', 2, assetInfo.rowsHash().AssetID + timestamp), AddAssetFields_1.assetAdd.setCookie(StaticCookie_1.COOKIE_ASSET_ID, assetInfo.rowsHash().AssetID + timestamp), AddAssetFields_1.assetAdd.fillAssetTextInputField('Asset Name', 2, assetInfo.rowsHash().AssetName + timestamp), AddAssetFields_1.assetAdd.setCookie(StaticCookie_1.COOKIE_ASSET_NAME, assetInfo.rowsHash().AssetID + timestamp), AddAssetFields_1.assetAdd.selectAssetDropdownItem('Asset Type', 3, assetInfo.rowsHash().AssetType), AddAssetFields_1.assetAdd.selectAssetDropdownItem('Asset Status', 4, assetInfo.rowsHash().AssetStatus), AddAssetFields_1.assetAdd.selectAssetDropdownItem('Acquisition Code', 4, assetInfo.rowsHash().AcquisitionCode), AddAssetFields_1.assetAdd.fillDateInputField('Acquisition Date', assetInfo.rowsHash().AcquisitionDate), AddAssetFields_1.assetAdd.fillDateInputField('Placement Date', assetInfo.rowsHash().PlacementDate), AddAssetFields_1.assetAdd.fillTextInputField('Original Value', assetInfo.rowsHash().OriginalValue), web_1.Click.on(common_2.targetButton.getButton(DefaultStaticParams_1.SAVE)), (0, common_2.checkAndClosePopupWindow)());
    }
};
//# sourceMappingURL=AddAsset.js.map