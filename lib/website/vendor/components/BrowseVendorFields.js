"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseVendor = exports.BrowseVnedorsFields = void 0;
const abstract_1 = require("../../common/abstract");
const VendorAttributes_1 = require("./VendorAttributes");
class BrowseVnedorsFields extends abstract_1.SearchFromFields {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.BrowseVnedorsFields = BrowseVnedorsFields;
exports.browseVendor = new BrowseVnedorsFields(VendorAttributes_1.vendorAttributeMap);
//# sourceMappingURL=BrowseVendorFields.js.map