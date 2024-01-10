import { DataTable } from '@cucumber/cucumber';
import { not } from '@serenity-js/assertions';
import { Duration, List, Task, Wait } from '@serenity-js/core';
import { Click, isVisible } from '@serenity-js/web';

import { SAVE } from '../../DefaultStaticParams';
import { clickButton, formatted_now, waitMessagePopupBoxVisible } from '../common';
import { COOKIE_VENDOR_ID, COOKIE_VENDOR_NAME } from '../common/statics';
import { vendor } from './components';

export const addVendor = {
    using: (vendorInfo: DataTable) => {
        return Task.where(`#actor adds an vendor`,
            fillVendorRequiredFields.using(vendorInfo),

            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(5))
        )
    }
}

export const fillVendorBasicInfo = {
    using: (vendorTier: string, vendorId: string, vendorName: string) => {
        const timeStamp = formatted_now
        return Task.where(`#actor fill vendor basic information`,
            Wait.for(Duration.ofSeconds(3)),
            vendor.selectDropdownItem('Vendor Tier', vendorTier),
            vendor.fillTextInputField('Vendor ID', vendorId + timeStamp),
            vendor.setCookie(COOKIE_VENDOR_ID, vendorName + timeStamp),
            vendor.fillTextInputField('Vendor Name', vendorName + timeStamp),
            vendor.setCookie(COOKIE_VENDOR_NAME, vendorName + timeStamp),
        )
    }
}

export const fillVendorRequiredFields = {
    using: (vendorInfo: DataTable) => {
        return Task.where(`#actor adds vendor with required fields`,
            vendor.fillTextInputField('Street 1', vendorInfo.rowsHash().Street1),
            vendor.fillTextInputField('City', vendorInfo.rowsHash().City),
            vendor.fillTextInputField('Zip Code', vendorInfo.rowsHash().ZipCode),
            vendor.selectDropdownItem('Country', vendorInfo.rowsHash().Country),
            Wait.until(vendor.countryStateloadingIcon(), not(isVisible())),
            vendor.selectDropdownItem('State', vendorInfo.rowsHash().State),
            vendor.clickSingleCheckBox('Status', vendorInfo.rowsHash().Status),
        )
    }
}

export const fillVendorNotRequiredFields = {
    using: (vendorInfo: DataTable) => {
        const VendorTypesArray = List.of(vendorInfo.rowsHash().VendorTypes.split(','))
        const NAICSArray = List.of(vendorInfo.rowsHash().NAICS.split(','))

        return Task.where(`#actor adds vendor with not required fields`,
            Click.on(vendor.ralationshipAttributeLookupFieldClearIcon('Vendor Types')),
            VendorTypesArray.forEach(({ actor, item }) => actor.attemptsTo(
                vendor.selectItemInRelationshipAttributeInLookupPopup('Vendor Types', item, 'Vendor Type Name'),
            )),

            vendor.fillNumberInputField('Retainage Rate', vendorInfo.rowsHash().RetainageRate,),
            vendor.fillTextInputField('Street 2', vendorInfo.rowsHash().Street2),
            vendor.fillTextInputField('Street 3', vendorInfo.rowsHash().Street3),
            vendor.fillTextInputField('Phone', vendorInfo.rowsHash().Phone),
            vendor.fillTextInputField('Fax', vendorInfo.rowsHash().Fax),
            vendor.fillTextInputField('Email', vendorInfo.rowsHash().Email),
            vendor.fillTextInputField('Website', vendorInfo.rowsHash().Website),
            vendor.fillTextInputField('Contact Person', vendorInfo.rowsHash().ContactPerson),
            vendor.fillTextInputField('Contact Person Phone', vendorInfo.rowsHash().ContactPersonPhone),
            vendor.fillTextInputField('Description', vendorInfo.rowsHash().Description),
            vendor.clickEmailNotificationsCheckBox(vendorInfo.rowsHash().EmailNotifications),

            Click.on(vendor.ralationshipAttributeLookupFieldClearIcon('NAICS')),
            NAICSArray.forEach(({ actor, item }) => actor.attemptsTo(
                vendor.selectNAICSItemInlookupPopup('NAICS', item, 'NAICS Code')
            )),
        )
    }

}
