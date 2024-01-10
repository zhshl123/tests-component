"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseProposal = exports.BrowseProposalFields = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const abstract_1 = require("../common/abstract");
const EditProposalFields_1 = require("./EditProposalFields");
const ProposalAttributes_1 = require("./ProposalAttributes");
class BrowseProposalFields extends abstract_1.SearchFromFields {
    constructor(entityMap) {
        super(entityMap);
        /**
        * 在browse页面搜索目标值(单条件查询，仅限查询字段为text类型)
        * 多条件查询，请在子类重新定义新的方法
        * @param pageName 页面名称
        * @param fieldName 填入关键词的字段名
        * @param itemName 搜索的关键词
        * @returns
        */
        this.searchItemInBrowsePage = (pageName, fieldName, itemName) => {
            return core_1.Task.where(`#actor search item: ${itemName} with ${fieldName}`, core_1.Check.whether(web_1.Page.current().title(), (0, assertions_1.includes)(pageName)).andIfSo(core_1.Log.the('current page is ' + pageName)).otherwise(common_1.openPage.using(pageName), core_1.Wait.for(core_1.Duration.ofSeconds(2))), this.selectDropdownItem('Cycle', EditProposalFields_1.proposal.cycle), core_1.Wait.for(core_1.Duration.ofSeconds(5)), this.selectScenarioLookupDropdownItem(EditProposalFields_1.proposal.scenario), this.fillTextInputField(fieldName, itemName), common_1.clickButton.using(DefaultStaticParams_1.SEARCH), core_1.Wait.for(core_1.Duration.ofSeconds(3)));
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
    }
}
exports.BrowseProposalFields = BrowseProposalFields;
exports.browseProposal = new BrowseProposalFields(ProposalAttributes_1.proposalAttributeMap);
//# sourceMappingURL=BrowseProposalFields.js.map