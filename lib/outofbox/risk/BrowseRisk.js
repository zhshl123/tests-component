"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseRiskInfo = exports.BrowseRisk = void 0;
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../common/abstract");
const RiskAttributes_1 = require("./RiskAttributes");
class BrowseRisk extends abstract_1.SearchFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.riskTabFrame = () => web_1.PageElement.located(web_1.By.id('ctl00_body_iFrame'))
            .describedAs('contract Risks tab frame');
        this.addNewIcon = () => web_1.PageElement.located(web_1.By.id('lnkNew'))
            .describedAs('contract risk page Add New icon');
    }
}
exports.BrowseRisk = BrowseRisk;
exports.browseRiskInfo = new BrowseRisk(RiskAttributes_1.riskMap);
//# sourceMappingURL=BrowseRisk.js.map