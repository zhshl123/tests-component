"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAssetForAngular = exports.updateAssetForAngular = exports.checkAssetForAngular = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../../website/common");
const common_2 = require("../common");
const ClikButton_1 = require("../common/ClikButton");
const StaticCookie_1 = require("../common/statics/StaticCookie");
const EditAssetFields_1 = require("./components/EditAssetFields");
exports.checkAssetForAngular = {
    using: (assetInfo) => {
        return core_1.Task.where(`#actor check asset information`, EditAssetFields_1.assetEdit.checkAssetTextInputFieldValue('Asset ID', web_1.Cookie.called(StaticCookie_1.COOKIE_ASSET_ID).value(), DefaultStaticParams_1.SUCCEEDED), EditAssetFields_1.assetEdit.checkAssetTextInputFieldValue('Asset Name', web_1.Cookie.called(StaticCookie_1.COOKIE_ASSET_NAME).value(), DefaultStaticParams_1.SUCCEEDED), EditAssetFields_1.assetEdit.checkDropdownFieldValue('Asset Type', assetInfo.rowsHash().AssetType, DefaultStaticParams_1.SUCCEEDED), EditAssetFields_1.assetEdit.checkDropdownFieldValue('Asset Status', assetInfo.rowsHash().AssetStatus, DefaultStaticParams_1.SUCCEEDED), EditAssetFields_1.assetEdit.checkNumberInputFieldValue('Original Value', assetInfo.rowsHash().OriginalValue, DefaultStaticParams_1.SUCCEEDED));
    }
};
exports.updateAssetForAngular = {
    using: (assetInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor update asset with ${assetInfo}`, EditAssetFields_1.assetEdit.fillAssetTextInputField('Asset ID', assetInfo.rowsHash().AssetID + timestamp), EditAssetFields_1.assetEdit.setCookie(StaticCookie_1.COOKIE_ASSET_ID, assetInfo.rowsHash().AssetID + timestamp), EditAssetFields_1.assetEdit.fillAssetTextInputField('Asset Name', assetInfo.rowsHash().AssetName + timestamp), EditAssetFields_1.assetEdit.setCookie(StaticCookie_1.COOKIE_ASSET_NAME, assetInfo.rowsHash().AssetID + timestamp), EditAssetFields_1.assetEdit.clearDropdownSelectedItem('Asset Type'), EditAssetFields_1.assetEdit.selectDropdownItem('Asset Type', assetInfo.rowsHash().AssetType), EditAssetFields_1.assetEdit.clearDropdownSelectedItem('Asset Status'), EditAssetFields_1.assetEdit.selectDropdownItem('Asset Status', assetInfo.rowsHash().AssetStatus), EditAssetFields_1.assetEdit.clearDropdownSelectedItem('Acquisition Code'), EditAssetFields_1.assetEdit.selectDropdownItem('Acquisition Code', assetInfo.rowsHash().AcquisitionCode), EditAssetFields_1.assetEdit.fillDateInputField('Acquisition Date', assetInfo.rowsHash().AcquisitionDate), EditAssetFields_1.assetEdit.fillDateInputField('Placement Date', assetInfo.rowsHash().PlacementDate), EditAssetFields_1.assetEdit.fillTextInputField('Original Value', assetInfo.rowsHash().OriginalValue), web_1.Click.on(ClikButton_1.targetButton.getButton(DefaultStaticParams_1.SAVE)), (0, common_2.checkAndClosePopupWindow)());
    }
};
const deleteAssetForAngular = () => core_1.Task.where(`#actor delete asset information`, ClikButton_1.clickButton.using(DefaultStaticParams_1.DELETE), assertions_1.Ensure.eventually((0, common_2.iconInAlertMessageBox)(), (0, web_1.isVisible)()), web_1.Click.on((0, common_2.buttonInAlertMessageBox)(DefaultStaticParams_1.OK)), core_1.Wait.for(core_1.Duration.ofSeconds(3)));
exports.deleteAssetForAngular = deleteAssetForAngular;
//# sourceMappingURL=EditAsset.js.map