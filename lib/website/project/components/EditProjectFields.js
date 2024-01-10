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
        this.lookupInputFieldClearIcon = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_btnClear'))
            .describedAs(fieldName + ' lookup input field clear icon');
        this.selectItemInlookupPopup = (fieldName, itemName, popupFieldName) => {
            const searchForm = new abstract_1.SearchFromFields(this.entityMap);
            return core_1.Task.where(`#actor searchs single item : ${itemName} in ${fieldName} lookup popup`, core_1.Check.whether(this.lookupInputFieldClearIcon(fieldName), (0, assertions_1.isPresent)()).andIfSo(web_1.Click.on(this.lookupInputFieldClearIcon(fieldName))), web_1.Click.on(this.lookupIcon(fieldName)), 
            // 确保弹窗有显示再进行下一步搜索操作
            assertions_1.Ensure.eventually(this.lookupPopupPanel(fieldName), (0, web_1.isVisible)()), web_1.Switch.to(this.lookupPopupPanel(fieldName)).and(web_1.Enter.theValue(itemName).into(searchForm.textInputField(popupFieldName)), common_1.clickButton.using(DefaultStaticParams_1.SEARCH), 
            // 等待3s加载时间，以确保列表为刷新后的数据
            core_1.Wait.for(core_1.Duration.ofSeconds(3)), searchForm.checkSearchResult(itemName, DefaultStaticParams_1.SUCCEEDED), core_1.Check.whether(
            // 判断是单选框还是多选框
            (0, common_1.singleCheckBoxInGrid)(), (0, assertions_1.isPresent)()).andIfSo(
            // 点击单选框的第一个选项
            (0, common_1.clickFirstSingleCheckBox)()).otherwise(
            // 点击多选框的全选
            (0, common_1.clickAllMultiCheckBox)()), common_1.clickButton.using(DefaultStaticParams_1.OK)));
        };
        /**
         * 检查文本输入框的值
         * @param fieldName 字段名
         * @param itemName 字段的期望值
         * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
         * @returns
         */
        this.checkTextAreaInputFieldValue = (fieldName, itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check text field: ${fieldName} 's value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Text.of(this.textInputField(fieldName)), (0, assertions_1.equals)(itemName))) : core_1.Task.where(`#actor check text field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Text.of(this.textInputField(fieldName)), (0, assertions_1.not)((0, assertions_1.equals)(itemName))));
        };
    }
}
exports.EditProjectFields = EditProjectFields;
exports.project = new EditProjectFields(ProjectAttributes_1.projectAttributesMap);
//# sourceMappingURL=EditProjectFields.js.map