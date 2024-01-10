"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responsesFields = exports.ResponsesFields = void 0;
const abstract_1 = require("../../common/abstract");
const SolicitationAttributes_1 = require("./SolicitationAttributes");
class ResponsesFields extends abstract_1.LineItemFields {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.ResponsesFields = ResponsesFields;
exports.responsesFields = new ResponsesFields(SolicitationAttributes_1.solicitationAttributesMap);
//# sourceMappingURL=ResponsesField.js.map