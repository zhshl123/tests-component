"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserInUserList = exports.putSearchWord = exports.searchUser = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const common_1 = require("../common");
const AddSuperAdmin_1 = require("./AddSuperAdmin");
exports.searchUser = {
    using: (fieldName, searchWord) => core_1.Task.where(`#actor put search word into ${fieldName} with ${searchWord}`, common_1.openPage.using('Browse Users'), exports.putSearchWord.using(fieldName, searchWord), exports.checkUserInUserList.using(fieldName, searchWord))
};
exports.putSearchWord = {
    using: (fieldName, searchWord) => core_1.Task.where(`#actor put search word into ${fieldName} with ${searchWord}`, web_1.Enter.theValue(searchWord).into(AddSuperAdmin_1.BrowseUserAdvencedSearchPanel.usernameField())),
};
exports.checkUserInUserList = {
    using: (fieldName, searchWord) => core_1.Task.where(`#actor check wheather ${searchWord} in the user list`),
};
//# sourceMappingURL=SearcchUser.js.map