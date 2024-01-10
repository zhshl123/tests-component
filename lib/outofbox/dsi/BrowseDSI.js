"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseDSIInfo = exports.BrowseDSI = void 0;
const core_1 = require("@serenity-js/core");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const abstract_1 = require(".././common/abstract");
const common_1 = require("../common");
const DSIAttributes_1 = require("./DSIAttributes");
class BrowseDSI extends abstract_1.SearchFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.searchItemInBrowsePage = (fieldName, itemName) => {
            return core_1.Task.where(`#actor search item: ${itemName} with ${fieldName}`, this.fillTextInputField(fieldName, itemName), common_1.clickButton.using(DefaultStaticParams_1.SEARCH), core_1.Wait.for(core_1.Duration.ofSeconds(3)), (0, common_1.checkGridList)());
        };
    }
}
exports.BrowseDSI = BrowseDSI;
exports.browseDSIInfo = new BrowseDSI(DSIAttributes_1.DSIMap);
//# sourceMappingURL=BrowseDSI.js.map