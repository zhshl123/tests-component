"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.checkUserInfo = exports.editUser = exports.addUser = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const BrowseUser_1 = require("./BrowseUser");
const EditUser_1 = require("./EditUser");
exports.addUser = {
    using: (userInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor Input all fields and save `, EditUser_1.user.fillTextInputField('User Login Name', userInfo.rowsHash().UserLoginName + timestamp), EditUser_1.user.setCookie(statics_1.COOKIE_USER_LOGIN_NAME, userInfo.rowsHash().UserLoginName + timestamp), EditUser_1.user.fillTextInputField('Password', userInfo.rowsHash().Password), EditUser_1.user.fillConfirmPasswordInputField('Confirm Password', userInfo.rowsHash().ConfirmPassword), EditUser_1.user.fillTextInputField('First Name', userInfo.rowsHash().FirstName), EditUser_1.user.fillTextInputField('Last Name', userInfo.rowsHash().LastName), EditUser_1.user.fillTextInputField('Email', userInfo.rowsHash().Email), EditUser_1.user.selectDropdownItem('Department', userInfo.rowsHash().Department), EditUser_1.user.clickSingleCheckBox('User Status', userInfo.rowsHash().UserStatus), web_1.Click.on(EditUser_1.user.userRoleRadioButtonLebel(userInfo.rowsHash().Role)), EditUser_1.user.clickAddSaveButton(DefaultStaticParams_1.SAVE), EditUser_1.user.waitMessagePopupBoxVisible());
    }
};
exports.editUser = {
    using: (userInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor updates fields and save `, core_1.Wait.for(core_1.Duration.ofSeconds(2)), EditUser_1.user.fillTextInputField('User Login Name', userInfo.rowsHash().UserLoginName + timestamp), EditUser_1.user.setCookie(statics_1.COOKIE_USER_LOGIN_NAME, userInfo.rowsHash().UserLoginName + timestamp), EditUser_1.user.fillTextInputField('First Name', userInfo.rowsHash().FirstName), EditUser_1.user.fillTextInputField('Last Name', userInfo.rowsHash().LastName), EditUser_1.user.fillTextInputField('Email', userInfo.rowsHash().Email), EditUser_1.user.selectDropdownItem('Department', userInfo.rowsHash().Department), EditUser_1.user.clickSingleCheckBox('User Status', userInfo.rowsHash().UserStatus), web_1.Click.on(EditUser_1.user.userRoleRadioButtonLebel(userInfo.rowsHash().Role)), EditUser_1.user.clickEditSaveButton(DefaultStaticParams_1.SAVE), 
        // 修改角色信息后的提示框
        (0, common_1.checkMessagePopupBox)(), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), EditUser_1.user.waitMessagePopupBoxVisible());
    }
};
exports.checkUserInfo = {
    using: (userInfo) => {
        return core_1.Task.where(`#actor updates fields and save `, core_1.Check.whether(web_1.Page.current().title(), (0, assertions_1.includes)('User Management')).andIfSo(core_1.Log.the('current page is Edit user page')).otherwise(BrowseUser_1.browseUserInfo.searchItemAndEdit(statics_1.BROWSE_USER, 'User Login Name', web_1.Cookie.called(statics_1.COOKIE_USER_LOGIN_NAME).value())), core_1.Wait.for(core_1.Duration.ofSeconds(2)), EditUser_1.user.checkTextInputFieldValue('User Login Name', web_1.Cookie.called(statics_1.COOKIE_USER_LOGIN_NAME).value(), DefaultStaticParams_1.SUCCEEDED), EditUser_1.user.checkTextInputFieldValue('First Name', userInfo.rowsHash().FirstName, DefaultStaticParams_1.SUCCEEDED), EditUser_1.user.checkTextInputFieldValue('Last Name', userInfo.rowsHash().LastName, DefaultStaticParams_1.SUCCEEDED), EditUser_1.user.checkTextInputFieldValue('Email', userInfo.rowsHash().Email, DefaultStaticParams_1.SUCCEEDED), assertions_1.Ensure.eventually(web_1.Attribute.called('title').of(EditUser_1.user.dropdownField('Department')), (0, assertions_1.equals)(userInfo.rowsHash().Department)), EditUser_1.user.checkSelectedSingleCheckbox('User Status', userInfo.rowsHash().UserStatus), assertions_1.Ensure.eventually(web_1.Attribute.called('checked').of(EditUser_1.user.userRoleRadioButtonInput(userInfo.rowsHash().Role)), (0, assertions_1.equals)('checked')));
    }
};
exports.deleteUser = {
    using: () => {
        return core_1.Task.where(`#actor click Delete button`, common_1.clickButton.using(DefaultStaticParams_1.DELETE), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), core_1.Wait.for(core_1.Duration.ofSeconds(3)));
    }
};
//# sourceMappingURL=UserCrud.js.map