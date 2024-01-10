"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseIRInfo = exports.BrowseIR = void 0;
const core_1 = require("@serenity-js/core");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const abstract_1 = require("../common/abstract");
const IRAttributes_1 = require("./IRAttributes");
class BrowseIR extends abstract_1.SearchFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.searchItemInBrowsePage = (fieldName, itemName) => {
            return core_1.Task.where(`#actor search item: ${itemName} with ${fieldName}`, this.fillTextInputField(fieldName, itemName), common_1.clickButton.using(DefaultStaticParams_1.SEARCH), core_1.Wait.for(core_1.Duration.ofSeconds(3)), (0, common_1.checkGridList)());
        };
    }
}
exports.BrowseIR = BrowseIR;
exports.browseIRInfo = new BrowseIR(IRAttributes_1.IRMap);
//# sourceMappingURL=BrowseIR.js.map