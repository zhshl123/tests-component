"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillVendorNotRequiredFields = exports.fillVendorRequiredFields = exports.fillVendorBasicInfo = exports.addVendor = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const components_1 = require("./components");
exports.addVendor = {
    using: (vendorInfo) => {
        return core_1.Task.where(`#actor adds an vendor`, exports.fillVendorRequiredFields.using(vendorInfo), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.fillVendorBasicInfo = {
    using: (vendorTier, vendorId, vendorName) => {
        const timeStamp = common_1.formatted_now;
        return core_1.Task.where(`#actor fill vendor basic information`, core_1.Wait.for(core_1.Duration.ofSeconds(3)), components_1.vendor.selectDropdownItem('Vendor Tier', vendorTier), components_1.vendor.fillTextInputField('Vendor ID', vendorId + timeStamp), components_1.vendor.setCookie(statics_1.COOKIE_VENDOR_ID, vendorName + timeStamp), components_1.vendor.fillTextInputField('Vendor Name', vendorName + timeStamp), components_1.vendor.setCookie(statics_1.COOKIE_VENDOR_NAME, vendorName + timeStamp));
    }
};
exports.fillVendorRequiredFields = {
    using: (vendorInfo) => {
        return core_1.Task.where(`#actor adds vendor with required fields`, components_1.vendor.fillTextInputField('Street 1', vendorInfo.rowsHash().Street1), components_1.vendor.fillTextInputField('City', vendorInfo.rowsHash().City), components_1.vendor.fillTextInputField('Zip Code', vendorInfo.rowsHash().ZipCode), components_1.vendor.selectDropdownItem('Country', vendorInfo.rowsHash().Country), core_1.Wait.until(components_1.vendor.countryStateloadingIcon(), (0, assertions_1.not)((0, web_1.isVisible)())), components_1.vendor.selectDropdownItem('State', vendorInfo.rowsHash().State), components_1.vendor.clickSingleCheckBox('Status', vendorInfo.rowsHash().Status));
    }
};
exports.fillVendorNotRequiredFields = {
    using: (vendorInfo) => {
        const VendorTypesArray = core_1.List.of(vendorInfo.rowsHash().VendorTypes.split(','));
        const NAICSArray = core_1.List.of(vendorInfo.rowsHash().NAICS.split(','));
        return core_1.Task.where(`#actor adds vendor with not required fields`, web_1.Click.on(components_1.vendor.ralationshipAttributeLookupFieldClearIcon('Vendor Types')), VendorTypesArray.forEach(({ actor, item }) => actor.attemptsTo(components_1.vendor.selectItemInRelationshipAttributeInLookupPopup('Vendor Types', item, 'Vendor Type Name'))), components_1.vendor.fillNumberInputField('Retainage Rate', vendorInfo.rowsHash().RetainageRate), components_1.vendor.fillTextInputField('Street 2', vendorInfo.rowsHash().Street2), components_1.vendor.fillTextInputField('Street 3', vendorInfo.rowsHash().Street3), components_1.vendor.fillTextInputField('Phone', vendorInfo.rowsHash().Phone), components_1.vendor.fillTextInputField('Fax', vendorInfo.rowsHash().Fax), components_1.vendor.fillTextInputField('Email', vendorInfo.rowsHash().Email), components_1.vendor.fillTextInputField('Website', vendorInfo.rowsHash().Website), components_1.vendor.fillTextInputField('Contact Person', vendorInfo.rowsHash().ContactPerson), components_1.vendor.fillTextInputField('Contact Person Phone', vendorInfo.rowsHash().ContactPersonPhone), components_1.vendor.fillTextInputField('Description', vendorInfo.rowsHash().Description), components_1.vendor.clickEmailNotificationsCheckBox(vendorInfo.rowsHash().EmailNotifications), web_1.Click.on(components_1.vendor.ralationshipAttributeLookupFieldClearIcon('NAICS')), NAICSArray.forEach(({ actor, item }) => actor.attemptsTo(components_1.vendor.selectNAICSItemInlookupPopup('NAICS', item, 'NAICS Code'))));
    }
};
//# sourceMappingURL=AddVendor.js.map