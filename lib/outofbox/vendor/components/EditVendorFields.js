"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendor = exports.EditVendorFields = void 0;
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../../common/abstract");
const VendorAttributes_1 = require("./VendorAttributes");
class EditVendorFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.countryStateloadingIcon = () => web_1.PageElement.located(web_1.By.id('ajaxMask'))
            .describedAs('country states loading icon');
    }
}
exports.EditVendorFields = EditVendorFields;
exports.vendor = new EditVendorFields(VendorAttributes_1.vendorAttributeMap);
//# sourceMappingURL=EditVendorFields.js.map