"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVendorForAngular = exports.updateVendorForAngular = exports.checkVendorForAngular = exports.addVendorForAngular = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../../website/common");
const common_2 = require("../common");
const ClikButton_1 = require("../common/ClikButton");
const StaticCookie_1 = require("../common/statics/StaticCookie");
const AddVendorFields_1 = require("./components/AddVendorFields");
const EditVendorFields_1 = require("./components/EditVendorFields");
exports.addVendorForAngular = {
    using: (vendorInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor add vendor`, AddVendorFields_1.vendorAdd.fillTextInputField('Vendor ID', vendorInfo.rowsHash().VendorID + timestamp), AddVendorFields_1.vendorAdd.setCookie(StaticCookie_1.COOKIE_VENDOR_ID, vendorInfo.rowsHash().VendorID + timestamp), AddVendorFields_1.vendorAdd.fillTextInputField('Vendor Name', vendorInfo.rowsHash().VendorName + timestamp), AddVendorFields_1.vendorAdd.setCookie(StaticCookie_1.COOKIE_VENDOR_NAME, vendorInfo.rowsHash().VendorID + timestamp), AddVendorFields_1.vendorAdd.selectDropdownItem('Vendor Tier', vendorInfo.rowsHash().VendorTier), AddVendorFields_1.vendorAdd.clickRadioButton('Status', vendorInfo.rowsHash().Status), AddVendorFields_1.vendorAdd.fillTextInputField('Street 1', vendorInfo.rowsHash().Street1), AddVendorFields_1.vendorAdd.selectDropdownItem('Country', vendorInfo.rowsHash().Country), AddVendorFields_1.vendorAdd.selectDropdownItem('State', vendorInfo.rowsHash().State), web_1.Click.on(ClikButton_1.targetButton.getButton(DefaultStaticParams_1.SAVE)), (0, common_2.checkAndClosePopupWindow)());
    }
};
exports.checkVendorForAngular = {
    using: (vendorInfo) => {
        return core_1.Task.where(`#actor check vendor information`, EditVendorFields_1.vendorEdit.checkTextInputFieldValue('Vendor ID', web_1.Cookie.called(StaticCookie_1.COOKIE_VENDOR_ID).value(), DefaultStaticParams_1.SUCCEEDED), EditVendorFields_1.vendorEdit.checkTextInputFieldValue('Vendor Name', web_1.Cookie.called(StaticCookie_1.COOKIE_VENDOR_NAME).value(), DefaultStaticParams_1.SUCCEEDED), EditVendorFields_1.vendorEdit.checkDropdownFieldValue('Vendor Tier', vendorInfo.rowsHash().VendorTier, DefaultStaticParams_1.SUCCEEDED), EditVendorFields_1.vendorEdit.checkSelectedRadioButton('Status', vendorInfo.rowsHash().Status, DefaultStaticParams_1.SUCCEEDED), EditVendorFields_1.vendorEdit.checkTextInputFieldValue('Street 1', vendorInfo.rowsHash().Street1, DefaultStaticParams_1.SUCCEEDED), EditVendorFields_1.vendorEdit.checkDropdownFieldValue('Country', vendorInfo.rowsHash().Country, DefaultStaticParams_1.SUCCEEDED), EditVendorFields_1.vendorEdit.checkDropdownFieldValue('State', vendorInfo.rowsHash().State, DefaultStaticParams_1.SUCCEEDED));
    }
};
exports.updateVendorForAngular = {
    using: (vendorInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor update vendor`, EditVendorFields_1.vendorEdit.fillTextInputField('Vendor ID', vendorInfo.rowsHash().VendorID + timestamp), EditVendorFields_1.vendorEdit.setCookie(StaticCookie_1.COOKIE_VENDOR_ID, vendorInfo.rowsHash().VendorID + timestamp), EditVendorFields_1.vendorEdit.fillTextInputField('Vendor Name', vendorInfo.rowsHash().VendorName + timestamp), EditVendorFields_1.vendorEdit.setCookie(StaticCookie_1.COOKIE_VENDOR_NAME, vendorInfo.rowsHash().VendorID + timestamp), EditVendorFields_1.vendorEdit.selectDropdownItem('Vendor Tier', vendorInfo.rowsHash().VendorTier), EditVendorFields_1.vendorEdit.clickRadioButton('Status', vendorInfo.rowsHash().Status), EditVendorFields_1.vendorEdit.fillTextInputField('Street 1', vendorInfo.rowsHash().Street1), EditVendorFields_1.vendorEdit.selectDropdownItem('Country', vendorInfo.rowsHash().Country), EditVendorFields_1.vendorEdit.selectDropdownItem('State', vendorInfo.rowsHash().State), web_1.Click.on(ClikButton_1.targetButton.getButton(DefaultStaticParams_1.SAVE)), (0, common_2.checkAndClosePopupWindow)());
    }
};
const deleteVendorForAngular = () => core_1.Task.where(`#actor delete asset information`, ClikButton_1.clickButton.using(DefaultStaticParams_1.DELETE), assertions_1.Ensure.eventually((0, common_2.iconInAlertMessageBox)(), (0, web_1.isVisible)()), web_1.Click.on((0, common_2.buttonInAlertMessageBox)(DefaultStaticParams_1.OK)), core_1.Wait.for(core_1.Duration.ofSeconds(3)));
exports.deleteVendorForAngular = deleteVendorForAngular;
//# sourceMappingURL=VendorCrud.js.map