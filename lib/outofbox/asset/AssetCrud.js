"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAsset = exports.checkAsset = exports.editWO = exports.addWO = exports.addAsset = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const EditAsset_1 = require("./EditAsset");
exports.addAsset = {
    using: (assetInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor Input all fields and save `, EditAsset_1.asset.fillTextInputField('Asset ID', assetInfo.rowsHash().AssetID + timestamp), EditAsset_1.asset.setCookie(statics_1.COOKIE_ASSET_ID, assetInfo.rowsHash().AssetID + timestamp), EditAsset_1.asset.fillTextInputField('Asset Name', assetInfo.rowsHash().AssetName), EditAsset_1.asset.selectDropdownItem('Asset Type', assetInfo.rowsHash().AssetType), EditAsset_1.asset.selectDropdownItem('Asset Status', assetInfo.rowsHash().AssetStatus), EditAsset_1.asset.selectDropdownItem('Acquisition Code', assetInfo.rowsHash().AcquisitionCode), EditAsset_1.asset.selectSpecialDate('Acquisition Date', assetInfo.rowsHash().AcquisitionDate, 0), EditAsset_1.asset.selectSpecialDate('Placement Date', assetInfo.rowsHash().PlacementDate, 1), EditAsset_1.asset.fillAmountInputField('Original Value', assetInfo.rowsHash().OriginalValue), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.addWO = {
    using: (WOInfo) => {
        const timestamp = common_1.formatted_now;
        const AssetId = web_1.Cookie.called(statics_1.COOKIE_ASSET_ID).value();
        return core_1.Task.where(`#actor Input all fields and save `, EditAsset_1.asset.selectDropdownItemA('Asset', AssetId), EditAsset_1.asset.fillTextInputFieldA('Work Order ID', WOInfo.rowsHash().WorkOrderID + timestamp), EditAsset_1.asset.setCookie(statics_1.COOKIE_WORK_ORDER_ID, WOInfo.rowsHash().WorkOrderID + timestamp), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.editWO = {
    using: (WOInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor Input all fields and save `, EditAsset_1.asset.fillTextInputFieldA('Work Order ID', WOInfo.rowsHash().WorkOrderID + timestamp), EditAsset_1.asset.setCookie(statics_1.COOKIE_WORK_ORDER_ID, WOInfo.rowsHash().WorkOrderID + timestamp), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.checkAsset = {
    using: (assetInfo) => {
        return core_1.Task.where(`#actor check fields`, EditAsset_1.asset.checkTextInputFieldValue('Asset ID', web_1.Cookie.called(statics_1.COOKIE_ASSET_ID).value(), DefaultStaticParams_1.SUCCEEDED), EditAsset_1.asset.checkTextInputFieldValue('Asset Name', assetInfo.rowsHash().AssetName, DefaultStaticParams_1.SUCCEEDED), EditAsset_1.asset.checkDropdownInputFieldValue('Asset Type', assetInfo.rowsHash().AssetType, DefaultStaticParams_1.SUCCEEDED), EditAsset_1.asset.checkDropdownInputFieldValue('Asset Status', assetInfo.rowsHash().AssetStatus, DefaultStaticParams_1.SUCCEEDED), EditAsset_1.asset.checkDropdownInputFieldValue('Acquisition Code', assetInfo.rowsHash().AcquisitionCode, DefaultStaticParams_1.SUCCEEDED), EditAsset_1.asset.checkDateInputFieldValue('Acquisition Date', assetInfo.rowsHash().AcquisitionDate, DefaultStaticParams_1.SUCCEEDED), EditAsset_1.asset.checkDateInputFieldValue('Placement Date', assetInfo.rowsHash().PlacementDate, DefaultStaticParams_1.SUCCEEDED), EditAsset_1.asset.checkAmountInputFieldValue('Original Value', assetInfo.rowsHash().OriginalValue, DefaultStaticParams_1.SUCCEEDED));
    }
};
exports.deleteAsset = {
    using: () => {
        return core_1.Task.where(`#actor click Delete button`, common_1.clickButton.using(DefaultStaticParams_1.DELETE), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK));
    }
};
//# sourceMappingURL=AssetCrud.js.map