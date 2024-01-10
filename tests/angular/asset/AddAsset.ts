import { DataTable } from '@cucumber/cucumber'
import { Task } from '@serenity-js/core'
import { Click } from '@serenity-js/web'

import { SAVE } from '../../DefaultStaticParams'
import { formatted_now } from '../../website/common'
import { checkAndClosePopupWindow, targetButton } from '../common'
import { COOKIE_ASSET_ID, COOKIE_ASSET_NAME } from '../common/statics/StaticCookie'
import { assetAdd } from './components/AddAssetFields'

export const addAssetForAngular = {
    using:(assetInfo:DataTable) =>{

        const timestamp = formatted_now
        return Task.where(`#actor add asset with ${assetInfo}`,
    
            assetAdd.fillAssetTextInputField('Asset ID',2, assetInfo.rowsHash().AssetID + timestamp),
            assetAdd.setCookie(COOKIE_ASSET_ID, assetInfo.rowsHash().AssetID + timestamp),
            assetAdd.fillAssetTextInputField('Asset Name',2, assetInfo.rowsHash().AssetName + timestamp),
            assetAdd.setCookie(COOKIE_ASSET_NAME, assetInfo.rowsHash().AssetID + timestamp),
            assetAdd.selectAssetDropdownItem('Asset Type', 3,assetInfo.rowsHash().AssetType),
            assetAdd.selectAssetDropdownItem('Asset Status',4, assetInfo.rowsHash().AssetStatus),
            assetAdd.selectAssetDropdownItem('Acquisition Code', 4,assetInfo.rowsHash().AcquisitionCode),
            assetAdd.fillDateInputField('Acquisition Date', assetInfo.rowsHash().AcquisitionDate),
            assetAdd.fillDateInputField('Placement Date', assetInfo.rowsHash().PlacementDate),
            assetAdd.fillTextInputField('Original Value', assetInfo.rowsHash().OriginalValue),
            Click.on(targetButton.getButton(SAVE)),
            checkAndClosePopupWindow()
    
        )
            
    }
    
}
