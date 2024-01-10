import { DataTable } from '@cucumber/cucumber';
import { Task} from '@serenity-js/core';
import { Cookie } from '@serenity-js/web';

import { DELETE,OK,SAVE, SUCCEEDED} from '../../DefaultStaticParams';
import { clickButton ,formatted_now} from '../common';
import { clickMessagePopupButton, waitMessagePopupBoxVisible } from '../common/messagePopup';
import { COOKIE_ASSET_ID } from '../common/statics';
import { asset } from './EditAsset';

export const addAsset = {
    using: (AssetInfo:DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor Input all fields and save `,
            asset.fillTextInputField('Asset ID',AssetInfo.rowsHash().AssetID + timestamp),
            asset.setCookie(COOKIE_ASSET_ID,AssetInfo.rowsHash().AssetID + timestamp),
            asset.fillTextInputField('Asset Name',AssetInfo.rowsHash().AssetName),
            asset.selectDropdownItem('Asset Type',AssetInfo.rowsHash().AssetType),
            asset.selectDropdownItem('Asset Status',AssetInfo.rowsHash().AssetStatus),
            asset.selectDropdownItem('Acquisition Code',AssetInfo.rowsHash().AcquisitionCode),
            asset.selectSpecialDate('Acquisition Date',AssetInfo.rowsHash().AcquisitionDate,0),
            asset.selectSpecialDate('Placement Date',AssetInfo.rowsHash().PlacementDate,1),
            asset.fillAmountInputField('Original Value',AssetInfo.rowsHash().OriginalValue),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
}

export const addWO = {
    using: (WOInfo:DataTable) => {
        const AssetName = WOInfo.rowsHash().Asset
        return Task.where(`#actor Input all fields and save `,
            asset.selectDropdownItemA('Asset',AssetName),
            asset.fillTextInputFieldA('Work Order ID',WOInfo.rowsHash().WorkOrderID),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
}

export const editWO = {
    using: (WOInfo:DataTable) => {
        return Task.where(`#actor Input all fields and save `,
            asset.fillTextInputFieldA('Work Order ID',WOInfo.rowsHash().WorkOrderID),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
}

export const checkAsset = {
    using: (AssetInfo:DataTable) => {
        return Task.where(`#actor check fields`,
            asset.checkTextInputFieldValue('Asset ID',Cookie.called(COOKIE_ASSET_ID).value(),SUCCEEDED),
            asset.checkTextInputFieldValue('Asset Name',AssetInfo.rowsHash().AssetName,SUCCEEDED),
            asset.checkDropdownInputFieldValue('Asset Type',AssetInfo.rowsHash().AssetType,SUCCEEDED),
            asset.checkDropdownInputFieldValue('Asset Status',AssetInfo.rowsHash().AssetStatus,SUCCEEDED),
            asset.checkDropdownInputFieldValue('Acquisition Code',AssetInfo.rowsHash().AcquisitionCode,SUCCEEDED),
            asset.checkDateInputFieldValue('Acquisition Date',AssetInfo.rowsHash().AcquisitionDate,SUCCEEDED),
            asset.checkDateInputFieldValue('Placement Date',AssetInfo.rowsHash().PlacementDate,SUCCEEDED),
            asset.checkAmountInputFieldValue('Original Value',AssetInfo.rowsHash().OriginalValue,SUCCEEDED)
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