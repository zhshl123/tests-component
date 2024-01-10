"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillVendorNotRequiredFields = exports.fillVendorRequiredFields = exports.addVendor = void 0;
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
exports.fillVendorRequiredFields = {
    using: (vendorInfo) => {
        const timeStamp = common_1.formatted_now;
        return core_1.Task.where(`#actor adds vendor with required fields`, components_1.vendor.fillTextInputField('Munis Vendor ID', vendorInfo.rowsHash().MunisVendorID + timeStamp), components_1.vendor.setCookie(statics_1.COOKIE_VENDOR_ID, vendorInfo.rowsHash().MunisVendorID + timeStamp), components_1.vendor.fillTextInputField('Vendor Name', vendorInfo.rowsHash().VendorName + timeStamp), components_1.vendor.setCookie(statics_1.COOKIE_VENDOR_NAME, vendorInfo.rowsHash().VendorName + timeStamp), components_1.vendor.fillTextInputField('Street 1', vendorInfo.rowsHash().Street1), components_1.vendor.fillTextInputField('City', vendorInfo.rowsHash().City), components_1.vendor.fillTextInputField('Zip Code', vendorInfo.rowsHash().ZipCode), components_1.vendor.selectDropdownItem('Country', vendorInfo.rowsHash().Country), core_1.Wait.until(components_1.vendor.countryStateloadingIcon(), (0, assertions_1.not)((0, web_1.isVisible)())), components_1.vendor.selectDropdownItem('State', vendorInfo.rowsHash().State), components_1.vendor.clickSingleCheckBox('Status', vendorInfo.rowsHash().Status));
    }
};
exports.fillVendorNotRequiredFields = {
    using: (vendorInfo) => {
        return core_1.Task.where(`#actor adds vendor with not required fields`, components_1.vendor.selectDropdownItem('Vendor Type', vendorInfo.rowsHash().VendorType), components_1.vendor.fillTextInputField('Street 2', vendorInfo.rowsHash().Street2), components_1.vendor.fillTextInputField('Street 3', vendorInfo.rowsHash().Street3), components_1.vendor.fillTextInputField('Fax', vendorInfo.rowsHash().Fax), components_1.vendor.fillTextInputField('Contact Person1 Email', vendorInfo.rowsHash().ContactPerson1Email), components_1.vendor.fillTextInputField('Website', vendorInfo.rowsHash().Website), components_1.vendor.fillTextInputField('Contact Person 1', vendorInfo.rowsHash().ContactPerson1), components_1.vendor.fillTextInputField('Contact Person Phone 1', vendorInfo.rowsHash().ContactPersonPhone1), components_1.vendor.fillTextInputField('Description', vendorInfo.rowsHash().Description));
    }
};
//# sourceMappingURL=AddVendor.js.map