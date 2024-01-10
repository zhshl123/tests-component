import { DataTable } from '@cucumber/cucumber';
import { Ensure, equals } from '@serenity-js/assertions';
import { Duration, Task, Wait } from '@serenity-js/core';
import { Attribute, Cookie } from '@serenity-js/web';

import { DELETE, OK, SAVE, SUCCEEDED } from '../../../../DefaultStaticParams';
import { clickButton, clickMessagePopupButton, waitMessagePopupBoxVisible } from '../../../common';
import { COOKIE_VENDOR_ID } from '../../../common/statics';
import { fillVendorNotRequiredFields, fillVendorRequiredFields } from '../../AddVendor';
import { vendor } from '../EditVendorFields';

export const updateVendorGeneralInformation = {
    using: (vendorInfo: DataTable) => {
        return Task.where(`#actor updates vendor general information`,
            
            fillVendorRequiredFields.using(vendorInfo),
            fillVendorNotRequiredFields.using(vendorInfo),

            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(2)),
        )

    }
}

export const checkVendorGeneralInformation = {
    using: (vendorInfo: DataTable) => {
        return Task.where(`#actor check vendor general information`,
            vendor.checkTextInputFieldValue('Munis Vendor ID', Cookie.called(COOKIE_VENDOR_ID).value(), SUCCEEDED),
            vendor.checkTextInputFieldValue('Vendor Name', Cookie.called(COOKIE_VENDOR_ID).value(), SUCCEEDED),
            vendor.checkDropdownInputFieldValue('Vendor Type',vendorInfo.rowsHash().VendorType, SUCCEEDED),
            vendor.checkTextInputFieldValue('Street 1', vendorInfo.rowsHash().Street1, SUCCEEDED),
            vendor.checkTextInputFieldValue('City', vendorInfo.rowsHash().City, SUCCEEDED),
            vendor.checkTextInputFieldValue('Zip Code', vendorInfo.rowsHash().ZipCode, SUCCEEDED),
            vendor.checkDropdownInputFieldValue('State', vendorInfo.rowsHash().State, SUCCEEDED),
            vendor.checkDropdownInputFieldValue('Country', vendorInfo.rowsHash().Country, SUCCEEDED),
            Ensure.eventually(Attribute.called('initialvalue').of(vendor.radioButtonInput('Status', vendorInfo.rowsHash().Status)), equals('true')),
            vendor.checkTextInputFieldValue('Street 2', vendorInfo.rowsHash().Street2, SUCCEEDED),
            vendor.checkTextInputFieldValue('Street 3', vendorInfo.rowsHash().Street3, SUCCEEDED),
            vendor.checkTextInputFieldValue('Fax', vendorInfo.rowsHash().Fax, SUCCEEDED),
            vendor.checkTextInputFieldValue('Contact Person1 Email', vendorInfo.rowsHash().ContactPerson1Email, SUCCEEDED),
            vendor.checkTextInputFieldValue('Website', vendorInfo.rowsHash().Website, SUCCEEDED),
            vendor.checkTextInputFieldValue('Contact Person 1', vendorInfo.rowsHash().ContactPerson1, SUCCEEDED),
            vendor.checkTextInputFieldValue('Contact Person Phone 1', vendorInfo.rowsHash().ContactPersonPhone1, SUCCEEDED),
            vendor.checkTextInputFieldValue('Description', vendorInfo.rowsHash().Description, SUCCEEDED),

        )
    }
}

export const deleteVendor = () => {
    return Task.where(`#actor deletes vendor general information`,
        clickButton.using(DELETE),
        clickMessagePopupButton.using(OK),
        Wait.for(Duration.ofSeconds(5))
    )
}
