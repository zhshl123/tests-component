"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginApi = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const rest_1 = require("@serenity-js/rest");
const WebsiteApiUrl_1 = require("../WebsiteApiUrl");
/**
 * 默认用户名为superadmin
 * @param username 用户名
 * @param password 密码
 * */
const loginApi = (username = 'superadmin', password = '0115') => {
    const loginUser = {
        username: username,
        password: password
    };
    return core_1.Task.where(`#actor login api`, core_1.Log.the(loginUser), rest_1.Send.a(rest_1.PostRequest.to(WebsiteApiUrl_1.API_LOGIN).with(loginUser)), assertions_1.Ensure.eventually(rest_1.LastResponse.status(), (0, assertions_1.equals)(200)), core_1.Log.the(rest_1.LastResponse.body()));
};
exports.loginApi = loginApi;
//# sourceMappingURL=UserLoginApi.js.map