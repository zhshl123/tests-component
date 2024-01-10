"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseFilteringLog = exports.BrowseFilteringLogFields = void 0;
const abstract_1 = require("../common/abstract");
const FilteringAttributes_1 = require("./FilteringAttributes");
class BrowseFilteringLogFields extends abstract_1.SearchFromFields {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.BrowseFilteringLogFields = BrowseFilteringLogFields;
const filteringLogMap = new Map();
filteringLogMap.set('Project', 'cstm_ProjectId');
exports.browseFilteringLog = new BrowseFilteringLogFields(FilteringAttributes_1.FilteringMap);
//# sourceMappingURL=BrowseFilteringLogFields.js.map