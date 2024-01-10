"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseCOR = exports.BrowseCORFields = void 0;
const abstract_1 = require("../../common/abstract");
const corAttributes_1 = require("./corAttributes");
class BrowseCORFields extends abstract_1.SearchFromFields {
    constructor(entityMap) {
        super(entityMap);
    }
    ;
}
exports.BrowseCORFields = BrowseCORFields;
exports.browseCOR = new BrowseCORFields(corAttributes_1.corAttributeMap);
//# sourceMappingURL=BrowseCORFields.js.map