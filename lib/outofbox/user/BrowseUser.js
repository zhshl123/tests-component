"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseUserInfo = exports.BrowseUser = void 0;
const abstract_1 = require("../common/abstract");
const UserAttributes_1 = require("./UserAttributes");
class BrowseUser extends abstract_1.SearchFromFields {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.BrowseUser = BrowseUser;
exports.browseUserInfo = new BrowseUser(UserAttributes_1.userMap);
//# sourceMappingURL=BrowseUser.js.map