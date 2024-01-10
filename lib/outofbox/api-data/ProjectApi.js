"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectApiInfo = exports.ProjectApi = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const rest_1 = require("@serenity-js/rest");
const web_1 = require("@serenity-js/web");
const common_1 = require("../common");
const WebsiteApiUrl_1 = require("../WebsiteApiUrl");
const ProjectEntity_1 = require("./entities/ProjectEntity");
const UserLoginApi_1 = require("./UserLoginApi");
class ProjectApi {
    constructor() {
        this.apiGetProjectBySearch = (projectName) => {
            return core_1.Task.where(`#actor login api`, 
            // 先登录获取用户token
            (0, UserLoginApi_1.loginApi)(), 
            // 发送请求，查询
            rest_1.Send.a(rest_1.PostRequest.to(WebsiteApiUrl_1.API_GETVIEW_RESULT + '/projects').with({
                '_B_ProjectName': projectName
            }).using({
                headers: {
                    'x-token': web_1.Cookie.called('x-token').value(),
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })), assertions_1.Ensure.eventually(rest_1.LastResponse.status(), (0, assertions_1.equals)(200)), core_1.Log.the(rest_1.LastResponse.body()));
        };
        this.apiSaveImplementedProject = {
            using: (projectInfo) => {
                const timestamp = common_1.formatted_now;
                ProjectEntity_1.implementedProjectEntity.Attributes.ProjectName = projectInfo.rowsHash().Project + timestamp;
                ProjectEntity_1.implementedProjectEntity.Attributes.ProjectID = projectInfo.rowsHash().Project + timestamp;
                exports.projectApiInfo.projetcName = projectInfo.rowsHash().Project + timestamp;
                return core_1.Task.where(`#actor login api`, 
                // 先登录获取用户token
                (0, UserLoginApi_1.loginApi)(), core_1.Log.the(ProjectEntity_1.implementedProjectEntity), rest_1.Send.a(rest_1.PostRequest.to(WebsiteApiUrl_1.API_SAVE).with(ProjectEntity_1.implementedProjectEntity).using({
                    headers: {
                        'x-token': rest_1.LastResponse.body().as(String),
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                })), assertions_1.Ensure.eventually(rest_1.LastResponse.status(), (0, assertions_1.equals)(200)), core_1.Log.the(rest_1.LastResponse.body()));
            }
        };
    }
}
exports.ProjectApi = ProjectApi;
exports.projectApiInfo = new ProjectApi();
//# sourceMappingURL=ProjectApi.js.map