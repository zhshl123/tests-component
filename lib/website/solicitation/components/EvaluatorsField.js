"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluatorsFields = exports.EvaluatorsFields = void 0;
const abstract_1 = require("../../common/abstract");
const SolicitationAttributes_1 = require("./SolicitationAttributes");
class EvaluatorsFields extends abstract_1.LineItemFields {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.EvaluatorsFields = EvaluatorsFields;
exports.evaluatorsFields = new EvaluatorsFields(SolicitationAttributes_1.solicitationAttributesMap);
//# sourceMappingURL=EvaluatorsField.js.map