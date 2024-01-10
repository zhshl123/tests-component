"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseRiskInfo = exports.BrowseRisk = void 0;
const core_1 = require("@serenity-js/core");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const abstract_1 = require(".././common/abstract");
const common_1 = require("../common");
const GridList_1 = require("../common/GridList");
const RiskAttributes_1 = require("./RiskAttributes");
class BrowseRisk extends abstract_1.SearchFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.searchItemInBrowsePage = (fieldName, itemName) => {
            return core_1.Task.where(`#actor search item: ${itemName} with ${fieldName}`, this.fillTextInputField(fieldName, itemName), common_1.clickButton.using(DefaultStaticParams_1.SEARCH), core_1.Wait.for(core_1.Duration.ofSeconds(3)), (0, GridList_1.checkGridList)());
        };
    }
}
exports.BrowseRisk = BrowseRisk;
exports.browseRiskInfo = new BrowseRisk(RiskAttributes_1.riskMap);
//# sourceMappingURL=BrowseRisk.js.map