"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.editUser = exports.addUser = void 0;
const core_1 = require("@serenity-js/core");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const EditUser_1 = require("./EditUser");
exports.addUser = {
    using: (userInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor Input all fields and save `, EditUser_1.user.fillTextInputField('User Login Name', userInfo.rowsHash().UserLoginName + timestamp), EditUser_1.user.setCookie(statics_1.COOKIE_USER_LOGIN_NAME, userInfo.rowsHash().UserLoginName + timestamp), EditUser_1.user.fillTextInputField('Password', userInfo.rowsHash().Password), EditUser_1.user.fillConfirmPasswordInputField('Confirm Password', userInfo.rowsHash().ConfirmPassword), EditUser_1.user.fillTextInputField('First Name', userInfo.rowsHash().FirstName), EditUser_1.user.fillTextInputField('Last Name', userInfo.rowsHash().LastName), EditUser_1.user.fillTextInputField('Email', userInfo.rowsHash().Email), EditUser_1.user.selectLookupDropdownItem('Department', userInfo.rowsHash().Department), EditUser_1.user.clickSingleCheckBox('User Status', userInfo.rowsHash().UserStatus), EditUser_1.user.selectDropdownItem('Role', userInfo.rowsHash().Role), EditUser_1.user.clickAddSaveButton(DefaultStaticParams_1.SAVE), EditUser_1.user.waitMessagePopupBoxVisible());
    }
};
exports.editUser = {
    using: (userInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor updates fields and save `, core_1.Wait.for(core_1.Duration.ofSeconds(2)), EditUser_1.user.fillTextInputField('User Login Name', userInfo.rowsHash().UserLoginName + timestamp), EditUser_1.user.setCookie(statics_1.COOKIE_USER_LOGIN_NAME, userInfo.rowsHash().UserLoginName + timestamp), EditUser_1.user.fillTextInputField('First Name', userInfo.rowsHash().FirstName), EditUser_1.user.fillTextInputField('Last Name', userInfo.rowsHash().LastName), EditUser_1.user.fillTextInputField('Email', userInfo.rowsHash().Email), EditUser_1.user.selectLookupDropdownItem('Department', userInfo.rowsHash().Department), EditUser_1.user.clickSingleCheckBox('User Status', userInfo.rowsHash().UserStatus), EditUser_1.user.selectDropdownItem('Role', userInfo.rowsHash().Role), EditUser_1.user.clickEditSaveButton(DefaultStaticParams_1.SAVE), EditUser_1.user.waitMessagePopupBoxVisible());
    }
};
exports.deleteUser = {
    using: () => {
        return core_1.Task.where(`#actor click Delete button`, common_1.clickButton.using(DefaultStaticParams_1.DELETE), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), core_1.Wait.for(core_1.Duration.ofSeconds(3)));
    }
};
//# sourceMappingURL=UserCrud.js.map