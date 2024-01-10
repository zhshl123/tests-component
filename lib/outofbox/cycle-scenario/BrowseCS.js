"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseCSInfo = exports.BrowseCS = void 0;
/* eslint-disable unicorn/filename-case */
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const abstract_1 = require(".././common/abstract");
const common_1 = require("../common");
const GridList_1 = require("../common/GridList");
const CSAttributes_1 = require("./CSAttributes");
class BrowseCS extends abstract_1.SearchFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.emptyGrid = () => web_1.PageElement.located(web_1.By.css('.cstdgaux'))
            .describedAs('empty grid');
        this.checkSearchResult = (itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check search item: ${itemName} exists`, assertions_1.Ensure.eventually((0, GridList_1.gridLinkTdList)(itemName), (0, assertions_1.isPresent)())) : core_1.Task.where(`#actor check search item: ${itemName} not exists`, assertions_1.Ensure.eventually(this.emptyGrid(), (0, assertions_1.isPresent)()));
        };
        this.searchItemInBrowsePage = (fieldName, itemName) => {
            return core_1.Task.where(`#actor search item: ${itemName} with ${fieldName}`, this.fillTextInputField(fieldName, itemName), common_1.clickButton.using(DefaultStaticParams_1.SEARCH), core_1.Wait.for(core_1.Duration.ofSeconds(3)), (0, GridList_1.checkGridList)());
        };
    }
}
exports.BrowseCS = BrowseCS;
exports.browseCSInfo = new BrowseCS(CSAttributes_1.CSMap);
//# sourceMappingURL=BrowseCS.js.map