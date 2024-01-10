"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resource = exports.EditResourceFieldds = void 0;
const abstract_1 = require("../../common/abstract");
const ResourceAttributes_1 = require("./ResourceAttributes");
class EditResourceFieldds extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.EditResourceFieldds = EditResourceFieldds;
exports.resource = new EditResourceFieldds(ResourceAttributes_1.resourceAttributeMap);
//# sourceMappingURL=EditResourceFields.js.map