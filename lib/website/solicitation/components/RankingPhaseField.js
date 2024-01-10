"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rankingphaseFields = exports.RankingPhaseFields = void 0;
const abstract_1 = require("../../common/abstract");
const SolicitationAttributes_1 = require("./SolicitationAttributes");
class RankingPhaseFields extends abstract_1.LineItemFields {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.RankingPhaseFields = RankingPhaseFields;
exports.rankingphaseFields = new RankingPhaseFields(SolicitationAttributes_1.solicitationAttributesMap);
//# sourceMappingURL=RankingPhaseField.js.map