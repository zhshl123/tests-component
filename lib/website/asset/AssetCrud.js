"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAsset = exports.checkAsset = exports.editWO = exports.addWO = exports.addAsset = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const messagePopup_1 = require("../common/messagePopup");
const statics_1 = require("../common/statics");
const EditAsset_1 = require("./EditAsset");
exports.addAsset = {
    using: (AssetInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor Input all fields and save `, EditAsset_1.asset.fillTextInputField('Asset ID', AssetInfo.rowsHash().AssetID + timestamp), EditAsset_1.asset.setCookie(statics_1.COOKIE_ASSET_ID, AssetInfo.rowsHash().AssetID + timestamp), EditAsset_1.asset.fillTextInputField('Asset Name', AssetInfo.rowsHash().AssetName), EditAsset_1.asset.selectDropdownItem('Asset Type', AssetInfo.rowsHash().AssetType), EditAsset_1.asset.selectDropdownItem('Asset Status', AssetInfo.rowsHash().AssetStatus), EditAsset_1.asset.selectDropdownItem('Acquisition Code', AssetInfo.rowsHash().AcquisitionCode), EditAsset_1.asset.selectSpecialDate('Acquisition Date', AssetInfo.rowsHash().AcquisitionDate, 0), EditAsset_1.asset.selectSpecialDate('Placement Date', AssetInfo.rowsHash().PlacementDate, 1), EditAsset_1.asset.fillAmountInputField('Original Value', AssetInfo.rowsHash().OriginalValue), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, messagePopup_1.waitMessagePopupBoxVisible)());
    }
};
exports.addWO = {
    using: (WOInfo) => {
        const AssetName = WOInfo.rowsHash().Asset;
        return core_1.Task.where(`#actor Input all fields and save `, EditAsset_1.asset.selectDropdownItemA('Asset', AssetName), EditAsset_1.asset.fillTextInputFieldA('Work Order ID', WOInfo.rowsHash().WorkOrderID), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, messagePopup_1.waitMessagePopupBoxVisible)());
    }
};
exports.editWO = {
    using: (WOInfo) => {
        return core_1.Task.where(`#actor Input all fields and save `, EditAsset_1.asset.fillTextInputFieldA('Work Order ID', WOInfo.rowsHash().WorkOrderID), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, messagePopup_1.waitMessagePopupBoxVisible)());
    }
};
exports.checkAsset = {
    using: (AssetInfo) => {
        return core_1.Task.where(`#actor check fields`, EditAsset_1.asset.checkTextInputFieldValue('Asset ID', web_1.Cookie.called(statics_1.COOKIE_ASSET_ID).value(), DefaultStaticParams_1.SUCCEEDED), EditAsset_1.asset.checkTextInputFieldValue('Asset Name', AssetInfo.rowsHash().AssetName, DefaultStaticParams_1.SUCCEEDED), EditAsset_1.asset.checkDropdownInputFieldValue('Asset Type', AssetInfo.rowsHash().AssetType, DefaultStaticParams_1.SUCCEEDED), EditAsset_1.asset.checkDropdownInputFieldValue('Asset Status', AssetInfo.rowsHash().AssetStatus, DefaultStaticParams_1.SUCCEEDED), EditAsset_1.asset.checkDropdownInputFieldValue('Acquisition Code', AssetInfo.rowsHash().AcquisitionCode, DefaultStaticParams_1.SUCCEEDED), EditAsset_1.asset.checkDateInputFieldValue('Acquisition Date', AssetInfo.rowsHash().AcquisitionDate, DefaultStaticParams_1.SUCCEEDED), EditAsset_1.asset.checkDateInputFieldValue('Placement Date', AssetInfo.rowsHash().PlacementDate, DefaultStaticParams_1.SUCCEEDED), EditAsset_1.asset.checkAmountInputFieldValue('Original Value', AssetInfo.rowsHash().OriginalValue, DefaultStaticParams_1.SUCCEEDED));
    }
};
exports.deleteAsset = {
    using: () => {
        return core_1.Task.where(`#actor click Delete button`, common_1.clickButton.using(DefaultStaticParams_1.DELETE), messagePopup_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK));
    }
};
//# sourceMappingURL=AssetCrud.js.map