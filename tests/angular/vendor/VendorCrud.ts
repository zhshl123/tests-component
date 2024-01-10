import { DataTable } from '@cucumber/cucumber'
import { Ensure } from '@serenity-js/assertions'
import { Duration, Task, Wait } from '@serenity-js/core'
import { Click, Cookie, isVisible } from '@serenity-js/web'

import { DELETE, OK, SAVE, SUCCEEDED } from '../../DefaultStaticParams'
import { formatted_now } from '../../website/common'
import { buttonInAlertMessageBox, checkAndClosePopupWindow, iconInAlertMessageBox } from '../common'
import { clickButton, targetButton } from '../common/ClikButton'
import {  COOKIE_VENDOR_ID, COOKIE_VENDOR_NAME } from '../common/statics/StaticCookie'
import { vendorAdd } from './components/AddVendorFields'
import { vendorEdit } from './components/EditVendorFields'

export const addVendorForAngular = {
    using:(vendorInfo:DataTable) =>{

        const timestamp = formatted_now
        return Task.where(`#actor add vendor`,
    
            vendorAdd.fillTextInputField('Vendor ID', vendorInfo.rowsHash().VendorID + timestamp),
            vendorAdd.setCookie(COOKIE_VENDOR_ID, vendorInfo.rowsHash().VendorID + timestamp),
            vendorAdd.fillTextInputField('Vendor Name', vendorInfo.rowsHash().VendorName + timestamp),
            vendorAdd.setCookie(COOKIE_VENDOR_NAME, vendorInfo.rowsHash().VendorID + timestamp),
            vendorAdd.selectDropdownItem('Vendor Tier', vendorInfo.rowsHash().VendorTier),
            vendorAdd.clickRadioButton('Status', vendorInfo.rowsHash().Status),
            vendorAdd.fillTextInputField('Street 1', vendorInfo.rowsHash().Street1),
            vendorAdd.selectDropdownItem('Country', vendorInfo.rowsHash().Country),
            vendorAdd.selectDropdownItem('State', vendorInfo.rowsHash().State),
            Click.on(targetButton.getButton(SAVE)),
            checkAndClosePopupWindow()
    
        )
            
    }
    
}

export const checkVendorForAngular = {
    using: (vendorInfo: DataTable) => {
        return Task.where(`#actor check vendor information`,
            vendorEdit.checkTextInputFieldValue('Vendor ID', Cookie.called(COOKIE_VENDOR_ID).value(), SUCCEEDED),
            vendorEdit.checkTextInputFieldValue('Vendor Name', Cookie.called(COOKIE_VENDOR_NAME).value(), SUCCEEDED),
            vendorEdit.checkDropdownFieldValue('Vendor Tier', vendorInfo.rowsHash().VendorTier, SUCCEEDED),
            vendorEdit.checkSelectedRadioButton('Status',  vendorInfo.rowsHash().Status, SUCCEEDED),
            vendorEdit.checkTextInputFieldValue('Street 1', vendorInfo.rowsHash().Street1, SUCCEEDED),
            vendorEdit.checkDropdownFieldValue('Country', vendorInfo.rowsHash().Country, SUCCEEDED),
            vendorEdit.checkDropdownFieldValue('State', vendorInfo.rowsHash().State, SUCCEEDED),
        )
    }

}

export const updateVendorForAngular = {
    using:(vendorInfo:DataTable) =>{

        const timestamp = formatted_now
        return Task.where(`#actor update vendor`,
            vendorEdit.fillTextInputField('Vendor ID', vendorInfo.rowsHash().VendorID + timestamp),
            vendorEdit.setCookie(COOKIE_VENDOR_ID, vendorInfo.rowsHash().VendorID + timestamp),
            vendorEdit.fillTextInputField('Vendor Name', vendorInfo.rowsHash().VendorName + timestamp),
            vendorEdit.setCookie(COOKIE_VENDOR_NAME, vendorInfo.rowsHash().VendorID + timestamp),
            vendorEdit.selectDropdownItem('Vendor Tier', vendorInfo.rowsHash().VendorTier),
            vendorEdit.clickRadioButton('Status', vendorInfo.rowsHash().Status),
            vendorEdit.fillTextInputField('Street 1', vendorInfo.rowsHash().Street1),
            vendorEdit.selectDropdownItem('Country', vendorInfo.rowsHash().Country),
            vendorEdit.selectDropdownItem('State', vendorInfo.rowsHash().State),
            Click.on(targetButton.getButton(SAVE)),
            checkAndClosePopupWindow()
    
        )
            
    }
    
}

export const deleteVendorForAngular = () => 
    Task.where(`#actor delete asset information`,
        clickButton.using(DELETE),
        Ensure.eventually(iconInAlertMessageBox(), isVisible()),
        Click.on(buttonInAlertMessageBox(OK)),
        Wait.for(Duration.ofSeconds(3)),
    )
