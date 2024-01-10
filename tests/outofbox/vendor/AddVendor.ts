import { DataTable } from '@cucumber/cucumber';
import { not } from '@serenity-js/assertions';
import { Duration, Task, Wait } from '@serenity-js/core';
import { isVisible } from '@serenity-js/web';

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

export const fillVendorRequiredFields = {
    using: (vendorInfo: DataTable) => {
        const timeStamp = formatted_now
        return Task.where(`#actor adds vendor with required fields`,
            vendor.fillTextInputField('Munis Vendor ID', vendorInfo.rowsHash().MunisVendorID + timeStamp),
            vendor.setCookie(COOKIE_VENDOR_ID, vendorInfo.rowsHash().MunisVendorID + timeStamp),
            vendor.fillTextInputField('Vendor Name', vendorInfo.rowsHash().VendorName + timeStamp),
            vendor.setCookie(COOKIE_VENDOR_NAME, vendorInfo.rowsHash().VendorName + timeStamp),
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

        return Task.where(`#actor adds vendor with not required fields`,
            vendor.selectDropdownItem('Vendor Type', vendorInfo.rowsHash().VendorType),
            vendor.fillTextInputField('Street 2', vendorInfo.rowsHash().Street2),
            vendor.fillTextInputField('Street 3', vendorInfo.rowsHash().Street3),
            vendor.fillTextInputField('Fax', vendorInfo.rowsHash().Fax),
            vendor.fillTextInputField('Contact Person1 Email', vendorInfo.rowsHash().ContactPerson1Email),
            vendor.fillTextInputField('Website', vendorInfo.rowsHash().Website),
            vendor.fillTextInputField('Contact Person 1', vendorInfo.rowsHash().ContactPerson1),
            vendor.fillTextInputField('Contact Person Phone 1', vendorInfo.rowsHash().ContactPersonPhone1),
            vendor.fillTextInputField('Description', vendorInfo.rowsHash().Description),

        )
    }

}
