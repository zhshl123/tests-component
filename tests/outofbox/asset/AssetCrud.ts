import { DataTable } from '@cucumber/cucumber';
import { Task} from '@serenity-js/core';
import { Cookie } from '@serenity-js/web';

import { DELETE,OK,SAVE, SUCCEEDED} from '../../DefaultStaticParams';
import { clickButton,clickMessagePopupButton ,formatted_now,waitMessagePopupBoxVisible} from '../common';
import { COOKIE_ASSET_ID, COOKIE_WORK_ORDER_ID } from '../common/statics';
import { asset } from './EditAsset';

export const addAsset = {
    using: (assetInfo:DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor Input all fields and save `,
            asset.fillTextInputField('Asset ID',assetInfo.rowsHash().AssetID + timestamp),
            asset.setCookie(COOKIE_ASSET_ID,assetInfo.rowsHash().AssetID + timestamp),
            asset.fillTextInputField('Asset Name',assetInfo.rowsHash().AssetName),
            asset.selectDropdownItem('Asset Type',assetInfo.rowsHash().AssetType),
            asset.selectDropdownItem('Asset Status',assetInfo.rowsHash().AssetStatus),
            asset.selectDropdownItem('Acquisition Code',assetInfo.rowsHash().AcquisitionCode),
            asset.selectSpecialDate('Acquisition Date',assetInfo.rowsHash().AcquisitionDate,0),
            asset.selectSpecialDate('Placement Date',assetInfo.rowsHash().PlacementDate,1),
            asset.fillAmountInputField('Original Value',assetInfo.rowsHash().OriginalValue),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
}

export const addWO = {
    using: (WOInfo:DataTable) => {
        const timestamp = formatted_now
        const AssetId = Cookie.called(COOKIE_ASSET_ID).value()
        return Task.where(`#actor Input all fields and save `,
            asset.selectDropdownItemA('Asset',AssetId),
            asset.fillTextInputFieldA('Work Order ID',WOInfo.rowsHash().WorkOrderID + timestamp),
            asset.setCookie(COOKIE_WORK_ORDER_ID,WOInfo.rowsHash().WorkOrderID + timestamp),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
}

export const editWO = {
    using: (WOInfo:DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor Input all fields and save `,
            asset.fillTextInputFieldA('Work Order ID',WOInfo.rowsHash().WorkOrderID + timestamp),
            asset.setCookie(COOKIE_WORK_ORDER_ID,WOInfo.rowsHash().WorkOrderID + timestamp),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
}

export const checkAsset = {
    using: (assetInfo:DataTable) => {
        return Task.where(`#actor check fields`,
            asset.checkTextInputFieldValue('Asset ID',Cookie.called(COOKIE_ASSET_ID).value(),SUCCEEDED),
            asset.checkTextInputFieldValue('Asset Name',assetInfo.rowsHash().AssetName,SUCCEEDED),
            asset.checkDropdownInputFieldValue('Asset Type',assetInfo.rowsHash().AssetType,SUCCEEDED),
            asset.checkDropdownInputFieldValue('Asset Status',assetInfo.rowsHash().AssetStatus,SUCCEEDED),
            asset.checkDropdownInputFieldValue('Acquisition Code',assetInfo.rowsHash().AcquisitionCode,SUCCEEDED),
            asset.checkDateInputFieldValue('Acquisition Date',assetInfo.rowsHash().AcquisitionDate,SUCCEEDED),
            asset.checkDateInputFieldValue('Placement Date',assetInfo.rowsHash().PlacementDate,SUCCEEDED),
            asset.checkAmountInputFieldValue('Original Value',assetInfo.rowsHash().OriginalValue,SUCCEEDED)
        )
    }
}

export const deleteAsset = {
    using: () => {
        return Task.where(`#actor click Delete button`,
            clickButton.using(DELETE),
            clickMessagePopupButton.using(OK)
        )
    }
}