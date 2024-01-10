"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseProject = exports.BrowseProjectFields = void 0;
const assertions_1 = require("@serenity-js/assertions");
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
         * 点击列表首行ID Link
         */
        this.clickIDLink = (rowNumber) => {
            return core_1.Task.where(`#actor click the row: ${rowNumber} ID Link`, web_1.Click.on(this.IDLink(rowNumber)));
        };
        this.searchAndEditImplementationProject = (projectName) => {
            return core_1.Task.where(`#actor search and go to edit project page`, exports.browseProject.searchItemInBrowsePage(statics_1.BROWSE_IMPLEMENTATION_PROJECT, 'Project', projectName), core_1.Wait.for(core_1.Duration.ofSeconds(3)), exports.browseProject.checkSearchResult(projectName, DefaultStaticParams_1.SUCCEEDED), exports.browseProject.clickIDLink(0), core_1.Wait.until(web_1.Page.whichTitle((0, assertions_1.includes)(statics_1.MANAGE_IMPLEMENTATION_PROJECT)), (0, assertions_1.isPresent)()), web_1.Switch.to(web_1.Page.whichTitle((0, assertions_1.includes)(statics_1.MANAGE_IMPLEMENTATION_PROJECT))));
        };
        /**
         * 在browse draft planning页面搜索目标值(单条件查询，仅限查询字段为text类型)
         * @param pageName 页面名称
         * @param cycleName cycle名
         * @param fieldName 填入关键词的字段名
         * @param itemName 搜索的关键词
         * @returns
         */
        this.searchItemInBrowsePlanningProjectPage = (pageName, cycleName, fieldName, itemName) => {
            return core_1.Task.where(`#actor search item: ${itemName} with ${fieldName}`, core_1.Check.whether(web_1.Page.current().title(), (0, assertions_1.includes)(pageName)).andIfSo(core_1.Log.the('current page is ' + pageName)).otherwise(common_1.openPage.using(pageName), core_1.Wait.for(core_1.Duration.ofSeconds(2))), this.selectDropdownItem('Cycle', cycleName), core_1.Wait.for(core_1.Duration.ofSeconds(5)), this.fillTextInputField(fieldName, itemName), common_1.clickButton.using(DefaultStaticParams_1.SEARCH), core_1.Wait.for(core_1.Duration.ofSeconds(3)));
        };
        this.searchAtTopLavelCheckbox = () => web_1.PageElement.located(web_1.By.id('ctl00_body_chkSearchTopOnly'))
            .describedAs('search at top level checkbox');
        this.openPlanningProjectInBrowseImplementationPage = (projectName) => {
            return core_1.Task.where(`#actor open Planning Project in BrowseImplementation Project Page`, exports.browseProject.searchAndEditImplementationProject(projectName), core_1.Wait.until(web_1.Page.whichTitle((0, assertions_1.includes)(statics_1.MANAGE_IMPLEMENTATION_PROJECT)), (0, assertions_1.isPresent)()), web_1.Switch.to(web_1.Page.whichTitle((0, assertions_1.includes)(statics_1.MANAGE_IMPLEMENTATION_PROJECT))), core_1.Wait.for(core_1.Duration.ofSeconds(3)), ProjectTab_1.projectTab.clickTab('Planning'), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
        };
        /**
         * 选择scenario lookup下拉框中的具体选项
         * @param itemName 选项的值
         * @returns
         */
        this.selectScenarioLookupDropdownItem = (itemName) => {
            return core_1.Task.where(`#actor selects scenario dropdown item '${itemName}'`, web_1.Click.on(this.scenarioInputFieldClearIcon()), 
            // 点击输入框
            web_1.Click.on(this.scenarioLookupDropdownInputField()), core_1.Wait.for(core_1.Duration.ofSeconds(3)), 
            // 确保下拉框有值之后再点击lookup图标
            assertions_1.Ensure.eventually(this.scenarioLookupDropdownList().first(), (0, assertions_1.isPresent)()), 
            // 点击下拉框的值
            web_1.Click.on(this.scenarioLookupDropdownItem(itemName)), web_1.Click.on(this.scenarioFieldLabel()));
        };
        this.scenarioInputFieldClearIcon = () => web_1.PageElement.located(web_1.By.id('ctl00_body_AB_cstm_Stage_btnClear'))
            .describedAs('Scenario input field clear icon');
        this.scenarioLookupDropdownItem = (itemName) => web_1.PageElement.located(web_1.By.css(`[title="${itemName}"]`))
            .of(this.scenarioLookupDropdownListBox())
            .describedAs(`scenario dropdown item: ${itemName}`);
        this.scenarioLookupDropdownInputField = () => {
            return web_1.PageElement.located(web_1.By.css(`[aria-describedby="ctl00_body_AB_cstm_Stage_select_taglist"]`))
                .describedAs('scenario lookup input field');
        };
        this.scenarioLookupDropdownList = () => web_1.PageElements.located(web_1.By.css('li'))
            .of(this.scenarioLookupDropdownListBox())
            .describedAs('scenario lookup dropdown list');
        this.scenarioLookupDropdownListBox = () => web_1.PageElement.located(web_1.By.id('ctl00_body_AB_cstm_Stage_select_listbox'))
            .describedAs('scenario lookup dropdown list box');
        this.scenarioFieldLabel = () => web_1.PageElement.located(web_1.By.id('ctl00_body_AB_cstm_Stage_FL'))
            .describedAs(`scenario field label`);
        this.firstCheckboxInGrid = () => web_1.PageElement.located(web_1.By.id('ctl00_body_dgProjects_row1_GridView_ItemCheckBox'))
            .describedAs('first check box in grid');
        /**
        * lookup输入框的下拉框列表
        * @param fieldName 字段名称
        * @returns
        */
        this.lookupDropdownList = (fieldName) => web_1.PageElements.located(web_1.By.css('li'))
            .of(this.lookupDropdownListBox(fieldName))
            .describedAs('lookup dropdown list: ' + fieldName);
    }
}
exports.BrowseProjectFields = BrowseProjectFields;
exports.browseProject = new BrowseProjectFields(ProjectAttributes_1.projectAttributesMap);
//# sourceMappingURL=BrowseProjectFields.js.map