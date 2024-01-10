"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseUserInfo = exports.BrowseUser = void 0;
const core_1 = require("@serenity-js/core");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const abstract_1 = require(".././common/abstract");
const common_1 = require("../common");
const UserAttributes_1 = require("./UserAttributes");
class BrowseUser extends abstract_1.SearchFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.searchItemInBrowsePage = (fieldName, itemName) => {
            return core_1.Task.where(`#actor search item: ${itemName} with ${fieldName}`, this.fillTextInputField(fieldName, itemName), common_1.clickButton.using(DefaultStaticParams_1.SEARCH), core_1.Wait.for(core_1.Duration.ofSeconds(3)), (0, common_1.checkGridList)());
        };
    }
}
exports.BrowseUser = BrowseUser;
exports.browseUserInfo = new BrowseUser(UserAttributes_1.userMap);
//# sourceMappingURL=BrowseUser.js.map