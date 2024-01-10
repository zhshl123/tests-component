"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowseUserAdvencedSearchPanel = exports.UserForm = exports.CIPUserInfo = exports.submitUserForm = exports.addSuperadmin = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const common_1 = require("../common");
const SearcchUser_1 = require("./SearcchUser");
exports.addSuperadmin = {
    using: (userInfo) => {
        common_1.openPage.using('Create User');
        exports.submitUserForm.using(userInfo);
        SearcchUser_1.searchUser.using('User Name', userInfo.username);
    }
};
exports.submitUserForm = {
    using: (userInfo) => core_1.Task.where(`#actor add user in with ${userInfo.username} and ${userInfo.password}`, web_1.Enter.theValue(userInfo.username).into(UserForm.usernameField()), web_1.Enter.theValue(userInfo.password).into(UserForm.passwordField()), common_1.clickButton.using('Save')),
};
class CIPUserInfo {
}
exports.CIPUserInfo = CIPUserInfo;
class UserForm {
}
exports.UserForm = UserForm;
UserForm.usernameField = () => web_1.PageElement.located(web_1.By.css('')).describedAs('username field');
UserForm.passwordField = () => web_1.PageElement.located(web_1.By.css('')).describedAs('password');
class BrowseUserAdvencedSearchPanel {
}
exports.BrowseUserAdvencedSearchPanel = BrowseUserAdvencedSearchPanel;
BrowseUserAdvencedSearchPanel.usernameField = () => web_1.PageElement.located(web_1.By.css('')).describedAs('username searh field ');
//# sourceMappingURL=AddSuperAdmin.js.map