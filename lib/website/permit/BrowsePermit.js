"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browsePermitInfo = exports.BrowsePermit = void 0;
const core_1 = require("@serenity-js/core");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const abstract_1 = require("../common/abstract");
const PermitAttributes_1 = require("./PermitAttributes");
class BrowsePermit extends abstract_1.SearchFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.searchItemInBrowsePage = (fieldName, itemName) => {
            return core_1.Task.where(`#actor search item: ${itemName} with ${fieldName}`, this.fillTextInputField(fieldName, itemName), common_1.clickButton.using(DefaultStaticParams_1.SEARCH), core_1.Wait.for(core_1.Duration.ofSeconds(3)), (0, common_1.checkGridList)());
        };
    }
}
exports.BrowsePermit = BrowsePermit;
exports.browsePermitInfo = new BrowsePermit(PermitAttributes_1.permitMap);
//# sourceMappingURL=BrowsePermit.js.map