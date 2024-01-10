"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorAdd = exports.AddVendorFields = void 0;
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../../common/abstract");
const AddVendorAttributes_1 = require("./AddVendorAttributes");
class AddVendorFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        /**
     * 字段的输入框组合（包含字段名和输入框）
     * @param fieldName 字段名称
     * @returns
     */
        this.attributeFieldGroup = (fieldName) => {
            const mappedFieldName = this.entityMap.get(fieldName);
            return web_1.PageElement.located(web_1.By.css(`.c-lygrid__cell_rowspan1[cid="${mappedFieldName}"]`))
                .describedAs('attribute field: ' + fieldName);
        };
    }
}
exports.AddVendorFields = AddVendorFields;
exports.vendorAdd = new AddVendorFields(AddVendorAttributes_1.addVendorAttributeMap);
//# sourceMappingURL=AddVendorFields.js.map