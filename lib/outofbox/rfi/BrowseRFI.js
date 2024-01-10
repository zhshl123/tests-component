"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseRFIInfo = exports.BrowseRFI = void 0;
const abstract_1 = require("../common/abstract");
const RFIAttributes_1 = require("./RFIAttributes");
class BrowseRFI extends abstract_1.SearchFromFields {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.BrowseRFI = BrowseRFI;
exports.browseRFIInfo = new BrowseRFI(RFIAttributes_1.RFIMap);
//# sourceMappingURL=BrowseRFI.js.map