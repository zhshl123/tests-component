"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.project = exports.EditProjectFields = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
const common_1 = require("../../common");
const abstract_1 = require("../../common/abstract");
const ProjectAttributes_1 = require("./ProjectAttributes");
class EditProjectFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.addMasterProjectButton = () => web_1.PageElement.located(web_1.By.css(`[value="Add Master Project"]`))
            .describedAs('Add Master Project' + 'button');
        /**
         * check message popup is visible
         * @returns
         */
        this.waitMessagePopupBoxVisible = () => core_1.Task.where(`#actor check message popup box`, core_1.Wait.until((0, common_1.messagePopupBox)(), (0, web_1.isVisible)()), core_1.Check.whether(web_1.Text.of((0, common_1.messagePopupContent)()), (0, assertions_1.includes)('Duplicate')).andIfSo(common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK)));
        this.firstExpandIconInGrid = () => web_1.PageElement.located(web_1.By.id('ctl00_body_dgImplementedProjects_ctl03_imgExpand'))
            .describedAs('first expend icon in grid');
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
        /**
         * 下拉列表的值
         * @param fieldName 字段名称
         * @param itemName 具体的选项名称
         * @returns
         */
        this.dropdownItem = (fieldName, itemName) => web_1.PageElement.located(web_1.By.cssContainingText('span', itemName))
            .of(this.dropdownListBox(fieldName))
            .describedAs('dropdown item: ' + itemName);
        this.projectStructureTree = () => web_1.PageElement.located(web_1.By.id('ctl00_body_iprjTreeview_treeview'))
            .describedAs('project structure tree');
        this.projectStructureTreeBranch = (projectName) => web_1.PageElement.located(web_1.By.cssContainingText('span', projectName))
            .of(this.projectStructureTree())
            .describedAs('project structure tree branch ' + projectName);
        /*************************** copy selected project 弹窗******************************** */
        this.copySelectedProjectPopup = () => web_1.PageElement.located(web_1.By.id('divExportCurrentCycleProjects'))
            .describedAs('copy selected project popup');
        this.copySelectedProjectDropdownField = (fieldName) => {
            const mappedFieldName = this.entityMap.get(fieldName);
            return web_1.PageElement.located(web_1.By.css(`[aria-owns="ctl00_body_ddl${mappedFieldName}_listbox"]`))
                .describedAs('copy selected project popup dropdown field: ' + fieldName);
        };
        this.copySelectedProjectDropdownListBox = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_ddl' + this.entityMap.get(fieldName) + '_listbox'))
            .describedAs('copy selected project popup dropdown list box: ' + fieldName);
        this.copySelectedProjectDropdownList = (fieldName) => web_1.PageElements.located(web_1.By.css('li')).of(this.copySelectedProjectDropdownListBox(fieldName))
            .describedAs('copy selected project popup dropdown list: ' + fieldName);
        this.copySelectedProjectDropdownItem = (fieldName, itemName) => web_1.PageElements.located(web_1.By.cssContainingText('.combobox-span', itemName)).last()
            .of(this.copySelectedProjectDropdownListBox(fieldName))
            .describedAs('copy selected project popup dropdown item: ' + itemName);
        this.selectCopySelectedProjectDropdownItem = (fieldName, itemName) => {
            return core_1.Task.where(`#actor selects copy selected project popup dropdown item: ${itemName}`, web_1.Click.on(this.copySelectedProjectDropdownField(fieldName)), 
            // 确保下拉框有值之后再点击对应选项
            assertions_1.Ensure.eventually(this.copySelectedProjectDropdownList(fieldName).first(), (0, assertions_1.isPresent)()), web_1.Click.on(this.copySelectedProjectDropdownItem(fieldName, itemName)));
        };
        this.copySelectedProjectScopingCheckbox = () => web_1.PageElement.located(web_1.By.id('ctl00_body_chkScoping'))
            .describedAs('copy selected project popup scoping checkbox');
        this.copySelectedProjectOKButton = () => web_1.PageElement.located(web_1.By.id('ctl00_body_btnOK'))
            .describedAs('copy selected project popup Ok button');
    }
}
exports.EditProjectFields = EditProjectFields;
exports.project = new EditProjectFields(ProjectAttributes_1.projectAttributesMap);
//# sourceMappingURL=EditProjectFields.js.map