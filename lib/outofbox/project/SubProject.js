"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDeletedSubProject = exports.deleteSubProject = exports.checkSubProject = exports.fillSubProjectFields = exports.addSubProject = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const BrowseProjectFields_1 = require("./components/BrowseProjectFields");
const EditProjectFields_1 = require("./components/EditProjectFields");
const ProjectTab_1 = require("./components/ProjectTab");
exports.addSubProject = {
    using: (subProjectInfo) => {
        return core_1.Task.where(`#actor add sub project`, ProjectTab_1.projectTab.clickTab('Implementation'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), ProjectTab_1.projectTab.clickTab('Structure'), assertions_1.Ensure.eventually(EditProjectFields_1.project.addMasterProjectButton(), (0, assertions_1.isPresent)()), common_1.clickButton.using(DefaultStaticParams_1.ADD_SUB_PROJECT), core_1.Wait.for(core_1.Duration.ofSeconds(5)), 
        // 填入字段
        exports.fillSubProjectFields.using(subProjectInfo), 
        // 提交
        common_1.clickActionButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.fillSubProjectFields = {
    using: (subProjectInfo) => {
        const timestamp_master = common_1.formatted_now;
        return core_1.Task.where(`#actor fill project with required fields`, 
        // 设置ProjectName = 前缀+时间戳 ，以免出现ProjectName重复
        EditProjectFields_1.project.fillTextInputField('Project', subProjectInfo.rowsHash().Project + timestamp_master), EditProjectFields_1.project.setCookie(statics_1.COOKIE_SUB_PROJECT_NAME, subProjectInfo.rowsHash().Project + timestamp_master), EditProjectFields_1.project.selectDropdownItem('Project Phase', subProjectInfo.rowsHash().ProjectPhase));
    }
};
exports.checkSubProject = {
    using: (projectName) => {
        return core_1.Task.where(`#actor check sub project information`, BrowseProjectFields_1.browseProject.searchItemInBrowsePage(statics_1.BROWSE_IMPLEMENTATION_PROJECT, 'Project', web_1.Cookie.called(statics_1.COOKIE_PROJECT_NAME).value()), assertions_1.Ensure.eventually(EditProjectFields_1.project.firstExpandIconInGrid(), (0, web_1.isVisible)()), web_1.Click.on(EditProjectFields_1.project.firstExpandIconInGrid()), common_1.checkTextInGridList.using(web_1.Cookie.called(statics_1.COOKIE_SUB_PROJECT_NAME).value()));
    }
};
exports.deleteSubProject = {
    using: (projectName) => {
        return core_1.Task.where(`#actor delete sub project information`, BrowseProjectFields_1.browseProject.clickIDLink(1), core_1.Wait.until(web_1.Page.whichTitle((0, assertions_1.includes)(statics_1.MANAGE_IMPLEMENTATION_PROJECT)), (0, assertions_1.isPresent)()), web_1.Switch.to(web_1.Page.whichTitle((0, assertions_1.includes)(statics_1.MANAGE_IMPLEMENTATION_PROJECT))), common_1.clickActionButton.using(DefaultStaticParams_1.DELETE), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.checkDeletedSubProject = {
    using: (projectName, subProjectName) => {
        return core_1.Task.where(`#actor check deleted sub project information`, BrowseProjectFields_1.browseProject.searchItemInBrowsePage(statics_1.BROWSE_IMPLEMENTATION_PROJECT, 'Project', projectName), BrowseProjectFields_1.browseProject.checkSearchResult(projectName, DefaultStaticParams_1.SUCCEEDED), assertions_1.Ensure.eventually(EditProjectFields_1.project.firstExpandIconInGrid(), (0, assertions_1.not)((0, web_1.isVisible)())), web_1.Click.on(BrowseProjectFields_1.browseProject.searchAtTopLavelCheckbox()), BrowseProjectFields_1.browseProject.searchItemInBrowsePage(statics_1.BROWSE_IMPLEMENTATION_PROJECT, 'Project', subProjectName), BrowseProjectFields_1.browseProject.checkSearchResult(subProjectName, DefaultStaticParams_1.FAILED));
    }
};
//# sourceMappingURL=SubProject.js.map