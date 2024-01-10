"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseDesignSubmittal = exports.designSubmittal = exports.EditCSOFields = void 0;
const abstract_1 = require("../../common/abstract");
const DesignSubmittalAttributes_1 = require("./DesignSubmittalAttributes");
class EditCSOFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.EditCSOFields = EditCSOFields;
exports.designSubmittal = new EditCSOFields(DesignSubmittalAttributes_1.designSubmittalAttributeMap);
exports.browseDesignSubmittal = new abstract_1.SearchFromFields(DesignSubmittalAttributes_1.designSubmittalAttributeMap);
//# sourceMappingURL=EditDesignSubmittalFields.js.map