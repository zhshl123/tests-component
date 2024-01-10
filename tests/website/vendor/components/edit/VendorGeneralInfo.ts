import { DataTable } from '@cucumber/cucumber';
import { Ensure, equals } from '@serenity-js/assertions';
import { Duration, Task, Wait } from '@serenity-js/core';
import { Attribute, Cookie } from '@serenity-js/web';

import { DELETE, OK, SAVE, SUCCEEDED } from '../../../../DefaultStaticParams';
import { clickButton, clickMessagePopupButton, waitMessagePopupBoxVisible } from '../../../common';
import { COOKIE_VENDOR_ID } from '../../../common/statics';
import { fillVendorBasicInfo, fillVendorNotRequiredFields, fillVendorRequiredFields } from '../../AddVendor';
import { vendor } from '../EditVendorFields';

export const updateVendorGeneralInformation = {
    using: (vendorTier: string, vendorId: string, vendorName: string, vendorInfo: DataTable) => {
        return Task.where(`#actor updates vendor general information`,
            
            fillVendorBasicInfo.using(vendorTier, vendorId, vendorName),
            fillVendorRequiredFields.using(vendorInfo),
            fillVendorNotRequiredFields.using(vendorInfo),

            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(2)),
        )

    }
}

export const checkVendorGeneralInformation = {
    using: (vendorTier: string, vendorInfo: DataTable) => {
        return Task.where(`#actor updates vendor general information`,
            vendor.checkTextInputFieldValue('Vendor ID', Cookie.called(COOKIE_VENDOR_ID).value(), SUCCEEDED),
            vendor.checkDropdownInputFieldValue('Vendor Tier', vendorTier, SUCCEEDED),
            vendor.checkTextInputFieldValue('Vendor Name', Cookie.called(COOKIE_VENDOR_ID).value(), SUCCEEDED),
            vendor.checkTextInputFieldValue('Street 1', vendorInfo.rowsHash().Street1, SUCCEEDED),
            vendor.checkTextInputFieldValue('City', vendorInfo.rowsHash().City, SUCCEEDED),
            vendor.checkTextInputFieldValue('Zip Code', vendorInfo.rowsHash().ZipCode, SUCCEEDED),
            vendor.checkDropdownInputFieldValue('State', vendorInfo.rowsHash().State, SUCCEEDED),
            vendor.checkDropdownInputFieldValue('Country', vendorInfo.rowsHash().Country, SUCCEEDED),
            Ensure.eventually(Attribute.called('initialvalue').of(vendor.radioButtonInput('Status', vendorInfo.rowsHash().Status)), equals('true')),
            vendor.checkRelationshipAttributeLookupInputFieldMultiValue('Vendor Types', vendorInfo.rowsHash().VendorTypes, SUCCEEDED),
            vendor.checkNumberInputFieldValue('Retainage Rate', vendorInfo.rowsHash().RetainageRate, SUCCEEDED),
            vendor.checkTextInputFieldValue('Street 2', vendorInfo.rowsHash().Street2, SUCCEEDED),
            vendor.checkTextInputFieldValue('Street 3', vendorInfo.rowsHash().Street3, SUCCEEDED),
            vendor.checkTextInputFieldValue('Phone', vendorInfo.rowsHash().Phone, SUCCEEDED),
            vendor.checkTextInputFieldValue('Fax', vendorInfo.rowsHash().Fax, SUCCEEDED),
            vendor.checkTextInputFieldValue('Email', vendorInfo.rowsHash().Email, SUCCEEDED),
            vendor.checkTextInputFieldValue('Website', vendorInfo.rowsHash().Website, SUCCEEDED),
            vendor.checkTextInputFieldValue('Contact Person', vendorInfo.rowsHash().ContactPerson, SUCCEEDED),
            vendor.checkTextInputFieldValue('Contact Person Phone', vendorInfo.rowsHash().ContactPersonPhone, SUCCEEDED),
            vendor.checkTextInputFieldValue('Description', vendorInfo.rowsHash().Description, SUCCEEDED),
            vendor.clickEmailNotificationsCheckBox(vendorInfo.rowsHash().Description),
            Ensure.eventually(Attribute.called('initialvalue').of(vendor.emailNotificationsCheckBox()), equals(vendorInfo.rowsHash().EmailNotifications))

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
