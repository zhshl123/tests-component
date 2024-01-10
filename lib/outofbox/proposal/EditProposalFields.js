"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proposal = exports.EditProposalFields = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const abstract_1 = require("../common/abstract");
const ProposalAttributes_1 = require("./ProposalAttributes");
class EditProposalFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        /**
         * lookup输入框的值的ul元素
         * @param fieldName 字段名称
         * @returns
         */
        this.lookupInputFieldUl = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_taglist'))
            .describedAs('lookup field ul: ' + fieldName);
        this.selectItemInlookupPopup = (fieldName, itemName, popupFieldName) => {
            const searchForm = new abstract_1.SearchFromFields(this.entityMap);
            return core_1.Task.where(`#actor searchs single item : ${itemName} in ${fieldName} lookup popup`, web_1.Click.on(this.lookupIcon(fieldName)), 
            // 确保弹窗有显示再进行下一步搜索操作
            assertions_1.Ensure.eventually(this.lookupPopupPanel(fieldName), (0, web_1.isVisible)()), web_1.Switch.to(this.lookupPopupPanel(fieldName)).and(web_1.Enter.theValue(itemName).into(searchForm.textInputField(popupFieldName)), common_1.clickButton.using(DefaultStaticParams_1.SEARCH), 
            // 等待3s加载时间，以确保列表为刷新后的数据
            core_1.Wait.for(core_1.Duration.ofSeconds(3)), searchForm.checkSearchResult(itemName, DefaultStaticParams_1.SUCCEEDED), (0, common_1.clickFirstMultiCheckBox)(), common_1.clickButton.using(DefaultStaticParams_1.OK)));
        };
        /*************************** copy selected proposal 弹窗******************************** */
        this.copySelectedProposalPopup = () => web_1.PageElement.located(web_1.By.id('divExportCurrentCycleProjects'))
            .describedAs('copy selected proposal popup');
        this.copySelectedProposalDropdownField = (fieldName) => {
            const mappedFieldName = this.entityMap.get(fieldName);
            return web_1.PageElement.located(web_1.By.css(`[aria-owns="ctl00_body_ddl${mappedFieldName}_listbox"]`))
                .describedAs('copy selected proposal popup dropdown field: ' + fieldName);
        };
        this.copySelectedProposalDropdownListBox = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_ddl' + this.entityMap.get(fieldName) + '_listbox'))
            .describedAs('copy selected proposal popup dropdown list box: ' + fieldName);
        this.copySelectedProposalDropdownList = (fieldName) => web_1.PageElements.located(web_1.By.css('li')).of(this.copySelectedProposalDropdownListBox(fieldName))
            .describedAs('copy selected proposal popup dropdown list: ' + fieldName);
        this.copySelectedProposalDropdownItem = (fieldName, itemName) => web_1.PageElements.located(web_1.By.cssContainingText('.combobox-span', itemName)).last()
            .of(this.copySelectedProposalDropdownListBox(fieldName))
            .describedAs('copy selected proposal popup dropdown item: ' + itemName);
        this.selectCopySelectedProposalDropdownItem = (fieldName, itemName) => {
            return core_1.Task.where(`#actor selects copy selected proposal popup dropdown item: ${itemName}`, web_1.Click.on(this.copySelectedProposalDropdownField(fieldName)), 
            // 确保下拉框有值之后再点击对应选项
            assertions_1.Ensure.eventually(this.copySelectedProposalDropdownList(fieldName).first(), (0, assertions_1.isPresent)()), web_1.Click.on(this.copySelectedProposalDropdownItem(fieldName, itemName)));
        };
        this.copySelectedProposalScopingCheckbox = () => web_1.PageElement.located(web_1.By.id('ctl00_body_chkScoping'))
            .describedAs('copy selected proposal popup scoping checkbox');
        this.copySelectedProposalOKButton = () => web_1.PageElement.located(web_1.By.id('ctl00_body_btnOK'))
            .describedAs('copy selected proposal popup Ok button');
    }
}
exports.EditProposalFields = EditProposalFields;
exports.proposal = new EditProposalFields(ProposalAttributes_1.proposalAttributeMap);
//# sourceMappingURL=EditProposalFields.js.map