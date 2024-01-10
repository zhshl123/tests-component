"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseProject = exports.BrowseProjectFields = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
const common_1 = require("../../common");
const abstract_1 = require("../../common/abstract");
const statics_1 = require("../../common/statics");
const ProjectAttributes_1 = require("./ProjectAttributes");
const ProjectTab_1 = require("./ProjectTab");
class BrowseProjectFields extends abstract_1.SearchFromFields {
    constructor(entityMap) {
        super(entityMap);
        /**
         * 列表首行ID Link
         * @param rowNumber 第几行数据（第一行为0，以此类推）
         */
        this.IDLink = (rowNumber) => {
            const initRowNumber = 3 + rowNumber;
            return web_1.PageElement.located(web_1.By.id('ctl00_body_dgImplementedProjects_ctl0' + initRowNumber + '_chkLinkById'))
                .describedAs(`row:${rowNumber} ID link: ' + 'ImplementedProjects`);
        };
        /**
         * 列表首行ID Link
         * @param rowNumber 第几行数据（第一行为0，以此类推）
         */
        this.IDExpandIcon = (rowNumber) => {
            const initRowNumber = 3 + rowNumber;
            return web_1.PageElement.located(web_1.By.id('ctl00_body_dgImplementedProjects_ctl0' + initRowNumber + '_imgExpand'));
        };
        /**
         * 点击列表首行ID Link
         */
        this.clickIDLink = (rowNumber) => {
            return core_1.Task.where(`#actor click the row: ${rowNumber} ID Link`, web_1.Click.on(this.IDLink(rowNumber)));
        };
        this.searchAndEditImplementationProject = (projectName) => {
            return core_1.Task.where(`#actor search and go to edit project page`, exports.browseProject.searchItemInBrowsePage(statics_1.BROWSE_IMPLEMENTATION_PROJECT, 'Project', projectName), core_1.Wait.for(core_1.Duration.ofSeconds(2)), exports.browseProject.checkSearchResult(projectName, DefaultStaticParams_1.SUCCEEDED), exports.browseProject.clickIDLink(0), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
        };
        this.openPlanningProjectInBrowseImplementationProject = (projectName) => {
            return core_1.Task.where(`#actor search and go to edit project page`, exports.browseProject.searchItemInBrowsePage(statics_1.BROWSE_IMPLEMENTATION_PROJECT, 'Project', projectName), core_1.Wait.for(core_1.Duration.ofSeconds(2)), exports.browseProject.checkSearchResult(projectName, DefaultStaticParams_1.SUCCEEDED), exports.browseProject.clickIDLink(0), core_1.Wait.for(core_1.Duration.ofSeconds(5)), ProjectTab_1.projectTab.clickTab('Planning'), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
        };
        this.searchAndEditPlanningProject = (projectName) => {
            return core_1.Task.where(`#actor search and go to edit project page`, exports.browseProject.searchItemInBrowsePage(statics_1.BROWSE_PROJECTS, 'Project', projectName), core_1.Wait.for(core_1.Duration.ofSeconds(2)), exports.browseProject.checkSearchResult(projectName, DefaultStaticParams_1.SUCCEEDED), common_1.clickButtonInList.using(DefaultStaticParams_1.EDIT), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
        };
    }
}
exports.BrowseProjectFields = BrowseProjectFields;
exports.browseProject = new BrowseProjectFields(ProjectAttributes_1.projectAttributesMap);
//# sourceMappingURL=BrowseProjectFields.js.map