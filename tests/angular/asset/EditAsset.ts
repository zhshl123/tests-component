import { DataTable } from '@cucumber/cucumber'
import { Ensure } from '@serenity-js/assertions'
import { Duration, Task, Wait } from '@serenity-js/core'
import { Click, Cookie, isVisible } from '@serenity-js/web'

import { DELETE, OK, SAVE, SUCCEEDED } from '../../DefaultStaticParams'
import { formatted_now } from '../../website/common'
import { buttonInAlertMessageBox, checkAndClosePopupWindow, iconInAlertMessageBox } from '../common'
import { clickButton, targetButton } from '../common/ClikButton'
import { COOKIE_ASSET_ID, COOKIE_ASSET_NAME } from '../common/statics/StaticCookie'
import { assetEdit } from './components/EditAssetFields'

export const checkAssetForAngular = {
    using: (assetInfo: DataTable) => {
        return Task.where(`#actor check asset information`,
            assetEdit.checkAssetTextInputFieldValue('Asset ID', Cookie.called(COOKIE_ASSET_ID).value(), SUCCEEDED),
            assetEdit.checkAssetTextInputFieldValue('Asset Name', Cookie.called(COOKIE_ASSET_NAME).value(), SUCCEEDED),
            assetEdit.checkDropdownFieldValue('Asset Type', assetInfo.rowsHash().AssetType, SUCCEEDED),
            assetEdit.checkDropdownFieldValue('Asset Status', assetInfo.rowsHash().AssetStatus, SUCCEEDED),
            assetEdit.checkNumberInputFieldValue('Original Value', assetInfo.rowsHash().OriginalValue, SUCCEEDED)
        )
    }

}

export const updateAssetForAngular = {
    using:(assetInfo:DataTable) =>{

        const timestamp = formatted_now
        return Task.where(`#actor update asset with ${assetInfo}`,
    
            assetEdit.fillAssetTextInputField('Asset ID', assetInfo.rowsHash().AssetID + timestamp),
            assetEdit.setCookie(COOKIE_ASSET_ID, assetInfo.rowsHash().AssetID + timestamp),
            assetEdit.fillAssetTextInputField('Asset Name', assetInfo.rowsHash().AssetName + timestamp),
            assetEdit.setCookie(COOKIE_ASSET_NAME, assetInfo.rowsHash().AssetID + timestamp),
            assetEdit.clearDropdownSelectedItem('Asset Type'),
            assetEdit.selectDropdownItem('Asset Type', assetInfo.rowsHash().AssetType),
            assetEdit.clearDropdownSelectedItem('Asset Status'),
            assetEdit.selectDropdownItem('Asset Status', assetInfo.rowsHash().AssetStatus),
            assetEdit.clearDropdownSelectedItem('Acquisition Code'),
            assetEdit.selectDropdownItem('Acquisition Code', assetInfo.rowsHash().AcquisitionCode),
            assetEdit.fillDateInputField('Acquisition Date', assetInfo.rowsHash().AcquisitionDate),
            assetEdit.fillDateInputField('Placement Date', assetInfo.rowsHash().PlacementDate),
            assetEdit.fillTextInputField('Original Value', assetInfo.rowsHash().OriginalValue),
            Click.on(targetButton.getButton(SAVE)),
            checkAndClosePopupWindow()
    
        )
            
    }
    
}

export const deleteAssetForAngular = () => 
    Task.where(`#actor delete asset information`,
        clickButton.using(DELETE),
        Ensure.eventually(iconInAlertMessageBox(), isVisible()),
        Click.on(buttonInAlertMessageBox(OK)),
        Wait.for(Duration.ofSeconds(3)),
    )
