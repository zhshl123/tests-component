"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVendor = exports.checkVendorGeneralInformation = exports.updateVendorGeneralInformation = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../../DefaultStaticParams");
const common_1 = require("../../../common");
const statics_1 = require("../../../common/statics");
const AddVendor_1 = require("../../AddVendor");
const EditVendorFields_1 = require("../EditVendorFields");
exports.updateVendorGeneralInformation = {
    using: (vendorInfo) => {
        return core_1.Task.where(`#actor updates vendor general information`, AddVendor_1.fillVendorRequiredFields.using(vendorInfo), AddVendor_1.fillVendorNotRequiredFields.using(vendorInfo), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(2)));
    }
};
exports.checkVendorGeneralInformation = {
    using: (vendorInfo) => {
        return core_1.Task.where(`#actor check vendor general information`, EditVendorFields_1.vendor.checkTextInputFieldValue('Munis Vendor ID', web_1.Cookie.called(statics_1.COOKIE_VENDOR_ID).value(), DefaultStaticParams_1.SUCCEEDED), EditVendorFields_1.vendor.checkTextInputFieldValue('Vendor Name', web_1.Cookie.called(statics_1.COOKIE_VENDOR_ID).value(), DefaultStaticParams_1.SUCCEEDED), EditVendorFields_1.vendor.checkDropdownInputFieldValue('Vendor Type', vendorInfo.rowsHash().VendorType, DefaultStaticParams_1.SUCCEEDED), EditVendorFields_1.vendor.checkTextInputFieldValue('Street 1', vendorInfo.rowsHash().Street1, DefaultStaticParams_1.SUCCEEDED), EditVendorFields_1.vendor.checkTextInputFieldValue('City', vendorInfo.rowsHash().City, DefaultStaticParams_1.SUCCEEDED), EditVendorFields_1.vendor.checkTextInputFieldValue('Zip Code', vendorInfo.rowsHash().ZipCode, DefaultStaticParams_1.SUCCEEDED), EditVendorFields_1.vendor.checkDropdownInputFieldValue('State', vendorInfo.rowsHash().State, DefaultStaticParams_1.SUCCEEDED), EditVendorFields_1.vendor.checkDropdownInputFieldValue('Country', vendorInfo.rowsHash().Country, DefaultStaticParams_1.SUCCEEDED), assertions_1.Ensure.eventually(web_1.Attribute.called('initialvalue').of(EditVendorFields_1.vendor.radioButtonInput('Status', vendorInfo.rowsHash().Status)), (0, assertions_1.equals)('true')), EditVendorFields_1.vendor.checkTextInputFieldValue('Street 2', vendorInfo.rowsHash().Street2, DefaultStaticParams_1.SUCCEEDED), EditVendorFields_1.vendor.checkTextInputFieldValue('Street 3', vendorInfo.rowsHash().Street3, DefaultStaticParams_1.SUCCEEDED), EditVendorFields_1.vendor.checkTextInputFieldValue('Fax', vendorInfo.rowsHash().Fax, DefaultStaticParams_1.SUCCEEDED), EditVendorFields_1.vendor.checkTextInputFieldValue('Contact Person1 Email', vendorInfo.rowsHash().ContactPerson1Email, DefaultStaticParams_1.SUCCEEDED), EditVendorFields_1.vendor.checkTextInputFieldValue('Website', vendorInfo.rowsHash().Website, DefaultStaticParams_1.SUCCEEDED), EditVendorFields_1.vendor.checkTextInputFieldValue('Contact Person 1', vendorInfo.rowsHash().ContactPerson1, DefaultStaticParams_1.SUCCEEDED), EditVendorFields_1.vendor.checkTextInputFieldValue('Contact Person Phone 1', vendorInfo.rowsHash().ContactPersonPhone1, DefaultStaticParams_1.SUCCEEDED), EditVendorFields_1.vendor.checkTextInputFieldValue('Description', vendorInfo.rowsHash().Description, DefaultStaticParams_1.SUCCEEDED));
    }
};
const deleteVendor = () => {
    return core_1.Task.where(`#actor deletes vendor general information`, common_1.clickButton.using(DefaultStaticParams_1.DELETE), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
};
exports.deleteVendor = deleteVendor;
//# sourceMappingURL=VendorGeneralInfo.js.map